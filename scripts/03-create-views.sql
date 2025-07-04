-- Tạo các Views hữu ích cho hệ thống

-- View thống kê người dùng
CREATE VIEW user_stats AS
SELECT 
    role,
    COUNT(*) as total_users,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN last_login >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as active_last_30_days
FROM users 
GROUP BY role;

-- View thống kê khóa học
CREATE VIEW course_stats AS
SELECT 
    c.id,
    c.title,
    c.language,
    c.level,
    COUNT(ce.user_id) as enrolled_students,
    AVG(ce.progress_percentage) as avg_progress,
    COUNT(l.id) as total_lessons,
    COUNT(a.id) as total_assignments,
    AVG(cr.rating) as avg_rating,
    COUNT(cr.id) as total_reviews
FROM courses c
LEFT JOIN course_enrollments ce ON c.id = ce.course_id
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN assignments a ON c.id = a.course_id
LEFT JOIN course_reviews cr ON c.id = cr.course_id
GROUP BY c.id, c.title, c.language, c.level;

-- View tiến độ học tập của sinh viên
CREATE VIEW student_progress AS
SELECT 
    u.id as user_id,
    u.full_name,
    u.email,
    c.id as course_id,
    c.title as course_title,
    ce.progress_percentage,
    ce.enrolled_at,
    COUNT(lp.id) as completed_lessons,
    COUNT(l.id) as total_lessons,
    COUNT(s.id) as submitted_assignments,
    AVG(s.score) as avg_score
FROM users u
JOIN course_enrollments ce ON u.id = ce.user_id
JOIN courses c ON ce.course_id = c.id
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN lesson_progress lp ON u.id = lp.user_id AND l.id = lp.lesson_id AND lp.completed = TRUE
LEFT JOIN assignments a ON c.id = a.course_id
LEFT JOIN submissions s ON a.id = s.assignment_id AND u.id = s.user_id AND s.status = 'graded'
WHERE u.role = 'student'
GROUP BY u.id, u.full_name, u.email, c.id, c.title, ce.progress_percentage, ce.enrolled_at;

-- View bảng xếp hạng sinh viên
CREATE VIEW student_leaderboard AS
SELECT 
    u.id,
    u.full_name,
    u.student_id,
    COUNT(DISTINCT ce.course_id) as courses_enrolled,
    COUNT(DISTINCT CASE WHEN lp.completed = TRUE THEN lp.lesson_id END) as lessons_completed,
    COUNT(DISTINCT s.id) as assignments_submitted,
    AVG(s.score) as avg_score,
    SUM(s.score) as total_score
FROM users u
LEFT JOIN course_enrollments ce ON u.id = ce.user_id
LEFT JOIN lesson_progress lp ON u.id = lp.user_id
LEFT JOIN submissions s ON u.id = s.user_id AND s.status = 'graded'
WHERE u.role = 'student'
GROUP BY u.id, u.full_name, u.student_id
ORDER BY avg_score DESC, total_score DESC;

-- View hoạt động gần đây
CREATE VIEW recent_activities AS
SELECT 
    'login' as activity_type,
    u.full_name as user_name,
    u.role,
    'Đăng nhập hệ thống' as description,
    sl.created_at
FROM system_logs sl
JOIN users u ON sl.user_id = u.id
WHERE sl.action = 'user_login'

UNION ALL

SELECT 
    'submission' as activity_type,
    u.full_name as user_name,
    u.role,
    CONCAT('Nộp bài: ', a.title) as description,
    s.submitted_at as created_at
FROM submissions s
JOIN users u ON s.user_id = u.id
JOIN assignments a ON s.assignment_id = a.id

UNION ALL

SELECT 
    'enrollment' as activity_type,
    u.full_name as user_name,
    u.role,
    CONCAT('Đăng ký khóa học: ', c.title) as description,
    ce.enrolled_at as created_at
FROM course_enrollments ce
JOIN users u ON ce.user_id = u.id
JOIN courses c ON ce.course_id = c.id

ORDER BY created_at DESC
LIMIT 50;

-- View thống kê hệ thống tổng quan
CREATE VIEW system_overview AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM users WHERE role = 'teacher') as total_teachers,
    (SELECT COUNT(*) FROM courses WHERE status = 'active') as active_courses,
    (SELECT COUNT(*) FROM assignments) as total_assignments,
    (SELECT COUNT(*) FROM submissions WHERE status = 'graded') as graded_submissions,
    (SELECT COUNT(*) FROM course_enrollments) as total_enrollments,
    (SELECT AVG(rating) FROM course_reviews) as avg_course_rating,
    (SELECT COUNT(*) FROM users WHERE last_login >= CURRENT_DATE - INTERVAL '7 days') as active_users_week;
