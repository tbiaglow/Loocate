USE loocate_db;
SELECT * FROM all_inspections;
DROP TABLE IF EXISTS all_inspections;
CREATE TABLE all_inspections (
Prop_ID VARCHAR(10),
AMPSDistrict INTEGER,
InspectionID INTEGER,
Season VARCHAR(10),
Insp_Round INTEGER,
Insp_Date VARCHAR(20),
BeginInspection VARCHAR(10), 
EndInspection VARCHAR(10),
Insp_Year VARCHAR(4),
Inspector INTEGER,
Inspector2 VARCHAR(10),
OverallCondition VARCHAR(3),
Cleanliness VARCHAR(3),
Safety_Condition VARCHAR(3),
Structural_Condition VARCHAR(3),
Visitor_Count VARCHAR(5),
Closed VARCHAR(100),
Comments TEXT,
Inspection_Type VARCHAR(20),
InspAddedDate VARCHAR(20),
PRIMARY KEY (InspectionID)
);