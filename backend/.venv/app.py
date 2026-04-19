from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

from pathrekom_final_model import PathRekomModel

app = FastAPI(title="PathRekom API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = PathRekomModel(csv_folder="csv")


class PredictRequest(BaseModel):
    sex: str
    grades: Dict[str, str]


@app.get("/")
def root():
    return {"message": "PathRekom backend is running"}


@app.post("/predict")
def predict(data: PredictRequest):
    sex = data.sex.strip().lower()

    print("\n========== FRONTEND INPUT ==========")
    print("SEX:", sex)

    print("\nGRADES:")
    for k, v in data.grades.items():
        print(f"{k}: {v}")

    if sex not in ["m", "f"]:
        raise HTTPException(status_code=400, detail="Sex must be male or female.")

    if not data.grades:
        raise HTTPException(status_code=400, detail="Grades are required.")

    try:
        result = model.predict(sex=sex, grades=data.grades)

        print("\n========== MODEL OUTPUT ==========")
        for item in result["categories"]:
            print(f"{item['rank']}. {item['category']} - {item['match']}")

        print("=================================\n")

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    model = PathRekomModel(csv_folder="csv")

    s16 = model.students[
        model.students["student_id"].astype(str).str.strip() == "S16"
    ]

    print("\n========== S16 CSV DATA ==========")

    if not s16.empty:
        row = s16.iloc[0]

        print("SEX:", row["sex"])
        print("\nGRADES:")

        for col in model.students.columns:
            if col not in ["student_id", "sex"]:
                print(f"{col}: {row[col]}")

    else:
        print("S16 not found!")

    print("=================================\n")

    result = model.predict_from_student_id("S16")

    print("\nTop Categories:\n")
    for item in result["categories"]:
        print(f"{item['rank']}. {item['category']} - {item['match']}")