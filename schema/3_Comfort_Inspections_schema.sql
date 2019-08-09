USE loocate_db;
SELECT * FROM comfort_inspections;
DROP TABLE IF EXISTS comfort_inspections;
CREATE TABLE comfort_inspections (
id INTEGER NOT NULL,
InspectionID INTEGER,
CSNumber INTEGER,
MW VARCHAR(2),
OvCond VARCHAR(10),
isClosed INTEGER,
isOfficially INTEGER,
HandDryersAm VARCHAR(10),
ChangingTablesAm VARCHAR(10),
MirrorsAm VARCHAR(10),
UrinalsAm VARCHAR(10),
UrinalsComm TEXT,
ToiletsAm VARCHAR(10),
ToiletsComm TEXT,
SinksAm VARCHAR(10),
SinksComm TEXT,
ToiletPaperDispAm VARCHAR(10),
ToiletPaperDispComm TEXT,
SoapDispAm VARCHAR(10),
SoapDispComm TEXT,
PaperTowelDispAm VARCHAR(10),
PaperTowelDispComm TEXT,
Comm TEXT,
PRIMARY KEY (id)
);