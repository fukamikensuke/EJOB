# FIXME: 使用していない import を削除
import os
import pyodbc
from dotenv import load_dotenv


def delete_intern_info(env_list: list, id: int):
    # FIXME: cnxn 自体を引数にして良さそう
    # env_list を引数とした場合、毎度引数をもらった先で cnxn を定義する必要があるため
    # env_list が共通である限り cnxn は共通であるはず
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
