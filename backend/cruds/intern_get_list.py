import pyodbc


def get_intern_info(env_list: list, filter_dict: dict):
    # FIXME: cnxn 自体を引数にして良さそう (delete.py と同様)
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
    where_str = None
    for n in filter_dict:
        if filter_dict[n]:
            if not where_str:
                if n == "salary":
                    where_str = "WHERE " + n + " >= %d " % filter_dict[n]
                else:
                    where_str = "WHERE " + n + " = %d " % filter_dict[n]

            else:
                if n == "salary":
                    where_str = where_str + "AND " + n + " >= %d " % filter_dict[n]
                else:
                    where_str = where_str + " AND " + n + " = %d " % filter_dict[n]

    cur.execute("SELECT * FROM intern_detail %s" % where_str)
    output_data = []
    rows = cur.fetchall()
    for row in rows:
        print(row)
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
        output_data.append(
            {
                "id": row[0],
                "companyName": row[1],
                "evaluation": evaluation_data,
                "year": year_data,
                "internType": season_data,
                "period": period_data,
                "job": job_data,
                "salary": row[6],
            }
        )
    cur.commit()
    _cur.commit()
    cnxn.close()
    return output_data


def get_intern_info_uid(env_list: list, uid: str):
    # FIXME: cnxn 自体を引数にして良さそう (delete.py と同様)
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
    cur.execute("SELECT * FROM intern_detail WHERE user_id = '%s'" % uid)
    output_data = []
    rows = cur.fetchall()
    for row in rows:
        print(row)
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
        output_data.append(
            {
                "id": row[0],
                "companyName": row[1],
                "evaluation": evaluation_data,
                "year": year_data,
                "internType": season_data,
                "period": period_data,
                "job": job_data,
                "salary": row[6],
            }
        )
    cur.commit()
    _cur.commit()
    cnxn.close()
    return output_data
