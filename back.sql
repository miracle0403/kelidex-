DELIMITER //
CREATE PROCEDURE feederAmount (user VARCHAR(255))
BEGIN
INSERT INTO earnings (user, feeder, stage1, stage2, stage3, stage4, car, powerbank, phone, salary, laptop, empower, leadership) VALUES (user, 4000, 0, 0,0,0,0,0,0,0,0,0,0);

INSERT INTO transactions (user, credit, balance_bf, description, balance) VALUES (user, 4000, 0, 'feeder cash', 6000);

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE earnings(user VARCHAR(255), fullname VARCHAR(255), phone VARCHAR(255), code INT (11), bank VARCHAR(255), accountName VARCHAR(255), accountNumber VARCHAR(255), username varchar(255))
BEGIN
INSERT INTO orders (payer, receiver, accountName, accountNumber, status, purpose,code, phone) VALUES (username, 'Admin', 'The account Name', '1234567890', 'pending', 'admin fee', 234, 8061179366);

INSERT INTO orders (payer, receiver, accountName, accountNumber, status, code, phone, purpose) VALUES (username, user, account_name, account_number,  'pending', code, phone, 'matrix');

END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE debit (user VARCHAR(255), balance INT (11))
BEGIN
INSERT INTO transactions (user, debit, balance_bf, description, balance) VALUES (user, balance, balance, 'All funds', 0);
INSERT INTO withdraw (user, status, description, amount) VALUES (user, 'pending', 'All funds', balance);
END //
DELIMITER ;

drop table feeder_tree
CREATE TABLE `feeder_tree` (
	`matrix_id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` VARCHAR(255) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

DELIMITER //
CREATE PROCEDURE stage1Amount (user VARCHAR(255))
BEGIN
UPDATE earnings SET powerbank = 4000, amount = amount + 40000 WHERE user = user;


INSERT INTO transactions (user, balance_bf, balance, credit, description) VALUES (user, balance, balance + 40000, 40000, 'stage1 cash' );

INSERT INTO transactions (user, balance_bf, balance, credit, description) VALUES (user, balance, balance + 40000, 4000, 'powerbank' );


END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stage3Amount (user VARCHAR(255))
BEGIN
UPDATE earnings SET laptop = 100000, amount = amount + 300000 WHERE user = user;

INSERT INTO transactions (user, credit, description) VALUES (user, 300000, 'stage3 cash' );

INSERT INTO transactions (user, credit, description) VALUES (user, 100000, 'laptop' );

UPDATE user_tree SET stage4 = "yes" WHERE user = user;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stage4Amount (user VARCHAR(255))
BEGIN
UPDATE earnings SET car = 5000000, amount = amount + 800000, salary = 30000, empower = 100000, leadership = 100000 WHERE user = user;

INSERT INTO transactions (user, credit, description) VALUES (user, 800000, 'stage4 cash' );

INSERT INTO transactions (user, credit, description) VALUES (user, 5000000, 'car' );

INSERT INTO transactions (user, credit, description) VALUES (user, 100000, 'leadership' );

INSERT INTO transactions (user, credit, description) VALUES (user, 100000, 'empower' );

INSERT INTO transactions (user, credit, description) VALUES (user, 30000, 'salary' );



UPDATE user_tree SET stage4 = "yes" WHERE user = user;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stage2Amount (user VARCHAR(255))
BEGIN
UPDATE earnings SET phone = 30000, amount = amount + 100000 WHERE user = user;

INSERT INTO transactions (user, credit, description) VALUES (user, 100000, 'stage2 cash' );

INSERT INTO transactions (user, credit, description) VALUES (user, 30000, 'phone' );

UPDATE user_tree SET stage3 = "yes" WHERE user = user;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stage3try(sponsor VARCHAR(255), mother VARCHAR(255), child VARCHAR(255))
BEGIN
SELECT @myLeft := lft FROM stage3 WHERE user = mother;
INSERT INTO stage3_tree (sponsor, user) VALUES (sponsor, child);
UPDATE sttage3 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage3 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage3 SET amount = amount + 1 WHERE user = mother;

INSERT INTO stage3(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE stage4try(sponsor VARCHAR(255), mother VARCHAR(255), child VARCHAR(255))
BEGIN
SELECT @myLeft := lft FROM stage4 WHERE user = mother;
INSERT INTO stage4_tree (sponsor, user) VALUES (sponsor, child);
UPDATE sttage4 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage4 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage4 SET amount = amount + 1 WHERE user = mother;

INSERT INTO stage4(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);

END //
DELIMITER ;


CREATE TABLE pin( user VARCHAR(255) UNIQUE, serial text NOT NULL, pin varchar( 255 ) NOT NULL, date DATETIME  DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE info( user INT(11) NOT NULL, subject varchar( 255 ) NOT NULL, date DATETIME  DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE news( id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, subject VARCHAR (255) NOT NULL, text TEXT NOT NULL, date DATETIME  DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE earnings( order_id INT(11) PRIMARY KEY NOT NULL, user varchar(255), feeder INT (11), feederbonus INT (11), date DATETIME  DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE orders( id INT (11) AUTO_INCREMENT PRIMARY KEY NOT NULL, purpose VARCHAR(255), code INT(11) NOT NULL, phone VARCHAR (255) NOT NULL, fullname varchar( 255 ) NOT NULL, payer varchar (255) NOT NULL, receiver varchar (255) NOT NULL, bank varchar (255) not null, accountName varchar (255) not null, accountNumber varchar (255) not null,   status varchar (255) not null, date DATETIME  DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE reset( user VARCHAR( 255 ) NOT NULL, status text, code VARCHAR(255) not null, password VARCHAR(255) null, date DATETIME  DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE verify( user VARCHAR( 255 ) NOT NULL, status text, code VARCHAR( 255) not null, date DATETIME  DEFAULT CURRENT_TIMESTAMP);
				
CREATE TABLE `feeder_tree` (
	`matrix_id` INT(11) UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
CREATE TABLE `stage1_tree` (
	`matrix_id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` VARCHAR(255) NULL DEFAULT NULL,
	`aa` VARCHAR(255) NULL DEFAULT NULL,
	`ab` VARCHAR(255) NULL DEFAULT NULL,
	`ac` VARCHAR(255) NULL DEFAULT NULL,
	`ad` VARCHAR(255) NULL DEFAULT NULL,
	`ba` VARCHAR(255) NULL DEFAULT NULL,
	`bb` VARCHAR(255) NULL DEFAULT NULL,
	`bc` VARCHAR(255) NULL DEFAULT NULL,
	`bd` VARCHAR(255) NULL DEFAULT NULL,
	`ca` VARCHAR(255) NULL DEFAULT NULL,
	`cb` VARCHAR(255) NULL DEFAULT NULL,
	`cc` VARCHAR(255) NULL DEFAULT NULL,
	`cd` VARCHAR(255) NULL DEFAULT NULL,
	`da` VARCHAR(255) NULL DEFAULT NULL,
	`db` VARCHAR(255) NULL DEFAULT NULL,
	`dc` VARCHAR(255) NULL DEFAULT NULL,
	`dd` VARCHAR(255) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
`order_id` INT (11) NULL,
	`purpose` VARCHAR(255),
	`code` INT(11) NULL,
	`phone` VARCHAR (255) NULL, 
	`fullname` varchar( 255 ) NULL, 
	`payer` varchar (255) NULL,
	`receiver` varchar (255) NULL, 
	`bank` varchar (255) null, 
	`accountName` varchar (255) null, 
	`accountNumber` varchar (255) null,
	
	
CREATE TABLE `feeder` (
	`matrix_id` INT(11) UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`order_id` INT (11) NULL,	
	`status` varchar (255) null, 
	`date_entered` DATETIME  DEFAULT CURRENT_TIMESTAMP
	
);

CREATE TABLE `admin` (
	`user` INT(11)NOT NULL
);


CREATE TABLE `stage2` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);


DELIMITER //
CREATE PROCEDURE stage2try(sponsor VARCHAR(255), mother VARCHAR(255), child VARCHAR(255))
BEGIN
SELECT @myLeft := lft FROM stage2 WHERE user = mother;
INSERT INTO stage2_tree (sponsor, user) VALUES (sponsor, child);
UPDATE sttage2 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage2 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage2 SET amount = amount + 1 WHERE user = mother;

INSERT INTO stage2(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);

END //
DELIMITER ;

CREATE TABLE `stage3` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);

CREATE TABLE `stage4` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);

CREATE TABLE `stage1` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);

DELIMITER //
CREATE PROCEDURE leafadd( mother VARCHAR(255), child VARCHAR(255), pin INT(11))
BEGIN

SELECT @myLeft := lft FROM feeder WHERE user = mother;

UPDATE feeder SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE feeder SET lft = lft + 2 WHERE lft > @myLeft;
INSERT INTO feeder(user, lft, rgt, amount, order_id, status) VALUES(child, @myLeft + 1, @myLeft + 2, 0, pin, 'pending');

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE leafdel(child VARCHAR(255), pin INT(11))
BEGIN

SELECT @myLeft := lft FROM feeder WHERE user = child;

UPDATE feeder SET rgt = rgt - 2 WHERE rgt > @myLeft;
UPDATE feeder SET lft = lft - 2 WHERE lft > @myLeft;
DELETE FROM feeder WHERE user = child AND 
INSERT INTO feeder(user, lft, rgt, amount, order_id, status) VALUES(child, @myLeft + 1, @myLeft + 2, 0, pin, 'pending');

END //
DELIMITER ;


CREATE TABLE `earnings` (
	`user` VARCHAR(255) NOT NULL,
	`feeder` INT(11) NOT NULL,
	`feederbonus` INT(11) NOT NULL,
	`stage1` INT(11) NOT NULL
);

CREATE TABLE `feederpayment` (
	`receiver` VARCHAR(255) NOT NULL,
	`payer` VARCHAR(255) NOT NULL,
	`account details` VARCHAR(255) NOT NULL,
	`transaction_id` VARCHAR(255)  NULL,
	`status` VARCHAR(255) NOT NULL,
	`date` DATETIME DEFAULT CURRENT_TIMESTAMP
);
drop table transactions;
CREATE TABLE `transactions` (
	`id` INT(11)  PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`balance_bf` INT(11) NOT NULL,
	`credit` INT(11) ,
	`debit` INT(11),
	`description` VARCHAR(255) NOT NULL,
	`debit_receipt` VARCHAR(255),
	`balance` INT(11) NOT NULL,
	`date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

drop table withdraw;
CREATE TABLE `withdraw` (
	`Order_id` INT(11)  PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`status` VARCHAR(255),
	`amount` INT(11),
	`description` VARCHAR(255) NOT NULL,
	`date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

drop table user;
CREATE TABLE `user`( user_id INT( 11 ) PRIMARY KEY AUTO_INCREMENT NOT NULL, sponsor text,  username varchar( 255 ) UNIQUE NOT NULL, full_name varchar ( 255 ) NOT NULL, verification text, status text, email varchar ( 255 ) UNIQUE NOT NULL, phone VARCHAR(255) NOT NULL,  amount INT(11) NOT NULL, code INT( 11 ) NOT NULL, password varchar( 255 ) NOT NULL, paid varchar( 255 ),date DATETIME  DEFAULT CURRENT_TIMESTAMP)	;

CREATE TABLE `profile` (
	`user` VARCHAR (255) NOT NULL,
	`bank` TEXT NOT NULL,
	`account_name` TEXT NOT NULL,
	`account_number` VARCHAR(255) NOT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

DELIMITER //
CREATE PROCEDURE `register`( sponsor TEXT, full_name VARCHAR( 255 ), phone VARCHAR( 255 ), code INT( 11 ), username VARCHAR( 255 ), email VARCHAR ( 255 ), password VARCHAR( 255 ), status VARCHAR( 255 ), verification TEXT)                                 
 BEGIN

SELECT @myLeft := lft FROM user_tree WHERE user = sponsor;

UPDATE user_tree SET rgt = rgt + 2 WHERE rgt > @myLeft;

UPDATE user_tree SET lft = lft + 2 WHERE lft > @myLeft;

INSERT INTO user_tree(sponsor, number, user, rgt, lft) VALUES(sponsor, 0, username, @myLeft + 2, @myLeft + 1);

INSERT INTO user (amount, sponsor, full_name, phone, code, username, email, password, status, verification) VALUES (0, sponsor, full_name, phone,code, username, email, password, 'active', 'no');
END//
DELIMITER ;

drop table user_tree;
CREATE TABLE `user_tree` (
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL,
	`number` INT(11) NULL,
	`feeder` VARCHAR(255)NULL,
	`stage1` VARCHAR(255) NULL
);
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` INT(11) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

drop table stage3;
CREATE TABLE `stage3_tree` (
	`matrix_id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` INT(11) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

drop table stage4;
CREATE TABLE `stage4_tree` (
	`matrix_id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` INT(11) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
drop procedure stage1in;
DELIMITER //
CREATE PROCEDURE stage1in( sponsor VARCHAR(255), mother VARCHAR(255), child VARCHAR(255))
BEGIN
SELECT @myLeft := lft FROM stage1 WHERE user = mother;
UPDATE stage1 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage1 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage1 SET amount = amount + 1 WHERE user = mother;
INSERT INTO stage1(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);
INSERT INTO stage1_tree ( sponsor, user) VALUES (sponsor, child);

END //
DELIMITER ;