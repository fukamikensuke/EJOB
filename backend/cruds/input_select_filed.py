import pyodbc


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

    cur.execute("SELECT * FROM year ")
    year_data = []
    for row in cur:
        year_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM develop_ex ")
    develop_ex_data = []
    for row in cur:
        develop_ex_data.append({"id": row[0], "text": row[1]})

    cur.execute("SELECT * FROM intern_ex ")
    intern_ex_data = []
    for row in cur:
        intern_ex_data.append({"id": row[0], "text": row[1]})
    output_data = {
        "year": year_data,
        "internType": season_data,
        "period": period_data,
        "jobType": job_data,
        "developEx": develop_ex_data,
        "internEx": intern_ex_data,
    }

    cur.commit()
    return output_data
