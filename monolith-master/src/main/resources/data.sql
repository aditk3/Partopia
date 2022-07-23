INSERT INTO user_table(user_id, email, first_name, last_name, img) VALUES(1, 'eric@email.com', 'Eric', 'Florence', '');
INSERT INTO user_table(user_id, email, first_name, last_name, img) VALUES(2, 'merry@email.com', 'Merry', 'Degaga', '');
INSERT INTO user_table(user_id, email, first_name, last_name, img) VALUES(3, 'damion@email.com', 'Damion', 'Silver', '');

INSERT INTO party(id, party_name, start_time, start_date, img, description, location, price, host, max_capacity) VALUES(1, 'Fun in the sun', '5 PM', '2022-01-08' , 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'Fun beach party', 'NY', 23.00, 1, 400);
INSERT INTO party(id, party_name, start_time, start_date, img, description, location, price, host, max_capacity) VALUES(2, 'The best party ever', '10 PM',  '2022-02-01' , 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBhcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 'YOLO', 'PA', 5, 2, 400);
INSERT INTO party(id, party_name, start_time, start_date, img, description, location, price, host, max_capacity) VALUES(3, 'Donut party', '4 PM', '2022-03-09' , 'https://images.unsplash.com/photo-1523755130311-9eadea3a0861?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFydHklMjBkb251dHN8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60', 'BYOD', 'FL', 40, 3, 400);
INSERT INTO party(id, party_name, start_time, start_date, img, description, location, price, host, max_capacity) VALUES(4, 'Largest party ever', '3 PM', '2022-05-08' , 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHklMjBsYXJnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60', 'There is going to be a million of us!!!', 'CA', 0, 1, 400);
INSERT INTO party(id, party_name, start_time, start_date, img, description, location, price, host, max_capacity) VALUES(5, 'Boat party', '9 PM', '2022-07-30' , 'https://images.unsplash.com/photo-1602867612779-3aaf54b425c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFydHklMjBib2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 'Not my boat', 'WA', 0, 1, 400);

INSERT INTO user_parties(user_id, party_id) VALUES(1,2);
INSERT INTO user_parties(user_id, party_id) VALUES(2,1);



INSERT INTO auth(id, email, password) VALUES(1, 'eric@email.com', '$2a$10$47reBm1s7p.tUkVr9IaWDOEZS.C9CFT8b5M0tTsld2um9R9Cbpcoq');
INSERT INTO auth(id, email, password) VALUES(2, 'merry@email.com', '$2a$10$f/w4K3Wgx3KN7is.PrUCQOSt2p6XyRlzYqN9tNvSrZhDTXYT1Lrja');
INSERT INTO auth(id, email, password) VALUES(3, 'damion@email.com', '$2a$10$3mH0S2l9iHMYQHUX.3G07exsW7.TDd.Q64AG7urvWdq0CZDrUu63q');

