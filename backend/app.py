from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "house_price_model.joblib")
model = joblib.load(MODEL_PATH)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    data: dict

@app.post("/predict")
def predict(input: InputData):
    df = pd.DataFrame([input.data])
    prediction = model.predict(df)[0]
    return {"prediction": float(prediction)}