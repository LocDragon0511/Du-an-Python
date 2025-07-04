-- Tạo các Functions và Stored Procedures hữu ích

-- Function tính toán tiến độ khóa học
CREATE OR REPLACE FUNCTION calculate_course_progress(p_user_id INTEGER, p_course_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    total_lessons INTEGER;
    completed_lessons INTEGER;
    progress_percentage INTEGER;
BEGIN
    -- Đếm tổng số bài học trong khóa học
    SELECT COUNT(*) INTO total_lessons
    FROM lessons 
    WHERE course_id = p_course_id AND status = 'published';
    
    -- Đếm số bài học đã hoàn thành
    SELECT COUNT(*) INTO completed_lessons
    FROM lesson_progress lp
    JOIN lessons l ON lp.lesson_id = l.id
    WHERE lp.user_id = p_user_id 
    AND l.course_id = p_course_id 
    AND lp.completed = TRUE;
    
    -- Tính phần trăm tiến độ
    IF total_lessons > 0 THEN
        progress_percentage := ROUND((completed_lessons::DECIMAL / total_lessons) * 100);
    ELSE
        progress_percentage := 0;
    END IF;
    
    -- Cập nhật tiến độ trong bảng course_enrollments
    UPDATE course_enrollments 
    SET progress_percentage = progress_percentage
    WHERE user_id = p_user_id AND course_id = p_course_id;
    
    RETURN progress_percentage;
END;
$$ LANGUAGE plpgsql;

-- Function tự động chấm điểm trắc nghiệm
CREATE OR REPLACE FUNCTION auto_grade_quiz(p_submission_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    total_score INTEGER := 0;
    question_record RECORD;
BEGIN
    -- Duyệt qua tất cả câu trả lời
    FOR question_record IN 
        SELECT qa.id, qa.user_answer, qq.correct_answer, qq.points
        FROM quiz_answers qa
        JOIN quiz_questions qq ON qa.question_id = qq.id
        WHERE qa.submission_id = p_submission_id
    LOOP
        -- Kiểm tra đáp án đúng
        IF question_record.user_answer = question_record.correct_answer THEN
            UPDATE quiz_answers 
            SET is_correct = TRUE, points_earned = question_record.points
            WHERE id = question_record.id;
            
            total_score := total_score + question_record.points;
        ELSE
            UPDATE quiz_answers 
            SET is_correct = FALSE, points_earned = 0
            WHERE id = question_record.id;
        END IF;
    END LOOP;
    
    -- Cập nhật điểm tổng cho submission
    UPDATE submissions 
    SET score = total_score, status = 'graded', graded_at = CURRENT_TIMESTAMP
    WHERE id = p_submission_id;
    
    RETURN total_score;
END;
$$ LANGUAGE plpgsql;

-- Function tạo thông báo tự động
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id INTEGER,
    p_title VARCHAR(255),
    p_message TEXT,
    p_type VARCHAR(20) DEFAULT 'info'
)
RETURNS INTEGER AS $$
DECLARE
    notification_id INTEGER;
BEGIN
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (p_user_id, p_title, p_message, p_type)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function log hoạt động hệ thống
CREATE OR REPLACE FUNCTION log_system_activity(
    p_user_id INTEGER,
    p_action VARCHAR(100),
    p_details JSONB DEFAULT NULL,
    p_ip_address INET DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO system_logs (user_id, action, details, ip_address)
    VALUES (p_user_id, p_action, p_details, p_ip_address);
END;
$$ LANGUAGE plpgsql;

-- Function kiểm tra deadline bài tập
CREATE OR REPLACE FUNCTION check_assignment_deadlines()
RETURNS VOID AS $$
DECLARE
    assignment_record RECORD;
    user_record RECORD;
BEGIN
    -- Tìm các bài tập sắp hết hạn (trong 24h tới)
    FOR assignment_record IN 
        SELECT id, title, due_date, course_id
        FROM assignments 
        WHERE due_date BETWEEN CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP + INTERVAL '24 hours'
    LOOP
        -- Thông báo cho tất cả sinh viên đã đăng ký khóa học
        FOR user_record IN
            SELECT DISTINCT u.id, u.full_name
            FROM users u
            JOIN course_enrollments ce ON u.id = ce.user_id
            WHERE ce.course_id = assignment_record.course_id
            AND u.role = 'student'
            AND NOT EXISTS (
                SELECT 1 FROM submissions s 
                WHERE s.assignment_id = assignment_record.id 
                AND s.user_id = u.id
            )
        LOOP
            PERFORM create_notification(
                user_record.id,
                'Nhắc nhở deadline',
                'Bài tập "' || assignment_record.title || '" sẽ hết hạn trong 24 giờ tới.',
                'warning'
            );
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
