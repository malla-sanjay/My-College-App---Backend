CREATE DATABASE my_college_app;

USE my_college_app;

CREATE TABLE college_acc (
    college_id SERIAL PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_name VARCHAR(255) NOT NULL
);

CREATE TABLE blocks (
    block_id VARCHAR(50) PRIMARY KEY,
    block_name VARCHAR(255) NOT NULL,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE
);

CREATE TABLE classrooms (
    class_id VARCHAR(50) PRIMARY KEY,
    class_name VARCHAR(255) DEFAULT 'Undefined',
    class_capacity VARCHAR(50) REFERENCES capacities (capacity_code) ON DELETE CASCADE,
    block_id VARCHAR(50) REFERENCES blocks (block_id) ON DELETE CASCADE

);

CREATE TABLE capacities (
    capacity_code VARCHAR(50) PRIMARY KEY,
    no_of_student INT,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE
);

CREATE TABLE student_groups (
    student_group_id VARCHAR(50) PRIMARY KEY,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE,
    college_grade VARCHAR(50) NOT NULL,
    group_size VARCHAR(50) REFERENCES capacities (capacity_code) ON DELETE CASCADE
);

CREATE TABLE faculties (
    faculty_id VARCHAR(50) PRIMARY KEY,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE,
    faculty_name VARCHAR(255) NOT NULL
);

CREATE TABLE teachers (
    teacher_id VARCHAR(50) PRIMARY KEY,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE,
    teacher_name VARCHAR(255) NOT NULL
);

CREATE TABLE modules (
    module_id VARCHAR(50) PRIMARY KEY,
    colelge_id INT REFERENCES college_acc (college_id) ON DELETE CASCADE,
    module_name VARCHAR(255) NOT NULL,
    module_credits INT NOT NULL
);

CREATE TABLE teacher_modules (
    teacher_id VARCHAR(50) REFERENCES teachers (teacher_id) ON DELETE CASCADE,
    module_id VARCHAR(50) REFERENCES modules (module_id) ON DELETE CASCADE
);

CREATE TABLE faculty_modules (
    faculty_id VARCHAR(50) REFERENCES faculties (faculty_id) ON DELETE CASCADE,
    module_id VARCHAR(50) REFERENCES modules (module_id) ON DELETE CASCADE
);

INSERT INTO college_acc VALUES ('1001', 'Islington College', 'mallasanjay44@gmail.com', 'Sanjay Malla');

INSERT INTO capacities VALUES ('2G', '30');

INSERT INTO blocks VALUES ('BLK-1', 'BabarMahal', '1001');

INSERT INTO classrooms VALUES ('SR-1', 'Hero', '2G', 'BLK-1');