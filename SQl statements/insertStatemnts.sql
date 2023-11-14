

INSERT INTO manager (MID, name, level_edu, email, password)
VALUES
(1, 'John Doe', 3, 'johnDoe@kadiroventerprices.com', 'johndoe1234'),
(2, 'Alice Smith', 4, 'alicesmith@kadiroventerprices.com', 'alicesmith42'),
(3, 'Bob Johnson', 2, 'bobjohnson@kadiroventerprices.com', 'bobJ2023'),
(4, 'Eva Williams', 1, 'evawilliams@kadiroventerprices.com', 'evaW!2023'),
(5, 'Jane Doe', 1, 'janedoe@kadiroventerprices.com', 'janeDoe#321');
INSERT INTO warehouse (WID, address, MID, flag)
VALUES (1, '123 Main St', 1, 0),
(2, 'UBC Main St', 2, 2),
(3, '246 Hillcrest Ave', 3, 0),
(4, 'Granville st', 4, 1),
(5, 'XXX Mall', 5, 2);
INSERT INTO product (PID, name)
VALUES (1, 'coke'),
(2, 'instant noodle'),
(3, 'chips'),
(4, 'juice'),
(5, 'laptop'),
(6, 'beef'),
(7, 'alcohol'),
(8, 'match'),
(9, 'lighter'),
(10, 'hydrogen tank');
INSERT INTO supplier (SID, address)
VALUES (1, '123 Main St'),
(2, 'UBC Main St'),
(3, '246 Hillcrest Ave'),
(4, 'Granville St'),
(5, 'XXX Mall');
INSERT INTO explosive (PID, storage_temp)
VALUES (5, 20),
(7, 20),
(8, 20),
(9, 20),
(10, 15);
INSERT INTO inventory (WID, PID, SID, threshold, item_count, price)
VALUES (1, 1, 1, 50, 200, 2.99),
(1, 2, 2, 50, 200, 2.99),
(1, 3, 3, 50, 200, 2.99),
(1, 4, 4, 50, 200, 5.99),
(1, 5, 5, 10, 40, 2000);
INSERT INTO insurance (IID, policy, name)
VALUES (1, 'some_policy', 'Combo1'),
(2, 'some_policy_1', 'Combo2'),
(3, 'some_policy_2', 'Combo3'),
(4, 'some_policy_3', 'Combo4'),
(5, 'some_policy_4', 'Combo5');
INSERT INTO inspector (InID, name, scpeciliaty)
VALUES (1, 'John Smith', 1),
(2, 'Alice Smith', 1),
(3, 'John Doe', 1),
(4, 'Bob Johnson', 1),
(5, 'Jane Doe', 1);
INSERT INTO audit (WID, InID, audit_type, audit_date, score)
VALUES (1, 1, 0, '2023-10-18', 90),
(1, 2, 1, '2023-10-18', 100),
(1, 3, 2, '2023-10-18', 60),
(2, 1, 0, '2023-9-18', 80),
(2, 2, 1, '2023-9-18', 94);
INSERT INTO Insurances (WID, IID, dates, SecuritySysemPercent)
VALUES (1, 1, '2023-10-18', 80),
(1, 2, '2023-10-18', 99),
(1, 3, '2023-10-18', 100),
(1, 4, '2023-10-18', 40),
(1, 5, '2023-10-18', 07);
INSERT INTO covers (SecuritySysemPercent, Cover)
VALUES (80, 20),
(99, 0),
(100, 0),
(40, 60),
(07, 100);
INSERT INTO client (CID, name, street_address, postal_code, email, password, city, province)
VALUES (1, 'Michael Brown', '456 Oak Lane', 'V9R', 'michael.brown@example.net', 'MikeB456@', 'Parksville', 'BC'),
(2, 'Emily Johnson', '789 Maple Ave', 'V6S', 'emily.johnson@example.net', 'EmilyJ789#', 'Vancouver', 'BC'),
(3, 'Chris Lee', '234 Elm Road', 'V3B', 'chris.lee@example.net', 'ChrisL234$', 'Langley', 'BC'),
(4, 'Sarah Martinez', '901 Pine Street', 'V5D', 'sarah.martinez@example.net', 'SarahM901!', 'Burnaby', 'BC'),
(5, 'David Wilson', '567 Birch Blvd', 'V9Y', 'david.wilson@example.net', 'DavidW567^', 'Port Alberni', 'BC');
INSERT INTO Client3 (postal_code, city)
VALUES ('V9R', 'Parksville'),
('V6S', 'Vancouver'),
('V3B', 'Langley'),
('V5D', 'Burnaby'),
('V9Y', 'Port Alberni');
INSERT INTO Client2 (city, province)
VALUES ('Vancouver', 'BC'),
('Parksville', 'BC'),
('Langley', 'BC'),
('Burnaby', 'BC'),
('Port Alberni', 'BC');
INSERT INTO orders (OID, CID, price)
VALUES (1, 1, 100),
(1, 2, 130),
(1, 3, 260),
(1, 4, 432),
(1, 5, 121);
INSERT INTO ItemsOrder (OID, CID, WID, PID, SID, quantity)
VALUES (1, 1, 1, 1, 1, 10),
(1, 2, 1, 2, 1, 15),
(1, 3, 1, 1, 1, 20),
(1, 4, 1, 1, 1, 7),
(1, 5, 1, 1, 1, 3);

delete from orders where oid=585424;