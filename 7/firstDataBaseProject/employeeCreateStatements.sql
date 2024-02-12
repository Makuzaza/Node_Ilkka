drop database if exists employeedb;

create database employeedb;

use employeedb;

create table employee (
    id integer not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(20),
    salary decimal(6,2)
);

insert into employee values(1, 'Leila','Hökki','ict',4000);
insert into employee values(2, 'Matt','River','ict',5000);

drop user if exists 'server'@'localhost';
create user 'server'@'localhost' identified by '1234';
grant all privileges on employeedb.* to 'server'@'localhost';