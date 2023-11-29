CREATE TABLE manager (
MID int PRIMARY KEY,
name varchar(255) NOT NULL,
level_edu int NOT NULL,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
CONSTRAINT edu check (level_edu >= 0 AND level_edu <=4)
);


CREATE TABLE warehouse (
WID int PRIMARY KEY,
address varchar(255) NOT NULL,
MID int,
flag int,
CONSTRAINT MID_con FOREIGN KEY (MID)
REFERENCES manager(MID),
CONSTRAINT warehouse_type check (flag >=0 and flag <=2)
);
CREATE TABLE product (
PID int PRIMARY KEY,
name varchar(255) NOT NULL
);
CREATE TABLE supplier (
SID int PRIMARY KEY,
address varchar(255) NOT NULL
);
CREATE TABLE inventory (
WID int,
PID int,
SID int,
threshold int NOT NULL,
item_count int NOT NULL,
price decimal(15,2),
CONSTRAINT price check (price >0),
CONSTRAINT wid FOREIGN KEY (WID)
REFERENCES warehouse(WID),
CONSTRAINT pid FOREIGN KEY (PID)
REFERENCES product(PID),
CONSTRAINT sid_1 FOREIGN KEY (SID)
REFERENCES supplier(SID),
CONSTRAINT pk PRIMARY KEY (WID,PID)
);
CREATE TABLE food (
PID int PRIMARY KEY,
shelf_life int NOT NULL,
CONSTRAINT shelf_life check (shelf_life >0),
CONSTRAINT pid_2 FOREIGN KEY (PID)
REFERENCES product(PID)
);
CREATE TABLE explosive (
PID int PRIMARY KEY,
storage_temp int NOT NULL,
CONSTRAINT pid_3 FOREIGN KEY (PID)
REFERENCES product(PID)
);
CREATE TABLE client (
CID int PRIMARY KEY,
name varchar(255) NOT NULL,
street_address varchar(255) NOT NULL,
postal_code varchar(255) NOT NULL UNIQUE,
email varchar(255) NOT NULL,
city varchar(255) NOT NULL,
province varchar(255) NOT NULL,
password varchar(255) not null
);
CREATE TABLE Client3 (
postal_code varchar(255) PRIMARY KEY,
city varchar(255) NOT NULL UNIQUE,
FOREIGN KEY (postal_code) REFERENCES client(postal_code)
);
CREATE TABLE Client2 (
city varchar(255) PRIMARY KEY,
province varchar(255) NOT NULL,
FOREIGN KEY (city) REFERENCES Client3(city)
);
CREATE TABLE orders (
OID int,
CID int,
price int NOT NULL,
CONSTRAINT cid_1 FOREIGN KEY (CID) REFERENCES client(CID),
CONSTRAINT pk_1 PRIMARY KEY (OID,CID),

CONSTRAINT price check (price > 0)
);
CREATE TABLE inspector (
InID int PRIMARY KEY,
name varchar(255) NOT NULL,
scpeciliaty int NOT NULL,
CONSTRAINT scpeciliaty check (scpeciliaty >=0 and scpeciliaty <=2)
);
CREATE TABLE ItemsOrder (
OID int,
CID int,
WID int,
PID int,
SID int,
quantity int,
CONSTRAINT cid_9 FOREIGN KEY (CID)
REFERENCES client(CID),
CONSTRAINT wid_6 FOREIGN KEY (WID)
REFERENCES warehouse(WID),
CONSTRAINT sid_11 FOREIGN KEY (SID)
REFERENCES supplier(SID),
CONSTRAINT pid_6 FOREIGN KEY (PID)
REFERENCES product(PID),
CONSTRAINT ItemsOrder_pk PRIMARY KEY (OID,CID),
CONSTRAINT nums check (quantity > 0)
);
CREATE TABLE insurance (
IID int PRIMARY KEY,
policy CLOB,
name varchar(255)
);
create TABLE Insurances(
WID int,
IID int,
dates date,
SecuritySysemPercent int NOT NULL UNIQUE,
constraint wid_8 FOREIGN KEY (WID)
references warehouse(WID),
constraint idd_8 FOREIGN KEY (IID)
references insurance(IID),
Primary KEY( dates, IID, WID),
CONSTRAINT SecuritySysemPercent check (SecuritySysemPercent >=0 and
SecuritySysemPercent <=100)
);
create TABLE covers(
SecuritySysemPercent int,
Cover int,
constraint SecuritySysemPercent foreign key(SecuritySysemPercent)
references insurances(SecuritySysemPercent),
PRIMARY KEY(SecuritySysemPercent),
CONSTRAINT Cover check (Cover >=0 and Cover <=100)
);
CREATE TABLE audit (
WID int,
InID int,
audit_type int,
audit_date date,
score int,
CONSTRAINT pk_2 PRIMARY KEY (WID,InID,audit_type,audit_date),
CONSTRAINT InID FOREIGN KEY (InID)
REFERENCES inspector(InID),
CONSTRAINT score check (score>=0 and score<=100)
);
Alter table product alter column link type Varchar;
alter table orders alter column price type numeric(15, 4);
alter table itemsorder drop constraint itemsorder_pk;
alter table itemsorder add primary key (oid, cid, wid, pid,sid);