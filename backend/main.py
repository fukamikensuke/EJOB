from fastapi import FastAPI,Form
import sqlite3
from pydantic import BaseModel
from typing import Union
import cruds.input as input
from dotenv import load_dotenv
import os
import pyodbc
from dotenv import load_dotenv
# 環境変数の読み込み

load_dotenv()
## .env内容をリストして入力（修正Lｖ.1)
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
    internTestPreparation: str
    isSelectionExemption: int
    selectionExemptionContents: str
    impressions: str

@app.get("/intern-info-list/{filter}")
def get_intern_list_filter(filter :str):
    out_put = {"data" :{1:{"companyName":1,"evaluation":1,"year":1,"internType":2,"period":2,"job":1,"salraly":1500}}}
    return out_put

@app.get("/intern-info-list/{uid}")
def get_intern_list_id(uid :int):
    out_put = {"data" :{1:{"companyName":1,"evaluation":1,"year":1,"internType":2,"period":2,"job":1,"salraly":1500}}}
    return out_put

@app.get("/search-status")
def get_intern_list():
    out_put = {"data" :{"internType":{"id":1,"text":"サマーインターン"},"period":{"id":1,"text":"2週間"},"jobType":{"id":1,"text":"フロントエンジニア"}}}
    return out_put

@app.get("/input-select-filed")
def get_select_filed():
    out_put = {"data" :{"year":{"id":1,"text":"サマーインターン"},"internType":{"id":1,"text":"サマーインターン"},"period":{"id":1,"text":"2週間"},"jobType":{"id":1,"text":"フロントエンジニア"},"developEx":{"id":1,"text":"０回"},"internEx":{"id":1,"text":"0回"}}}
    return out_put

@app.post("/intern-info")
def post_intern_info(intern_info:Intern_info):
    input.post_intern_info(env_list,Intern_info.company,Intern_info.year,Intern_info.intenrType,Intern_info.period,Intern_info.jobType,Intern_info.salary,Intern_info.internContents,Intern_info.evaluation,Intern_info.developEx,Intern_info.internEx,Intern_info.internTestPreparation,Intern_info.isSelectionExemption,Intern_info.selectionExemptionContents,Intern_info.impressions)
    return intern_info

@app.get("/test")
def post_intern_info():
    print(env_list)
    input.post_intern_info(env_list,"LINE",2,3,1,1,1600,"API設計を行った",3,3,2,"Atcorder",1,"1発内々定","楽しかった")
    return "OK"
