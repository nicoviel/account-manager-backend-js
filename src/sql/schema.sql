drop database DB;

create database DB;

use DB;


create table user(
   id int primary key NOT NULL AUTO_INCREMENT,
   login VARCHAR(50),
   first_name VARCHAR(50),
   last_name VARCHAR(50),
   password VARCHAR(50),
   email VARCHAR(50)
   );

create table bank_account (
	id int primary key NOT NULL AUTO_INCREMENT,
	user_id int,
	amount double,
	name VARCHAR(50),
	company VARCHAR(50)	
);


create table account(
   id int primary key  NOT NULL AUTO_INCREMENT,
   current_amount double,
   future_amount_with_credit double,
   future_amount_without_credit double,
   user_id int
   );
   
create table live_credit(
   id int primary key  NOT NULL AUTO_INCREMENT,
   amount double,
   operation_date date,
   label VARCHAR(50),
   is_credited   int,
   is_internal int,
   account_id int,
   comment VARCHAR(1000),
   bank_account_id int
  );
   
 create table monthly_debit(
   id int primary key  NOT NULL AUTO_INCREMENT,
   amount double,
   operation_date date,
   label VARCHAR(50),
   is_debited   int,
   is_internal int,
   account_id int,
   comment VARCHAR(1000),
   bank_account_id int
  );
   
 create table live_debit(
   id int primary key  NOT NULL AUTO_INCREMENT,
   amount double,
   operation_date date,
   label VARCHAR(50),
   is_debited   int,
   is_internal int,
   account_id int,
   comment VARCHAR(1000),
   bank_account_id int
  );
 
 create table monthly_credit(
   id int primary key  NOT NULL AUTO_INCREMENT,
   amount double,
   operation_date date,
   label VARCHAR(50),
   is_credited   int,
   is_internal int,
   account_id int,
   comment VARCHAR(1000),
   bank_account_id int
  );
 
 
create table note(
    id int primary key  NOT NULL AUTO_INCREMENT,
    text VARCHAR(2000),
    user_id int
    );
    
 create table history(
   id int primary key  NOT NULL AUTO_INCREMENT,
   account_id int,
   end_month_amount double,
   start_month_amount double,
   amount_of_credit double,
   amount_of_debit double,
   saving_amount double,
   date date,
   total_amount double
  );
 
 