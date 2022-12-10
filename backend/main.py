from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
import cruds.input as input
import cruds.intern_get_list as intern_get_list
import cruds.intern_get_detail as intern_get_detail
import cruds.select_get_filed as select_get_filed
import cruds.input_select_filed as input_select_field
import cruds.delete as delete
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# 環境変数の読み込み

load_dotenv()
# TODO .env内容をリストして入力（修正Lｖ.1)
env_list = []
env_list.append(os.getenv("SERVER"))
env_list.append(os.getenv("DATABASE"))
env_list.append(os.getenv("USERNAME_CUS"))
env_list.append(os.getenv("PASSWORD"))
env_list.append(os.getenv("DRIVER"))

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.get("/intern-info-list/")
def get_intern_list_filter(
    evaluation: Union[int, None] = None,
    jobType: Union[int, None] = None,
    internType: Union[int, None] = None,
    period: Union[int, None] = None,
    salary: Union[int, None] = None,
):

    filter_dict = {
        "evaluation": evaluation,
        "jobType": jobType,
        "internType": internType,
        "period": period,
        "salary": salary,
    }
    info_list = {"data": intern_get_list.get_intern_info(env_list, filter_dict)}
    return info_list


@app.get("/intern-info-list-uid/{uid}")
def get_intern_list_uid(uid: int):
    info_list = {"data": intern_get_list.get_intern_info_uid(env_list, uid)}
    return info_list


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
    select_filed = {"data": input_select_field.select_get_filed(env_list)}
    return select_filed


@app.delete("/intern-info/delete/{intern_id}")
def get_intern_list_id(intern_id: int):
    delete.delete_intern_info(env_list, intern_id)
    return {200: "OK"}


@app.post("/intern-info")
def post_intern_info(intern_info: Intern_info):
    print(Intern_info)
    input.post_intern_info(
        env_list,
        intern_info.company,
        intern_info.year,
        intern_info.intenrType,
        intern_info.period,
        intern_info.jobType,
        intern_info.salary,
        intern_info.internContents,
        intern_info.evaluation,
        intern_info.developEx,
        intern_info.internEx,
        intern_info.internTestPreparation,
        intern_info.isSelectionExemption,
        intern_info.selectionExemptionContents,
        intern_info.impressions,
    )
    return intern_info


@app.get("/test")
def post_intern_info():  # testcode
    print(env_list)
    input.post_intern_info(
        env_list,
        "株式会社バックエンド開発しかかたん",
        2,  # year ~4
        3,  # internType ~4
        6,  # period ~ 10
        5,  # jobType ~11
        1500,
        "バックエンド開発をおこなった",
        5,  # 評価
        3,
        2,
        "Atcorder",
        1,
        "1発内々定",
        "余裕う",
    )
    return "OK"
