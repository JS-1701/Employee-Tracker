INSERT INTO department (name)
VALUES ('Engineering'),
 ('Sales'),
  ('Finance'),
   ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 1),
 ('Sales Lead', 80000, 2),
  ('Accountant', 70000, 3),
   ('Legal Team Lead', 75000, 4);

   INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Alice', 'Johnson', 1, NULL),
     ('Bob', 'Smith', 2, 1),
      ('Charlie', 'Thompson', 3, 2),
        ('Diana', 'Lee', 4, 3);