from fastapi import FastAPI, Form
import sqlite3
from pydantic import BaseModel
from typing import Union
import cruds.input as input
import cruds.intern_get_list as intern_get_list
import cruds.intern_get_detail as intern_get_detail
import cruds.select_get_filed as select_get_filed
from dotenv import load_dotenv
import os
import pyodbc

# 環境変数の読み込み

load_dotenv()
# TODO .env内容をリストして入力（修正Lｖ.1)
env_list = []
env_list.append(os.getenv("SERVER"))
env_list.append(os.getenv("DATABASE"))
env_list.append(os.getenv("USERNAME_CUS"))
env_list.append(os.getenv("PASSWORD"))
env_list.append(os.getenv("DRIVER"))
print(os.getenv("SERVER"))
print(env_list)
app = FastAPI()


class Intern_info(BaseModel):
    company: str
    year: int
    intenrType: int
    period: int
    jobType: int
    salary: int
    internContents: str
    evaluation: int
    developEx: int
    internEx: int
    internTestPreparation: Union[str, None] = None
    isSelectionExemption: int
    selectionExemptionContents: Union[str, None] = None
    impressions: str


@app.get("/intern-info-list/{filter}")
def get_intern_list_filter(filter: str):
    info_list = {"data": intern_get_list.get_intern_info(env_list)}
    return info_list["data"][0]["id"]


@app.get("/intern-info-list-uid/{uid}")
def get_intern_list_filter(uid: int):
    info_list = {"data": intern_get_list.get_intern_info(env_list)}
    return info_list["data"][0]["id"]


@app.get("/intern-info/{id}")
def get_intern_list_id(id: int):
    intern_detail = {"data": intern_get_detail.get_intern_detail(id, env_list)}
    return intern_detail


@app.get("/search-status")
def get_search_status():
    search_data = {"data": select_get_filed.select_get_filed(env_list)}
    return search_data


@app.get("/input-select-filed")
def get_select_filed():
    out_put = {
        "data": {
            "year": {"id": 1, "text": "サマーインターン"},
            "internType": {"id": 1, "text": "サマーインターン"},
            "period": {"id": 1, "text": "2週間"},
            "jobType": {"id": 1, "text": "フロントエンジニア"},
            "developEx": {"id": 1, "text": "０回"},
            "internEx": {"id": 1, "text": "0回"},
        }
    }
    return out_put


@app.post("/intern-info")
def post_intern_info(intern_info: Intern_info):
    input.post_intern_info(
        env_list,
        Intern_info.company,
        Intern_info.year,
        Intern_info.intenrType,
        Intern_info.period,
        Intern_info.jobType,
        Intern_info.salary,
        Intern_info.internContents,
        Intern_info.evaluation,
        Intern_info.developEx,
        Intern_info.internEx,
        Intern_info.internTestPreparation,
        Intern_info.isSelectionExemption,
        Intern_info.selectionExemptionContents,
        Intern_info.impressions,
    )
    return intern_info


@app.get("/test")
def post_intern_info():
    print(env_list)
    input.post_intern_info(
        env_list,
        "株式会社ゲームフリーク",
        2,
        3,
        1,
        1,
        1600,
        "API設計を行った",
        3,
        3,
        2,
        "Atcorder",
        1,
        "1発内々定",
        "余裕う",
    )
    return "OK"
