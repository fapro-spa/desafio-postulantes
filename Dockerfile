FROM python:3.10.4

LABEL MAINTAINER = "andres.r.oyarce@gmail.com"
LABEL version="1.0.0"


USER root
RUN apt-get update \ 
&& apt-get install -y --no-install-recommends ca-certificates curl firefox-esr \ 
&& rm -fr /var/lib/apt/lists/*                \
&& curl -L https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz | tar xz -C /usr/local/bin \
&& apt-get purge -y ca-certificates curl

WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

RUN mkdir resultado
RUN chmod 755 resultado

COPY ["main.py", ".env", "./"]

