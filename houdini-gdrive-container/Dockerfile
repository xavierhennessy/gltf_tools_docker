#
# Ubuntu Dockerfile
#
# https://github.com/dockerfile/ubuntu
#
FROM alpine:latest AS downloader
COPY downloadHoudini.py /root/

RUN apk add --no-cache curl python3 \
  && if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi \
  && echo "**** install pip ****" \
  && python3 -m ensurepip \
  && rm -r /usr/lib/python*/ensurepip \
  && pip3 install --no-cache --upgrade pip setuptools wheel \
  && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi \
  && pip install requests \
  && chmod +x /root/downloadHoudini.py \
  && mkdir /root/houdini_download \
  && cd /root/houdini_download \
  && HOUDINIDOWNLOADURL=$(python /root/downloadHoudini.py) \
  && curl $HOUDINIDOWNLOADURL -o /root/houdini_download/houdini.tar.gz
FROM ubuntu:18.04 AS iterim
COPY --from=downloader /root/houdini_download/houdini.tar.gz /root/houdini.tar.gz
RUN mkdir /root/houdini_download \
  && tar xf /root/houdini.tar.gz -C /root/houdini_download --strip-components=1 \
  && apt-get update \
  && apt-get install -y bc strace \
  && /root/houdini_download/houdini.install --auto-install --accept-EULA  --install-license --no-install-engine-maya --no-install-engine-unity --no-install-menus --no-install-hfs-symlink
# # Pull base image.
FROM ubuntu:18.04
#sidefx_licence_server


# # Add files.
COPY --from=iterim /usr/lib/sesi/ /usr/lib/sesi
COPY --from=iterim /opt/hfs18.0.597/ /opt/hfs18.0.597/
RUN export PATH=/opt/hfs18.0.597/bin:$PATH
RUN apt-get update 
RUN apt-get install -y libglu1 libsm6 libxmu-dev libxi6 libgconf-2-4 libegl1-mesa rsync
COPY startHoudiniLicenseServer.sh /root/
COPY sourceHoudini.sh /root/

# #source houdinisetup.sh
# # Install.
# # build-essential software-properties-common git python3-pip python3-dev 
RUN chmod +x /root/startHoudiniLicenseServer.sh \
  && rm /usr/lib/sesi/licenses.disabled \
  && touch /usr/lib/sesi/licenses
RUN chmod +x /opt/hfs18.0.597/houdini_setup
COPY licenses /usr/lib/sesi/
RUN cp /opt/hfs18.0.597/bin/hython /root
# RUN /bin/bash -c "source /root/sourceHoudini.sh"

# set ENV vars with gdrive ids
# 

# Set environment variables.
ENV HOME /root
# RUN /root/startHoudiniLicenseServer.sh
# ENV PATH /root/hython
# Define working directory.


RUN mkdir -p /root/downloader/
WORKDIR /root/downloader/

#install node
RUN apt-get update \
&& apt-get -y install curl gnupg \
&& curl -sL https://deb.nodesource.com/setup_12.x  | bash - \
&& apt-get -y install nodejs\
&& npm install 

COPY  /downloadFileContainer .
RUN  npm install


EXPOSE 1715 4444 4040
WORKDIR /root/
COPY start.sh .
# Define default command.

ENTRYPOINT [ "bash", "start.sh"] 



#THING TO CHANGE IN DOCKERFILE 
#change workdir to destination folder /root/test...
#Make the hredner script available at $PATH i guess 
#that way can run hello_world.hiplc in destination 
#clean up
#figure out a motherfucking way to source houdini_setup in the dockerfile 
#still can't beleive this is like that 

#need to do inside container before running script 
#must source houdini_setup in /opt/hfs18.0wr8q85/
#must run hello_world in /opt/hfs18.wo485u2p/bin/
#set hrender.py to $PATH wont work?




#houdini file/helloworld.hilmodshflk

#found here https://github.com/astefanutti/decktape/issues/126
#and also this one is required for xcb ----> libegl1-mesa
#need to specify path for qt libs because some are mixed
#found at this location 
#/opt/hfs18.5.499/dsolib/Qt_plugins/platforms# ldd libqxcb.so
#https://stackoverflow.com/questions/28898787/how-to-handle-specific-hostname-like-h-option-in-dockerfile
#RUN echo $(grep $(hostname) /etc/hosts | cut -f1) DESKTOP-UM6IC4I >> /etc/hosts && install-software
#^^ this can be used to set the host name in the docker file 
#DESKTOP-UM6IC4I
#Doesn't want to work. Can the host name be set in npm docker api?
# eg Docker run -h DESKTOP-ksdjfbaldih?
# sesinetd running locally in seperate container 
# have it exosed on localhost:8080
# may need to use a docker compose to get the two containers playing nice 
# SERVER container -p 8080:1715 
# HOUDINI container listening to 8080? with hserver to get license 
# Use own network and set up both containers wiht docekr compose 
# how do they talk to eachother with docker compose?
# expose the same network on host? 
# 


# -p passed in gltf tools 
# check if image exists 
# build image 
# if image built dont build 
# open bash in terminal and do what must be done 
# get the output files from the container and onto the host 
# this will be done with shell.exec (what ever the fuck)
# should also look at creating volume when the container is build 
# we gonna use rsync to transfer files across from container to host 


# take gdrive pathname (URL?) 
# download contents of gdrive dir to local 
# local will be in volume for houdini container 
# gltf_tools will then find volume and feed houdini
# houdini works magic 
# output back into drive and also s3?