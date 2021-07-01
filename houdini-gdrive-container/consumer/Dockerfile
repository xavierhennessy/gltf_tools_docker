FROM ubuntu:18.04

WORKDIR /usr/src/app

#install node
RUN apt-get update \
&& apt-get -y install curl gnupg \
&& curl -sL https://deb.nodesource.com/setup_12.x  | bash - \
&& apt-get -y install nodejs\
&& npm install 

COPY . .

# COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update -qq && apt-get install -qqy \
    apt-transport-https \
    ca-certificates \
    curl \
    lxc \
    iptables
    
# Install Docker from Docker Inc. repositories.
RUN curl -sSL https://get.docker.com/ | sh 

# RUN docker pull xavierhennessy/houdini-gdrive:latest

EXPOSE 9999

CMD [ "bash", "start.sh"]