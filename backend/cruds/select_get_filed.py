import os
import pyodbc
from dotenv import load_dotenv

#    "data": {
#         "year": {"id": 1, "text": "サマーインターン"},
#         "internType": {"id": 1, "text": "サマーインターン"},
#         "period": {"id": 1, "text": "2週間"},
#         "jobType": {"id": 1, "text": "フロントエンジニア"},
#         "developEx": {"id": 1, "text": "０回"},
#         "internEx": {"id": 1, "text": "0回"},
#     }


def select_get_filed(env_list: list):
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
    cur.execute("SELECT * FROM intern_detail WHERE id = %d" % id)
    for row in cur:
        output_data = {
            "companyName": row[1],
            "year": row[2],
            "internType": row[3],
            "period": row[4],
            "job": row[5],
            "salary": row[6],
            "internContents": row[7],
            "evaluation": row[8],
            "developEx": row[10],
            "internEx": row[11],
            "internTestPreparation": row[12],
            "isSelectionExemption": row[13],
            "selectionExemptionContents": row[14],
            "impressions": row[9],
        }
    cur.commit()
    return output_data
