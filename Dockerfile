FROM python:3.10.4

LABEL MAINTAINER = "andres.r.oyarce@gmail.com"
LABEL version="1.0.0"

WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

COPY ["main.py", ".env", "./"]
RUN python main.py
