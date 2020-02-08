/* Seeds for SQL table. */
USE employee_trackerDB;

/* Populating with Test Data */
INSERT INTO department (name)
VALUES ("LCMS"), ("Specimen Management"), ("Cytogenetics");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 1000000, 1), ("Cytogeneticist", 60000, 2), ("Accessioner", 30000, 3), ("Medical Technologist I", 25000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julie", "Choi", 1,1), ("Jonathan","Choi", 2,0), ("Lewis", "Black", 3,0), ("Soleiby", "Delcid", 4,0);

