INSERT INTO `product` (name, price, amount) VALUES ('kaszanka', 69, 100);
INSERT INTO `product` (name, price, amount) VALUES ('marchewka', 96, 1);
INSERT INTO `product` (name, price, amount) VALUES ('piguly', 666, 69);
INSERT INTO `product` (name, price, amount) VALUES ('kielbassa', 32, 0);


INSERT INTO `address` (address) VALUE ('ChIJi0FfadA0GkcRGMY5IrGRwvs');
INSERT INTO `address` (address) VALUE ('ChIJWcMzpXK2G0cR62Io87SWZPg');
INSERT INTO `address` (address) VALUE ('ChIJ8clUuUx6E2sR6nU8x8GtzPc');



INSERT INTO user (sex, name, surname, email, password, deafult_address) VALUES
  ('male', 'Adam', 'Malysz', 'adam.malysz@gmail.com', 'bananbulka', 1);

INSERT INTO user (sex, name, surname, email, password, deafult_address) VALUES
  ('male', 'Piotr', 'Kowalski', 'a', 'a', 2);

  INSERT INTO user (sex, name, surname, email, password, deafult_address) VALUES
  ('male', 'Piotr', 'Kowalski', 'b', 'b', 3);

INSERT INTO `user_address` (address_id, user_id) VALUES (1, 2);
INSERT INTO `user_address` (address_id, user_id) VALUES (3, 2);