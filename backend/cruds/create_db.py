import os
import pyodbc
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

server = os.getenv("SERVER")
database = os.getenv("DATABASE")
username = os.getenv("USERNAME_CUS")
password = os.getenv("PASSWORD")
driver = os.getenv("DRIVER")

cnxn = pyodbc.connect(
    "DRIVER="
    + driver
    + ";SERVER="
    + server
    + ";DATABASE="
    + database
    + ";UID="
    + username
    + ";PWD="
    + password
)

cur = cnxn.cursor()

# cur.execute("DROP TABLE IF EXISTS Intern_detail")
# cur.execute("DROP TABLE IF EXISTS Selection_detail")
# cur.execute("DROP TABLE IF EXISTS Job_type")
# cur.execute("DROP TABLE IF EXISTS Period")
# cur.execute("DROP TABLE IF EXISTS Season")


# cur.execute("CREATE TABLE intern_detail(id INT IDENTITY PRIMARY KEY,company_name NVARCHAR(128) NOT NULL,period_id INT NOT NULL,jpb_id INT NOT NULL,salary INT NOT NULL,thoughts NVARCHAR(256) NOT NULL,selection_id INT NOT NULL,user_id INT NOT NULL)")
# cur.execute("CREATE TABLE selection_detail (id  INT IDENTITY PRIMARY KEY,sum_output INT NOT NULL,sum_intern INT NOT NULL,prepare_text NVARCHAR(256),skip_presence INT NOT NULL ,skip_detail NVARCHAR(256))")
# cur.execute("CREATE TABLE job_type (id  INT IDENTITY PRIMARY KEY,job_name NVARCHAR(128) NOT NULL)")
# cur.execute("CREATE TABLE period (id  INT IDENTITY PRIMARY KEY,period_text INT NOT NULL)")
# cur.execute("CREATE TABLE season (id  INT IDENTITY PRIMARY KEY,season_name NVARCHAR(128) NOT NULL)")

print("OK")
cur.commit()

cur.close()
