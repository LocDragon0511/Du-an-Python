-- Chèn dữ liệu mẫu cho hệ thống học tập PERL & Python

-- Thêm người dùng mẫu
INSERT INTO users (email, password_hash, full_name, role, student_id, phone, status, email_verified) VALUES
-- Admin
('admin@dtu.edu.vn', '$2b$10$example_hash_admin', 'Quản trị viên', 'admin', NULL, '0905123456', 'active', TRUE),

-- Giảng viên
('tranhminhdang@dtu.edu.vn', '$2b$10$example_hash_teacher1', 'TS. Trần Minh Đăng', 'teacher', NULL, '0905234567', 'active', TRUE),
('nguyenvana@dtu.edu.vn', '$2b$10$example_hash_teacher2', 'PGS. Nguyễn Văn A', 'teacher', NULL, '0905345678', 'active', TRUE),
('tranthib@dtu.edu.vn', '$2b$10$example_hash_teacher3', 'ThS. Trần Thị B', 'teacher', NULL, '0905456789', 'active', TRUE),

-- Sinh viên
('student1@dtu.edu.vn', '$2b$10$example_hash_student1', 'Nguyễn Văn Nam', 'student', '102200001', '0905567890', 'active', TRUE),
('student2@dtu.edu.vn', '$2b$10$example_hash_student2', 'Trần Thị Lan', 'student', '102200002', '0905678901', 'active', TRUE),
('student3@dtu.edu.vn', '$2b$10$example_hash_student3', 'Lê Văn Hùng', 'student', '102200003', '0905789012', 'active', TRUE),
('student4@dtu.edu.vn', '$2b$10$example_hash_student4', 'Phạm Thị Mai', 'student', '102200004', '0905890123', 'active', TRUE),
('student5@dtu.edu.vn', '$2b$10$example_hash_student5', 'Hoàng Văn Đức', 'student', '102200005', '0905901234', 'active', TRUE);

-- Thêm khóa học mẫu
INSERT INTO courses (title, description, language, level, duration_weeks, instructor_id, status) VALUES
('Python Fundamentals', 'Học các khái niệm cơ bản của Python từ biến, hàm đến cấu trúc dữ liệu', 'python', 'beginner', 8, 2, 'active'),
('PERL Advanced Programming', 'Khám phá các tính năng nâng cao của PERL: regex, file handling, modules', 'perl', 'advanced', 10, 3, 'active'),
('Python Web Development', 'Xây dựng ứng dụng web với Flask và Django framework', 'python', 'intermediate', 12, 2, 'active'),
('PERL Text Processing', 'Xử lý văn bản và dữ liệu với PERL regex và string manipulation', 'perl', 'intermediate', 6, 4, 'active'),
('Python Data Science', 'Phân tích dữ liệu với NumPy, Pandas và Matplotlib', 'python', 'intermediate', 14, 3, 'active'),
('PERL System Administration', 'Sử dụng PERL để quản trị hệ thống và tự động hóa tác vụ', 'perl', 'advanced', 8, 4, 'draft');

-- Đăng ký khóa học
INSERT INTO course_enrollments (user_id, course_id, progress_percentage) VALUES
-- Student 1
(5, 1, 75), (5, 2, 60), (5, 3, 40),
-- Student 2  
(6, 1, 90), (6, 4, 50), (6, 5, 25),
-- Student 3
(7, 1, 45), (7, 2, 30), (7, 3, 0),
-- Student 4
(8, 1, 85), (8, 3, 70), (8, 5, 55),
-- Student 5
(9, 2, 40), (9, 4, 80), (9, 6, 0);

-- Thêm bài giảng
INSERT INTO lessons (course_id, title, description, content, lesson_order, duration_minutes, status) VALUES
-- Python Fundamentals (Course 1)
(1, 'Giới thiệu Python', 'Tổng quan về ngôn ngữ Python và cài đặt môi trường', 'Python là một ngôn ngữ lập trình bậc cao...', 1, 45, 'published'),
(1, 'Biến và kiểu dữ liệu', 'Học cách khai báo biến và các kiểu dữ liệu cơ bản', 'Trong Python, biến được khai báo đơn giản...', 2, 60, 'published'),
(1, 'Cấu trúc điều khiển', 'If-else, vòng lặp for và while', 'Cấu trúc điều khiển giúp chương trình...', 3, 75, 'published'),
(1, 'Hàm trong Python', 'Định nghĩa và sử dụng hàm', 'Hàm là khối code có thể tái sử dụng...', 4, 90, 'published'),

-- PERL Advanced (Course 2)
(2, 'PERL Regex nâng cao', 'Biểu thức chính quy phức tạp trong PERL', 'PERL có hệ thống regex mạnh mẽ nhất...', 1, 120, 'published'),
(2, 'File Handling', 'Xử lý file và I/O trong PERL', 'PERL excel trong việc xử lý file...', 2, 90, 'published'),
(2, 'PERL Modules', 'Sử dụng và tạo modules trong PERL', 'Modules giúp tổ chức code hiệu quả...', 3, 105, 'published'),

-- Python Web Development (Course 3)
(3, 'Giới thiệu Flask', 'Framework web nhẹ cho Python', 'Flask là micro-framework...', 1, 90, 'published'),
(3, 'Routing và Templates', 'Xử lý URL và render templates', 'Routing định nghĩa các endpoint...', 2, 120, 'published'),
(3, 'Database với SQLAlchemy', 'Tích hợp database vào Flask app', 'SQLAlchemy là ORM phổ biến...', 3, 150, 'published');

-- Thêm tiến độ bài học
INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at, time_spent_minutes) VALUES
-- Student 1 progress
(5, 1, TRUE, '2024-01-10 10:30:00', 45),
(5, 2, TRUE, '2024-01-11 14:20:00', 65),
(5, 3, TRUE, '2024-01-12 16:45:00', 80),
(5, 4, FALSE, NULL, 30),

-- Student 2 progress  
(6, 1, TRUE, '2024-01-08 09:15:00', 50),
(6, 2, TRUE, '2024-01-09 11:30:00', 70),
(6, 3, TRUE, '2024-01-10 15:20:00', 75),
(6, 4, TRUE, '2024-01-11 13:45:00', 95);

-- Thêm bài tập
INSERT INTO assignments (course_id, lesson_id, title, description, type, language, max_score, due_date, instructions, starter_code) VALUES
(1, 2, 'Bài tập biến và kiểu dữ liệu', 'Thực hành khai báo biến và chuyển đổi kiểu dữ liệu', 'code', 'python', 100, '2024-02-01 23:59:59', 
'Viết chương trình Python thực hiện các yêu cầu sau...', 
'# Bài tập 1: Khai báo biến
name = ""
age = 0
# Hoàn thành code...'),

(1, 3, 'Quiz cấu trúc điều khiển', 'Kiểm tra hiểu biết về if-else và vòng lặp', 'quiz', 'python', 50, '2024-02-05 23:59:59', 
'Trả lời các câu hỏi về cấu trúc điều khiển trong Python', NULL),

(1, 4, 'Project: Calculator', 'Xây dựng máy tính đơn giản', 'code', 'python', 200, '2024-02-10 23:59:59',
'Tạo một máy tính có thể thực hiện 4 phép toán cơ bản',
'def calculator():
    # Hoàn thành hàm này
    pass'),

(2, 1, 'PERL Regex Practice', 'Thực hành biểu thức chính quy', 'code', 'perl', 150, '2024-02-15 23:59:59',
'Viết các pattern regex để xử lý văn bản',
'#!/usr/bin/perl
# Bài tập regex
my $text = "sample text";
# Viết code ở đây');

-- Thêm câu hỏi trắc nghiệm
INSERT INTO quiz_questions (assignment_id, question_text, question_type, options, correct_answer, explanation, points, question_order) VALUES
(2, 'Cú pháp nào sau đây đúng để khai báo vòng lặp for trong Python?', 'multiple_choice', 
'["for i in range(10):", "for (i=0; i<10; i++):", "for i = 1 to 10:", "foreach i in 1..10:"]', 
'for i in range(10):', 
'Python sử dụng cú pháp for i in range(10): để tạo vòng lặp', 10, 1),

(2, 'Python có phân biệt chữ hoa chữ thường không?', 'true_false',
'["True", "False"]',
'True',
'Python là ngôn ngữ phân biệt chữ hoa chữ thường (case-sensitive)', 10, 2),

(2, 'Hàm nào dùng để lấy độ dài của string trong Python?', 'short_answer',
'[]',
'len()',
'Hàm len() trả về số ký tự trong string', 15, 3);

-- Thêm submissions
INSERT INTO submissions (assignment_id, user_id, content, status, score, feedback, submitted_at, graded_at, graded_by) VALUES
(1, 5, 'name = "Nguyen Van Nam"
age = 20
print(f"Tên: {name}, Tuổi: {age}")
print(f"Năm sinh: {2024 - age}")', 'graded', 85, 'Code chạy đúng, cần cải thiện format output', '2024-01-15 14:30:00', '2024-01-16 09:15:00', 2),

(1, 6, 'name = "Tran Thi Lan"  
age = 19
birth_year = 2024 - age
print("Họ tên:", name)
print("Tuổi:", age)  
print("Năm sinh:", birth_year)', 'graded', 95, 'Excellent work! Code rất sạch và dễ đọc', '2024-01-14 16:45:00', '2024-01-15 10:30:00', 2),

(3, 5, 'def calculator():
    while True:
        try:
            num1 = float(input("Nhập số thứ nhất: "))
            operator = input("Nhập phép toán (+, -, *, /): ")
            num2 = float(input("Nhập số thứ hai: "))
            
            if operator == "+":
                result = num1 + num2
            elif operator == "-":
                result = num1 - num2
            elif operator == "*":
                result = num1 * num2
            elif operator == "/":
                if num2 != 0:
                    result = num1 / num2
                else:
                    print("Không thể chia cho 0!")
                    continue
            else:
                print("Phép toán không hợp lệ!")
                continue
                
            print(f"Kết quả: {result}")
            break
        except ValueError:
            print("Vui lòng nhập số hợp lệ!")

calculator()', 'graded', 180, 'Excellent! Xử lý exception rất tốt và UI user-friendly', '2024-01-20 18:20:00', '2024-01-21 11:45:00', 2);

-- Thêm quiz answers
INSERT INTO quiz_answers (submission_id, question_id, user_answer, is_correct, points_earned) VALUES
-- Student answers for quiz
(1, 1, 'for i in range(10):', TRUE, 10),
(1, 2, 'True', TRUE, 10), 
(1, 3, 'len()', TRUE, 15);

-- Thêm thông báo
INSERT INTO notifications (user_id, title, message, type, read_status) VALUES
(5, 'Bài tập mới', 'Bài tập "Project: Calculator" đã được giao. Hạn nộp: 10/02/2024', 'info', FALSE),
(5, 'Điểm bài tập', 'Bạn đã nhận được 85/100 điểm cho bài tập "Biến và kiểu dữ liệu"', 'success', TRUE),
(6, 'Chúc mừng!', 'Bạn đã hoàn thành 90% khóa học Python Fundamentals', 'success', FALSE),
(7, 'Nhắc nhở', 'Bài tập "PERL Regex Practice" sẽ hết hạn trong 2 ngày', 'warning', FALSE),
(8, 'Khóa học mới', 'Khóa học "Python Data Science" đã mở đăng ký', 'info', FALSE);

-- Thêm đánh giá khóa học
INSERT INTO course_reviews (course_id, user_id, rating, review_text) VALUES
(1, 5, 5, 'Khóa học rất hay, giảng viên dạy dễ hiểu. Bài tập phong phú và thực tế.'),
(1, 6, 4, 'Nội dung tốt nhưng cần thêm ví dụ thực tế. Overall rất hài lòng.'),
(2, 5, 4, 'PERL khó nhưng thầy giảng rất chi tiết. Regex phần hơi khó hiểu.'),
(3, 8, 5, 'Web development với Flask rất thú vị. Học được nhiều kiến thức thực tế.');

-- Thêm chat history
INSERT INTO chat_history (user_id, message, response, message_type, language) VALUES
(5, 'Giải thích về vòng lặp for trong Python', 'Vòng lặp for trong Python được sử dụng để lặp qua các phần tử trong một sequence...', 'explanation', 'python'),
(6, 'Cách sử dụng regex trong PERL như thế nào?', 'Regex trong PERL rất mạnh mẽ. Cú pháp cơ bản là $string =~ /pattern/...', 'explanation', 'perl'),
(7, 'Debug lỗi "NameError: name x is not defined"', 'Lỗi này xảy ra khi bạn sử dụng biến chưa được khai báo. Hãy kiểm tra...', 'code_help', 'python'),
(8, 'Sự khác biệt giữa list và tuple trong Python', 'List có thể thay đổi (mutable) còn tuple không thể thay đổi (immutable)...', 'question', 'python');

-- Thêm system logs
INSERT INTO system_logs (user_id, action, details, ip_address) VALUES
(5, 'user_login', '{"login_method": "email", "success": true}', '192.168.1.100'),
(6, 'assignment_submit', '{"assignment_id": 1, "submission_id": 2}', '192.168.1.101'),
(2, 'course_update', '{"course_id": 1, "changes": ["description", "duration"]}', '192.168.1.102'),
(7, 'user_register', '{"registration_method": "email", "role": "student"}', '192.168.1.103'),
(1, 'system_backup', '{"backup_type": "full", "status": "completed"}', '192.168.1.1');

-- Thêm cài đặt hệ thống
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('site_name', 'PERL & Python Learning System', 'Tên của hệ thống'),
('max_file_upload_size', '10485760', 'Kích thước file upload tối đa (bytes)'),
('session_timeout', '3600', 'Thời gian timeout session (giây)'),
('enable_2fa', 'false', 'Bật/tắt xác thực 2 bước'),
('ai_chat_enabled', 'true', 'Bật/tắt tính năng AI chat'),
('auto_grading_enabled', 'true', 'Bật/tắt chấm điểm tự động'),
('email_notifications', 'true', 'Bật/tắt thông báo email'),
('maintenance_mode', 'false', 'Chế độ bảo trì hệ thống');
