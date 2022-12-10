import os
import pyodbc
from dotenv import load_dotenv


def delete_intern_info(env_list: list, id: int):
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
    cur.execute("DELETE FROM intern_detail WHERE id = %d" % (id))

    cur.commit()
    return "OK"



