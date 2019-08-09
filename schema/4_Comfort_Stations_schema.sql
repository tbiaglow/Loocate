USE loocate_db;
SELECT * FROM comfort_stations;
DROP TABLE IF EXISTS comfort_stations;
CREATE TABLE comfort_stations (
Prop_ID VARCHAR(20),
CS_ID INTEGER,
Winterized VARCHAR(10),
Reason_Winterized TEXT,
Long_Term_Closure VARCHAR(10),
Reason_Closed TEXT,
Other_Notes TEXT, 
PRIMARY KEY (CS_ID)
);