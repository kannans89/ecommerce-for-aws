create table category (product_category varchar(20),no_of_products int,primary key(product_category));
create table products(product_guid int,name varchar(20),image varchar(20),description varchar(30),price int,product_category varchar(20),primary key(product_guid), foreign key (product_category) references category(product_category));
create table customer(customer_guid int,username varchar(20),password varchar(20),registration_date varchar(20),primary key(customer_guid));
create table product_order(order_id int,customer_guid int,no_of_items int,order_date varchar(20),primary key(order_id),foreign key(customer_guid) references customer(customer_guid));
create table lineitems(lineitem_guid int,product_guid int,order_guid int,quantity int,primary key(lineitem_guid));
create table organization(name varchar(20),address varchar(20),contact varchar(20),email varchar(20));
create table cart(no int,name varchar(20),price int,qty int,totalPrice int,category varchar(20),product_guid int,customer_guid int,primary key(no),foreign key(customer_guid) references customer(customer_guid),foreign key(product_guid) references products(product_guid));


select * from products;
select * from category;
select * from organization;
select * from lineitems;
select * from product_order;
select * from cart;
select * from customer;


insert into category values('mobiles',3);
insert into category values('laptops',4);
insert into category values('bags',3);

INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (1, 'iPhone X', 'ix.jpg', 'This is iphones latest version.', 50000, 'mobiles');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (2, 'Samsung S9', 's9.jpg', 'This is samsungs s9 version.', 40000, 'mobiles');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (3, 'Redmi Note 5', 'rn5.jpg', 'This is redmi note 5.', 30000, 'mobiles');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (4, 'Skybag Vault S3', 'skybag.jpeg', 'Built-in headphone cord port. Quick-access, front pocket for frequently needed items.', 900, 'bags');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (5, 'Swiss Gear knought5', 'swiss.jpg', 'Padded, Airflow back panel with mesh fabric for back ventilation and support.', 600, 'bags');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (6, 'Alienware 2.0', 'alien.jpg', 'Highlights a 13 inch-inch LED-illuminated wide screen having a determination of 2560x1600 pixels', 80000, 'laptops');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (7, 'Dell inspiron', 'dell.jpg', '8 GB LPDDR3 memory coupled with 512 GB storage to keep you hooked.', 70000, 'laptops');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (8, 'High Sierra profound', 'hs.jpg', 'Ergonomically contoured, padded shoulder straps.', 2000, 'bags');
INSERT INTO `products` (`product_guid`, `name`, `image`, `description`, `price`, `product_category`) VALUES (9, 'Mac Book pro', 'mac.jpg', 'Geared for exceptional performance with MacBook comes with Touch Bar with integrated Touch ID.', 90000, 'laptops');

INSERT INTO `organization` (`id`, `name`, `address`, `contact`, `email`) VALUES (1, 'swabhav', 'andheri', 101, 'swabhav@swabhav.com');


delete from cart;
delete from lineitems;
delete from product_order;
drop table cart;