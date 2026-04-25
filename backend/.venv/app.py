from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

from pathrekom_final_model import PathRekomModel

app = FastAPI(title="PathRekom API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = PathRekomModel(csv_folder="csv")


class PredictRequest(BaseModel):
    grades: Dict[str, str]


@app.get("/")
def root():
    return {"message": "PathRekom backend is running"}


@app.post("/predict")
def predict(data: PredictRequest):
    print("\n========== FRONTEND INPUT ==========")

    print("\nGRADES:")
    for k, v in data.grades.items():
        print(f"{k}: {v}")

    if not data.grades:
        raise HTTPException(status_code=400, detail="Grades are required.")

    try:
        result = model.predict(grades=data.grades, top_n=5)

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

    s1 = model.students[
        model.students["student_id"].astype(str).str.strip() == "S1"
    ]

    print("\n========== S16 CSV DATA ==========")

    if not s1.empty:
        row = s1.iloc[0]

        print("\nGRADES:")
        for col in model.students.columns:
            if col not in ["student_id", "sex"]:
                print(f"{col}: {row[col]}")
    else:
        print("S11 not found!")

    print("=================================\n")

    result = model.predict_from_student_id("S1")

    print("\nTop Categories:\n")
    for item in result["categories"]:
        print(f"{item['rank']}. {item['category']} - {item['match']}")