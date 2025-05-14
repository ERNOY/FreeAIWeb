from fastapi import APIRouter, UploadFile, File, Form
from pathlib import Path
import shutil
import uuid

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), license: str = Form(...)):
    ext = file.filename.split(".")[-1]
    safe_name = f"{uuid.uuid4().hex}_{license}.{ext}"
    dest_path = UPLOAD_DIR / safe_name

    with dest_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": f"'{file.filename}' mentve '{safe_name}' néven a '{license}' licenccel."}
