import os
import pyodbc
from dotenv import load_dotenv


def get_intern_detail(id: int, env_list: list):
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
    cur.execute("SELECT * FROM intern_detail WHERE id = %d" % id)

    for row in cur:

        print(row[2])
        _cur.execute("SELECT text FROM year WHERE id = %d" % row[2])
        
        (year_data,) = _cur.fetchone()
        _cur.execute("SELECT job_name FROM job_type WHERE id = %d" % row[5])
        (job_data,) = _cur.fetchone()
        _cur.execute("SELECT season_name FROM season WHERE id = %d" % row[3])
        (season_data,) = _cur.fetchone()
        _cur.execute("SELECT period_text FROM period WHERE id = %d" % row[4])
        (period_data,) = _cur.fetchone()
        _cur.execute("SELECT text FROM evaluation WHERE id = %d" % row[8])
        (evaluation_data,) = _cur.fetchone()
        _cur.execute("SELECT text FROM develop_ex WHERE id = %d" % row[10])
        (develop_data,) = _cur.fetchone()
        _cur.execute("SELECT text FROM intern_ex WHERE id = %d" % row[11])
        (intern_data,) = _cur.fetchone()
        (year_data)
        if row[13] == 0:
            selection_ex = "有"
        elif row[13] == 1:
            selection_ex = "無"
        else :
            selection_ex = "" 
        output_data = {
            "companyName": row[1],
            "year": year_data,
            "internType": season_data,
            "period": period_data,
            "job": job_data,
            "salary": str(row[6]) + "円",
            "internContents": row[7],
            "evaluation": evaluation_data,
            "developEx": develop_data,
            "internEx": intern_data,
            "internTestPreparation": row[12],
            "isSelectionExemption": selection_ex,
            "selectionExemptionContents": row[14],
            "impressions": row[9],
        }
    cur.commit()
    _cur.commit()
    cnxn.close()
    return output_data
