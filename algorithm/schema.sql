CREATE TABLE Station (
	Station_ID INT,
    Name VARCHAR(20),
    Prev_Station INT,
    Next_Station INT,
    Color VARCHAR(20),
	PRIMARY KEY (Station_ID)
);

INSERT INTO Station VALUES
	(1, 'Forest_Hills', NULL, 2, '056C4F'),
    (2, 'Downtown', 1, 3, '056C4F'),
    (3, 'Vice_Port', 2, 10, '056C4F'),
    (4, 'Vice_City_Beach', NULL, 10, 'F0B207'),
    (5, 'Prawn_Island', NULL, 10, '056C4F'),
    (6, 'Little_Haiti', NULL, 7, 'F0B207'),
    (7, 'Ocean_Beach', 6, 8, 'F0B207'),
    (8, 'Food_Street', -1, -1, 'B73F1D'),
    (9, 'Grand_Library', NULL, 8, 'B73F1D'),
    (10, 'Airport', -1, -1, 'B73F1D'),
    (11, 'Shipyard', -1, -1, 'B73F1D'),
    (12, 'Sheep_Village', NULL, 13, '754723'),
    (13, 'Govt_Office', 12, 14, '754723'),
    (14, 'Star_Town', -1, -1, 'B73F1D'),
    (15, 'Old_City', 14, 11, 'B73F1D'),
    (16, 'Leaf_Links', 17, 11, '699C40'),
    (17, 'City_Scrap', 18, 16, '699C40'),
    (18, 'New_Downtown', 19, 17, '699C40'),
    (19, 'Subways', NULL, 18, '699C40'),
    (20, 'Trench', NULL, 14, '754723');
    
    
CREATE TABLE Hybrid (
	Hybrid_ID INT,
    Star_Town INT,
    Shipyard INT,
    Airport INT,
    Food_Street INT
);

INSERT INTO Hybrid VALUES 
	(1, 15, 10, 11, 9),
    (2, 13, 16, 5, 7),
    (3, 20, 15, 4, 10),
    (4, NULL, NULL, 3, NULL), 
    (5, NULL, NULL, 8, NULL),
    (6, NULL, NULL, NULL, NULL);
    
    
CREATE TABLE half
	(Shipyard VARCHAR(20),
    Airport VARCHAR(20)
);

INSERT INTO half VALUES
	('Forest_Hills','Sheep_Village'), ('Downtown','Govt_Office'), ('Vice_Port','Star_Town'), ('Vice_City_Beach','Old_City'), 
    ('Prawn_Island','Leaf_Links'), ('Little_Haiti','City_Scrap'), ('Ocean_Beach','New_Downtown'), ('Food_Street','Subways'), ('Grand_Library','Trench');


CREATE TABLE details (Ticket INT, Fname VARCHAR(30), Lname VARCHAR(30), Phone VARCHAR(10), Booking DATE, starter VARCHAR(30), dest VARCHAR(30), PRIMARY KEY (Ticket));


