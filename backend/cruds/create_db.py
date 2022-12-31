import os
import pyodbc
from dotenv import load_dotenv

# main.py と create_db の2箇所で同じように環境変数を読み出してるから共通化できそう
# 環境変数の読み込み
load_dotenv()

server = os.getenv("SERVER")
database = os.getenv("DATABASE")
username = os.getenv("USERNAME_CUS")
password = os.getenv("PASSWORD")
driver = os.getenv("DRIVER")
# TODO DB名のAPIに合わせる(Lv.1)
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

# cur.execute("DROP TABLE IF EXISTS intern_detail")
# cur.execute("DROP TABLE IF EXISTS selection_detail")
# cur.execute("DROP TABLE IF EXISTS job_type")
# cur.execute("DROP TABLE IF EXISTS period")
# cur.execute("DROP TABLE IF EXISTS season")
# cur.execute("DROP TABLE IF EXISTS evaluation")
# cur.execute("DROP TABLE IF EXISTS year")
# cur.execute("DROP TABLE IF EXISTS develop_ex")
# cur.execute("DROP TABLE IF EXISTS intern_ex")

# cur.execute(
#     "CREATE TABLE intern_detail(id INT IDENTITY PRIMARY KEY,company NVARCHAR(128) NOT NULL,year INT NOT NULL ,internType INT NOT NULL, period INT NOT NULL,jobType INT NOT NULL,salary INT NOT NULL,internContents NVARCHAR(256),evaluation INT NOT NULL,thoughts NVARCHAR(256) NOT NULL,sum_output INT NOT NULL ,sum_intern INT NOT NULL ,prepare_text NVARCHAR(256),skip_presence  INT NOT NULL ,skip_detail NVARCHAR(256),user_id NVARCHAR(256)  NOT NULL)"
# )
# cur.execute("CREATE TABLE selection_detail (id  INT IDENTITY PRIMARY KEY,sum_output INT NOT NULL,sum_intern INT NOT NULL,prepare_text NVARCHAR(256),skip_presence INT NOT NULL ,skip_detail NVARCHAR(256))")
# cur.execute(
#     "CREATE TABLE job_type (id  INT IDENTITY PRIMARY KEY,job_name NVARCHAR(256) NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE period (id  INT IDENTITY PRIMARY KEY,period_text NVARCHAR(256) NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE season (id  INT IDENTITY PRIMARY KEY,season_name NVARCHAR(256)NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE evaluation (id  INT IDENTITY PRIMARY KEY,text NVARCHAR(256) NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE year (id  INT IDENTITY PRIMARY KEY,text NVARCHAR(256) NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE develop_ex (id  INT IDENTITY PRIMARY KEY,text NVARCHAR(256) NOT NULL)"
# )
# cur.execute(
#     "CREATE TABLE intern_ex (id  INT IDENTITY PRIMARY KEY,text NVARCHAR(256) NOT NULL)"
# )

# period_data = ["1日", "2日", "3日", "4日", "5日", "1週間", "2週間", "3週間", "4週間", "それ以上"]
# period_sql = "INSERT INTO period VALUES (?)"
# for i in period_data:
#     cur.execute(period_sql, i)

# season_data = ["サマーインターン", "ウィンターインターン", "通年インターン", "その他"]
# season_sql = "INSERT INTO season VALUES (?)"
# for i in season_data:
#     cur.execute(season_sql, i)

# job_data = [
#     "SE",
#     "Web エンジニア",
#     "ネイティブアプリエンジニア",
#     "フロントエンドエンジニア",
#     "バックエンドエンジニア",
#     "インフラエンジニア",
#     "フルスタックエンジニア",
#     "組み込みソフトウェアエンジニア",
#     "機械学習エンジニア",
#     "データサイエンティスト",
#     "その他",
# ]
# job_sql = "INSERT INTO job_type VALUES (?)"
# for i in job_data:
#     cur.execute(job_sql, i)

# evaluation_data = ["1(とても不満足)", "2(少し不満足)", "3(普通)", "4(良かった)", "5(とても良かった)"]
# evaluation_sql = "INSERT INTO evaluation VALUES (?)"
# for i in evaluation_data:
#     cur.execute(evaluation_sql, i)

# year_data = ["2020年", "2021年", "2022年"]
# year_sql = "INSERT INTO year VALUES(?)"
# for i in year_data:
#     cur.execute(year_sql, i)

# count_data = ["0回", "1回", "2回", "3回", "4回以上"]
# intern_sql = "INSERT INTO intern_ex VALUES(?)"
# develop_sql = "INSERT INTO develop_ex VALUES(?)"
# for i in count_data:
#     cur.execute(develop_sql, i)
#     cur.execute(intern_sql, i)


# print("OK")
cur.commit()

cur.close()
