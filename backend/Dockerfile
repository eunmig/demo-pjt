FROM python:3.12-slim

WORKDIR /app

# 의존성 파일 복사
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# 포트 설정
EXPOSE 8000

ENTRYPOINT [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]