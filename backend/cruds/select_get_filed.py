# FIXME: 不要な import の削除
import os
import pyodbc
from dotenv import load_dotenv

# FIXME: 不要であれば削除, 今後の使う予定があればその旨のコメントが欲しい
#    "data": {
#         "year": {"id": 1, "text": "サマーインターン"},
#         "internType": {"id": 1, "text": "サマーインターン"},
#         "period": {"id": 1, "text": "2週間"},
#         "jobType": {"id": 1, "text": "フロントエンジニア"},
#         "developEx": {"id": 1, "text": "０回"},
#         "internEx": {"id": 1, "text": "0回"},
#     }


def select_get_filed(env_list: list):
    # FIXME: cnxn 自体を引数にして良さそう (delete.py と同様)
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
    cur = cnxn.cursor()
    cur.execute("SELECT * FROM period ")
    period_data = []
    for row in cur:
        period_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM season ")
    season_data = []
    for row in cur:
        season_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM job_type ")
    job_data = []
    for row in cur:
        job_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM evaluation ")
    evaluation_data = []
    for row in cur:
        evaluation_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM year ")
    year_data = []
    for row in cur:
        year_data.append({"id": row[0], "text": row[1]})

    output_data = [
        {"displayName": "評価", "tableName": "evaluation", "data": evaluation_data},
        {"displayName": "期間", "tableName": "period", "data": period_data},
        {"displayName": "職種", "tableName": "job_type", "data": job_data},
    ]
    cur.commit()
    return output_data
