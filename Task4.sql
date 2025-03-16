create database thursday_task;
USE thursday_task;


CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);


INSERT INTO tasks (title, status) 
VALUES ('Completed project', 'Pending'), ('database structure', 'completed'),('project', 'Pending'),('MYSQL', 'Completed'),('CMS Fundamental', 'Pending'),('Completed project', 'Pending'), ('Completed project', 'Pending'), ('Completed project', 'Pending');
INSERT INTO tasks (title, status) 
VALUES ('MYSQL', 'Completed'),('CMS Fundamental', 'Pending');

SELECT * FROM tasks;


UPDATE tasks
SET status = 'Completed'
WHERE id = 1;


DELETE FROM tasks
WHERE id = 1;
