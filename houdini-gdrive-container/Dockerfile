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

# build-essential software-properties-common git python3-pip python3-dev 
RUN chmod +x /root/startHoudiniLicenseServer.sh \
  && rm /usr/lib/sesi/licenses.disabled \
  && touch /usr/lib/sesi/licenses
RUN chmod +x /opt/hfs18.0.597/houdini_setup
COPY licenses /usr/lib/sesi/
RUN cp /opt/hfs18.0.597/bin/hython /root
# RUN /bin/bash -c "source /root/sourceHoudini.sh"

#install node
RUN apt-get update \
&& apt-get -y install curl gnupg \
&& curl -sL https://deb.nodesource.com/setup_12.x  | bash - \
&& apt-get -y install nodejs\
&& npm install 

# Set environment variables.
ENV HOME /root
ENV HOSTNAME DESKTOP-UM6IC4I


WORKDIR /root/

RUN mkdir /root/bake/

COPY /consumer .
RUN npm install

EXPOSE 1715 4444 4040 1714

#--storage-opts dm.basesize=20G

COPY /bake/bitstream_baker/ ./bake/bitstream_baker/
# COPY /files ./bake/files/
# COPY /output ./bake/output/



ENTRYPOINT [ "bash", "/root/startConsumer.sh"] 

