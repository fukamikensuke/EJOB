import os
import pyodbc
from dotenv import load_dotenv


def get_intern_info(env_list: list):
    # TODO cnxn 自体が引数にできそう（修正Lｖ.1)
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
    cur.execute("SELECT * FROM intern_detail")
    output_data = []
    for row in cur:
        print(row[0], row[1])
        output_data.append(
            {
                "id": row[0],
                "companyName": row[1],
                "evaluation": row[8],
                "year": row[2],
                "internType": row[3],
                "period": row[4],
                "job": row[5],
                "salary": row[6],
            }
        )
    # TODO ここ index じゃなくて、カラム名とかからデータとれないのだろうか！？(取れそう)
    cur.commit()
    return output_data
