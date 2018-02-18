INSERT INTO `product` (name, price, amount) VALUES ('kaszanka', 69, 100);
INSERT INTO `product` (name, price, amount) VALUES ('marchewka', 96, 1);
INSERT INTO `product` (name, price, amount) VALUES ('piguly', 666, 69);
INSERT INTO `product` (name, price, amount) VALUES ('kielbassa', 32, 0);


INSERT INTO `adress` (adress) VALUE ('ChIJi0FfadA0GkcRGMY5IrGRwvs');
INSERT INTO `adress` (adress) VALUE ('EiZBbGVqZSBKZXJvem9saW1za2llLCBQcnVzemvDs3csIFBvbHNrYQ');



INSERT INTO user (sex, name, surname, email, password, deafult_adress) VALUES
  ('male', 'Adam', 'Malysz', 'adam.malysz@gmail.com', 'bananbulka', 1);

INSERT INTO `user_adress` (adress_id, user_id) VALUES (2, 1);
INSERT INTO `user_adress` (adress_id, user_id) VALUES (1, 1);