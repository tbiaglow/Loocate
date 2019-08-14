DROP DATABASE IF EXISTS loocate_db; 
CREATE DATABASE loocate_db;
USE loocate_db; 
DROP TABLE IF EXISTS all_sites;
CREATE TABLE all_sites (
id INTEGER 
Prop_ID VARCHAR(100),
Prop_Num VARCHAR(100),
Boro VARCHAR(10),
AMPSDistrict VARCHAR(100),
Prop_Name VARCHAR(100),
Site_Name VARCHAR(100),
Prop_Location VARCHAR(100),
Site_Location VARCHAR(100),
Acres FLOAT,
Category VARCHAR(100),
Sub_Category VARCHAR(100),
Rated VARCHAR(100),
Reason_Not_Rated VARCHAR(100),
Council_District VARCHAR(100),
ZipCode VARCHAR(100),
COMMUNITYBOARD VARCHAR(100),
Jurisdiction VARCHAR(100),
NYSAssembly VARCHAR(100),
NYSSenate VARCHAR(100),
USCongress VARCHAR(100),
Precinct VARCHAR(100),
ComfortStation VARCHAR(100),
PermitDistrict VARCHAR(100),
GISBoro VARCHAR(100),
GIS_Site_Location VARCHAR(100),
PRIMARY KEY(id)
);