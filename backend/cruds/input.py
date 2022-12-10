import os
import pyodbc
from dotenv import load_dotenv

# 環境変数の読み込み

def post_intern_info(
    env_list:list,
    company: str,
    year: int,
    internType: int,
    period: int,
    jobType: int,
    salary: int,
    internContents: str,
    evaluation: int,
    developEx: int,
    internEx: int,
    internTestPreparation: str,
    isSelectionExemption: int,
    selectionExemptionContents: str,
    impressions: str,
    uid : str
):
    cnxn = pyodbc.connect(
    "DRIVER="
    + env_list[4]
    + ";SERVER="
    + env_list[0]
    + ";DATABASE="
    + env_list[1]
    + ";UID="
    + env_list[2]
    + ";PWD="
    + env_list[3]
    )
    print("OK")
    cur = cnxn.cursor()
    intern_sql = ("INSERT INTO intern_detail VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
    intern_data = (company,year,internType,period,jobType,salary,internContents,evaluation,impressions,developEx,internEx,internTestPreparation,isSelectionExemption,selectionExemptionContents,uid)
    cur.execute(intern_sql,intern_data)
    cur.commit()

    cur.close()

    return "OK"
