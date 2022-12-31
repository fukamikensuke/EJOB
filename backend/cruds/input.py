# FIXME: 不要な import の削除
import os
import pyodbc
from dotenv import load_dotenv

# FIXME: 不要なコメントであれば削除
# 環境変数の読み込み


# FIXME: cnxn 自体を引数にして良さそう (delete.py と同様)
def post_intern_info(
    env_list: list,
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
    uid: str,
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
    # FIXME: おそらく作業用のコメントは不要であれば消す, 消したくないのであればその旨のコメントを残す
    print("OK")
    cur = cnxn.cursor()
    intern_sql = "INSERT INTO intern_detail VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    intern_data = (
        company,
        year,
        internType,
        period,
        jobType,
        salary,
        internContents,
        evaluation,
        impressions,
        developEx,
        internEx,
        internTestPreparation,
        isSelectionExemption,
        selectionExemptionContents,
        uid,
    )
    cur.execute(intern_sql, intern_data)
    cur.commit()

    cur.close()

    return "OK"
