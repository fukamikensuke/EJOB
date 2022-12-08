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
    _cur = cnxn.cursor()
    cur.execute("SELECT * FROM intern_detail")
    output_data = []
    for row in cur:
        print(row)
        # _cur.execute("SELECT text FROM year WHERE id = %d" % row[2])
        # (year_data,) = _cur.fetchone()
        # _cur.execute("SELECT job_name FROM job_type WHERE id = %d" % row[5])
        # (job_data,) = _cur.fetchone()
        # _cur.execute("SELECT season_name FROM season WHERE id = %d" % row[3])
        # (season_data,) = _cur.fetchone()
        # _cur.execute("SELECT period_text FROM period WHERE id = %d" % row[4])
        # (period_data,) = _cur.fetchone()
        _cur.execute("SELECT text FROM evaluation WHERE id = %d" % row[8])
        (evaluation_data,) = _cur.fetchone()
        output_data.append(
            {
                "id": row[0],
                "companyName": row[1],
                "evaluation": evaluation_data,
                "year": row[2],  # year_data,
                "internType": row[3],  # season_data,
                "period": row[4],  # period_data,
                "job": row[5],  # job_data,
                "salary": row[6],
            }
        )
    # TODO ここ index じゃなくて、カラム名とかからデータとれないのだろうか！？(取れそう)
    cur.commit()
    _cur.commit()
    cnxn.close()
    return output_data
