from fastapi import FastAPI

app = FastAPI()

@app.get("/")

def root():
    return {"statement" : "Hello World"}
