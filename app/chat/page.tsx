"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Code, BookOpen, Lightbulb, HelpCircle } from "lucide-react"
import Navigation from "@/components/Navigation"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Xin chào! Tôi là AI Assistant của hệ thống học tập PERL & Python. Tôi có thể giúp bạn:\n\n• Giải thích khái niệm lập trình\n• Debug code\n• Gợi ý bài tập\n• Trả lời câu hỏi về PERL/Python\n\nBạn cần hỗ trợ gì hôm nay?",
      timestamp: new Date(),
      category: "greeting",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "Giải thích về vòng lặp trong Python",
    "Cách sử dụng regex trong PERL",
    "Sự khác biệt giữa list và tuple",
    "Python OOP là gì?",
    "Cách xử lý file trong PERL",
    "Error handling trong Python",
    "Dictionary và Hash trong Python/PERL",
    "Functions và Subroutines",
    "Web development với Python",
    "Database operations",
    "JSON processing",
    "Regular expressions nâng cao",
    "Debug lỗi syntax error",
    "Best practices coding",
    "Performance optimization",
  ]

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        category: "answer",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // PYTHON - Vòng lặp
    if (lowerQuestion.includes("vòng lặp") || lowerQuestion.includes("loop")) {
      return `🐍 **Vòng lặp trong Python:**

**1. Vòng lặp for:**
\`\`\`python
# Lặp qua range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Lặp qua list
fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)

# Lặp với enumerate (có index)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

**2. Vòng lặp while:**
\`\`\`python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
\`\`\`

**3. Break và Continue:**
\`\`\`python
for i in range(10):
    if i == 3:
        continue  # Bỏ qua số 3
    if i == 7:
        break     # Dừng tại số 7
    print(i)
\`\`\`

Bạn muốn tìm hiểu thêm về list comprehension không?`
    }

    // PERL - Regex
    if (lowerQuestion.includes("regex") || lowerQuestion.includes("biểu thức chính quy")) {
      return `🔍 **Regex trong PERL - Siêu mạnh mẽ!**

**Cú pháp cơ bản:**
\`\`\`perl
# Tìm kiếm pattern
if ($string =~ /pattern/) {
    print "Found match!";
}

# Thay thế
$string =~ s/old/new/g;        # Thay thế tất cả
$string =~ s/old/new/;         # Thay thế đầu tiên

# Tách chuỗi
my @parts = split(/,/, $string);
\`\`\`

**Metacharacters quan trọng:**
• \`.\` - Bất kỳ ký tự nào (trừ newline)
• \`*\` - 0 hoặc nhiều lần
• \`+\` - 1 hoặc nhiều lần  
• \`?\` - 0 hoặc 1 lần
• \`^\` - Đầu chuỗi
• \`$\` - Cuối chuỗi
• \`[]\` - Character class
• \`()\` - Grouping

**Ví dụ thực tế:**
\`\`\`perl
# Validate email
if ($email =~ /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/) {
    print "Email hợp lệ";
}

# Extract numbers
my @numbers = $text =~ /\\d+/g;
\`\`\`

Bạn có muốn thực hành với ví dụ cụ thể không?`
    }

    // PYTHON - List vs Tuple
    if (lowerQuestion.includes("list") && lowerQuestion.includes("tuple")) {
      return `📋 **List vs Tuple trong Python:**

**LIST (Danh sách) - Mutable:**
\`\`\`python
# Tạo list
my_list = [1, 2, 3, 'hello']
numbers = list(range(5))

# Thao tác với list
my_list.append(4)           # Thêm cuối
my_list.insert(0, 'start')  # Thêm vị trí
my_list.remove('hello')     # Xóa giá trị
my_list.pop()              # Xóa cuối
my_list[0] = 'new'         # Sửa

# List methods
my_list.sort()             # Sắp xếp
my_list.reverse()          # Đảo ngược
len(my_list)              # Độ dài
\`\`\`

**TUPLE (Bộ) - Immutable:**
\`\`\`python
# Tạo tuple
my_tuple = (1, 2, 3, 'hello')
coordinates = (10, 20)
single_item = (42,)        # Chú ý dấu phẩy

# Thao tác với tuple
print(my_tuple[0])         # Truy cập
print(my_tuple.count(1))   # Đếm
print(my_tuple.index('hello'))  # Tìm vị trí

# Unpacking
x, y = coordinates
a, b, c, d = my_tuple
\`\`\`

**Khi nào dùng gì?**
• **List**: Dữ liệu thay đổi (giỏ hàng, danh sách học viên)
• **Tuple**: Dữ liệu cố định (tọa độ, cấu hình, return multiple values)`
    }

    // PYTHON - Functions
    if (lowerQuestion.includes("function") || lowerQuestion.includes("hàm")) {
      return `🔧 **Functions trong Python:**

**Cú pháp cơ bản:**
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Gọi function
message = greet("Alice")
print(message)
\`\`\`

**Parameters và Arguments:**
\`\`\`python
# Default parameters
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Keyword arguments
def create_profile(name, age, city="Unknown"):
    return f"{name}, {age} years old, from {city}"

profile = create_profile(name="John", age=25, city="Hanoi")

# *args và **kwargs
def sum_all(*numbers):
    return sum(numbers)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

result = sum_all(1, 2, 3, 4, 5)
print_info(name="Alice", age=30, job="Developer")
\`\`\`

**Lambda functions:**
\`\`\`python
# Lambda (anonymous function)
square = lambda x: x ** 2
add = lambda x, y: x + y

# Với map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
\`\`\`

Bạn muốn tìm hiểu về decorators không?`
    }

    // PERL - Variables và Data Types
    if (lowerQuestion.includes("biến") || lowerQuestion.includes("variable") || lowerQuestion.includes("perl")) {
      return `💎 **Variables trong PERL:**

**Scalar Variables ($):**
\`\`\`perl
my $name = "John";
my $age = 25;
my $pi = 3.14159;
my $is_student = 1;  # Boolean (1 = true, 0 = false)

print "Name: $name, Age: $age\\n";
\`\`\`

**Array Variables (@):**
\`\`\`perl
my @fruits = ("apple", "banana", "orange");
my @numbers = (1, 2, 3, 4, 5);
my @mixed = ("hello", 42, 3.14, "world");

# Truy cập elements
print $fruits[0];        # "apple"
print $fruits[-1];       # "orange" (cuối cùng)

# Array operations
push @fruits, "grape";   # Thêm cuối
pop @fruits;            # Xóa cuối
unshift @fruits, "kiwi"; # Thêm đầu
shift @fruits;          # Xóa đầu

my $size = @fruits;     # Số lượng elements
\`\`\`

**Hash Variables (%):**
\`\`\`perl
my %student = (
    "name" => "Alice",
    "age" => 20,
    "major" => "Computer Science"
);

# Truy cập
print $student{"name"};  # "Alice"
$student{"gpa"} = 3.8;   # Thêm key mới

# Lấy keys và values
my @keys = keys %student;
my @values = values %student;
\`\`\`

**References:**
\`\`\`perl
my $array_ref = \\@fruits;
my $hash_ref = \\%student;

print $array_ref->[0];      # Truy cập array qua reference
print $hash_ref->{"name"};  # Truy cập hash qua reference
\`\`\`

Bạn muốn tìm hiểu về subroutines trong PERL không?`
    }

    // PYTHON - OOP
    if (lowerQuestion.includes("oop") || lowerQuestion.includes("class") || lowerQuestion.includes("đối tượng")) {
      return `🏗️ **Object-Oriented Programming trong Python:**

**Class cơ bản:**
\`\`\`python
class Student:
    # Class variable
    school = "ABC University"
    
    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def get_average(self):
        if self.grades:
            return sum(self.grades) / len(self.grades)
        return 0
    
    def __str__(self):
        return f"Student: {self.name}, Age: {self.age}"

# Sử dụng class
student1 = Student("Alice", 20)
student1.add_grade(85)
student1.add_grade(92)
print(f"Average: {student1.get_average()}")
\`\`\`

**Inheritance (Kế thừa):**
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name}"

class Student(Person):  # Kế thừa từ Person
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Gọi constructor cha
        self.student_id = student_id
    
    def introduce(self):  # Override method
        return f"Hi, I'm {self.name}, student ID: {self.student_id}"

class Teacher(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject = subject
    
    def teach(self):
        return f"{self.name} is teaching {self.subject}"
\`\`\`

**Encapsulation:**
\`\`\`python
class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance  # Private attribute
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False
    
    @property
    def balance(self):  # Getter
        return self.__balance
\`\`\`

Bạn muốn tìm hiểu về decorators và magic methods không?`
    }

    // File handling
    if (lowerQuestion.includes("file") || lowerQuestion.includes("tệp")) {
      return `📁 **Xử lý File:**

**PYTHON - File Operations:**
\`\`\`python
# Đọc file
with open('data.txt', 'r', encoding='utf-8') as file:
    content = file.read()        # Đọc toàn bộ
    lines = file.readlines()     # Đọc từng dòng

# Ghi file
with open('output.txt', 'w', encoding='utf-8') as file:
    file.write("Hello World\\n")
    file.writelines(["Line 1\\n", "Line 2\\n"])

# Append file
with open('log.txt', 'a', encoding='utf-8') as file:
    file.write("New log entry\\n")

# JSON files
import json
data = {"name": "Alice", "age": 25}
with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)

with open('data.json', 'r') as file:
    loaded_data = json.load(file)
\`\`\`

**PERL - File Operations:**
\`\`\`perl
# Đọc file
open(my $fh, '<', 'data.txt') or die "Cannot open file: $!";
while (my $line = <$fh>) {
    chomp $line;  # Xóa newline
    print "Line: $line\\n";
}
close($fh);

# Ghi file
open(my $out, '>', 'output.txt') or die "Cannot create file: $!";
print $out "Hello World\\n";
print $out "Second line\\n";
close($out);

# Append file
open(my $log, '>>', 'log.txt') or die "Cannot append file: $!";
print $log "New log entry\\n";
close($log);

# Đọc toàn bộ file
my $content = do {
    local $/;
    open my $fh, '<', 'data.txt';
    <$fh>;
};
\`\`\`

**Best Practices:**
• Luôn sử dụng encoding='utf-8' trong Python
• Sử dụng with statement trong Python (auto close)
• Check file existence trước khi đọc
• Handle exceptions properly

Bạn muốn tìm hiểu về CSV/Excel processing không?`
    }

    // Error handling
    if (lowerQuestion.includes("error") || lowerQuestion.includes("lỗi") || lowerQuestion.includes("exception")) {
      return `🚨 **Error Handling:**

**PYTHON - Try/Except:**
\`\`\`python
# Basic try-except
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Invalid number format!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")
else:
    print("No errors occurred!")
finally:
    print("This always runs")

# Custom exceptions
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    if age < 0:
        raise CustomError("Age cannot be negative")
    if age > 150:
        raise CustomError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except CustomError as e:
    print(f"Validation error: {e.message}")
\`\`\`

**PERL - Error Handling:**
\`\`\`perl
# Die và eval
eval {
    my $result = 10 / 0;
    print "Result: $result\\n";
};
if ($@) {
    print "Error occurred: $@\\n";
}

# File operations với error check
open(my $fh, '<', 'nonexistent.txt') or die "Cannot open file: $!";

# Try::Tiny module (recommended)
use Try::Tiny;

try {
    my $result = risky_operation();
    print "Success: $result\\n";
}
catch {
    print "Error: $_\\n";
}
finally {
    print "Cleanup code here\\n";
};
\`\`\`

**Common Error Types:**
• **SyntaxError**: Lỗi cú pháp
• **NameError**: Biến chưa được định nghĩa
• **TypeError**: Sai kiểu dữ liệu
• **ValueError**: Giá trị không hợp lệ
• **IndexError**: Index ngoài phạm vi
• **KeyError**: Key không tồn tại trong dict
• **FileNotFoundError**: File không tồn tại

**Debug Tips:**
• Sử dụng print statements
• Python debugger (pdb)
• IDE breakpoints
• Logging thay vì print

Bạn có đoạn code nào bị lỗi cần debug không?`
    }

    // Web development
    if (lowerQuestion.includes("web") || lowerQuestion.includes("website") || lowerQuestion.includes("http")) {
      return `🌐 **Web Development:**

**PYTHON - Web Frameworks:**

**Flask (Micro Framework):**
\`\`\`python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World!"

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        return jsonify({"users": ["Alice", "Bob"]})
    elif request.method == 'POST':
        data = request.json
        return jsonify({"message": f"Created user {data['name']}"})

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

**Django (Full Framework):**
\`\`\`python
# models.py
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

# views.py
from django.shortcuts import render
from django.http import JsonResponse

def user_list(request):
    users = User.objects.all()
    return render(request, 'users.html', {'users': users})

def api_users(request):
    users = list(User.objects.values())
    return JsonResponse({'users': users})
\`\`\`

**PERL - Web Development:**

**CGI (Classic):**
\`\`\`perl
#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $cgi = CGI->new;
print $cgi->header('text/html');
print $cgi->start_html('My Web Page');
print $cgi->h1('Hello World!');

if ($cgi->param('name')) {
    my $name = $cgi->param('name');
    print $cgi->p("Hello, $name!");
}

print $cgi->end_html;
\`\`\`

**Mojolicious (Modern):**
\`\`\`perl
use Mojolicious::Lite;

get '/' => sub {
    my $c = shift;
    $c->render(text => 'Hello World!');
};

get '/api/users' => sub {
    my $c = shift;
    $c->render(json => {users => ['Alice', 'Bob']});
};

post '/api/users' => sub {
    my $c = shift;
    my $name = $c->param('name');
    $c->render(json => {message => "Created user $name"});
};

app->start;
\`\`\`

**HTTP Requests:**
\`\`\`python
# Python - requests library
import requests

response = requests.get('https://api.github.com/users/octocat')
data = response.json()
print(data['name'])

# POST request
payload = {'name': 'Alice', 'email': 'alice@example.com'}
response = requests.post('https://api.example.com/users', json=payload)
\`\`\`

Bạn muốn tìm hiểu về REST API design không?`
    }

    // Database
    if (
      lowerQuestion.includes("database") ||
      lowerQuestion.includes("sql") ||
      lowerQuestion.includes("cơ sở dữ liệu")
    ) {
      return `🗄️ **Database Operations:**

**PYTHON - Database:**

**SQLite (Built-in):**
\`\`\`python
import sqlite3

# Connect to database
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
    )
''')

# Insert data
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", 
               ("Alice", "alice@example.com"))

# Query data
cursor.execute("SELECT * FROM users WHERE name = ?", ("Alice",))
results = cursor.fetchall()

for row in results:
    print(f"ID: {row[0]}, Name: {row[1]}, Email: {row[2]}")

conn.commit()
conn.close()
\`\`\`

**PostgreSQL với psycopg2:**
\`\`\`python
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="username",
    password="password"
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
records = cursor.fetchall()

for record in records:
    print(record)

conn.close()
\`\`\`

**PERL - Database:**

**DBI (Database Interface):**
\`\`\`perl
use DBI;

# Connect to database
my $dbh = DBI->connect(
    "dbi:SQLite:dbname=example.db",
    "", "",
    { RaiseError => 1, AutoCommit => 1 }
);

# Create table
$dbh->do(qq{
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
    )
});

# Insert data
my $sth = $dbh->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$sth->execute("Alice", "alice@example.com");

# Query data
$sth = $dbh->prepare("SELECT * FROM users WHERE name = ?");
$sth->execute("Alice");

while (my @row = $sth->fetchrow_array()) {
    print "ID: $row[0], Name: $row[1], Email: $row[2]\\n";
}

$dbh->disconnect();
\`\`\`

**ORM Examples:**

**Python - SQLAlchemy:**
\`\`\`python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(100))

engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Create user
new_user = User(name='Alice', email='alice@example.com')
session.add(new_user)
session.commit()

# Query users
users = session.query(User).filter(User.name == 'Alice').all()
\`\`\`

Bạn muốn tìm hiểu về NoSQL databases không?`
    }

    // Default response với nhiều gợi ý hơn
    return `🤖 **Cảm ơn bạn đã hỏi!** 

Tôi có thể giúp bạn với nhiều chủ đề về **PERL & Python**:

**🐍 PYTHON:**
• **Cơ bản**: Variables, data types, operators
• **Control Flow**: if/else, loops, functions
• **Data Structures**: Lists, tuples, dictionaries, sets
• **OOP**: Classes, inheritance, polymorphism
• **File I/O**: Reading/writing files, JSON, CSV
• **Error Handling**: try/except, custom exceptions
• **Web**: Flask, Django, requests
• **Database**: SQLite, PostgreSQL, SQLAlchemy

**💎 PERL:**
• **Variables**: Scalars, arrays, hashes
• **Regex**: Pattern matching, substitution
• **References**: Array refs, hash refs
• **Subroutines**: Functions, parameters
• **File Operations**: Reading, writing, processing
• **Web**: CGI, Mojolicious
• **Database**: DBI, database connections

**🔧 THỰC HÀNH:**
• Debug code có lỗi
• Code review và optimization
• Best practices
• Performance tips

**Ví dụ câu hỏi bạn có thể hỏi:**
• "Giải thích về dictionary trong Python"
• "Cách sử dụng subroutines trong PERL"
• "So sánh list và array"
• "Xử lý JSON trong Python"
• "Regex để validate email"

Hãy hỏi cụ thể về chủ đề nào bạn quan tâm! 🚀`
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                  Câu hỏi phổ biến
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <HelpCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">🤖 AI có thể giúp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-blue-500" />
                  <span>Debug & sửa lỗi code</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-green-500" />
                  <span>Giải thích khái niệm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span>Gợi ý bài tập</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-purple-500" />
                  <span>Trả lời thắc mắc</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-blue-600" />
                  Chat với AI Assistant
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === "bot" && <Bot className="h-5 w-5 mt-0.5 text-blue-600" />}
                            {message.type === "user" && <User className="h-5 w-5 mt-0.5 text-white" />}
                            <div className="flex-1">
                              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                              <div
                                className={`text-xs mt-2 ${
                                  message.type === "user" ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-5 w-5 text-blue-600" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="mt-4 flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
