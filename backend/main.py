from fastapi import FastAPI,Form
import sqlite3

app = FastAPI()


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

@app.post("/user-info")
def post_intern_info(
    campany:str = Form(),
    year :int = Form(),
    internType : int = Form(),
    period : int = Form(),
    jobType : int = Form(),
    salary : int = Form(),
    internContens : str = Form(),
    evalication : int = Form(),
    developEx : int = Form(),
    internEx : int = Form(),
    internTestPreparation : str = Form(),
    isSelectionExemption : int = Form(),
    impressions : str = Form()
):
    return "OK"