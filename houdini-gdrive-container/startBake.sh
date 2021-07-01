#!/bin/bash

sleep 1 
echo startBake started
sleep 3
echo you got me 

# echo $GDRIVE_OBJECT
# echo $GDRIVE_OBJECT_NAME
# cd /root/downloader/
# npm run start
# cd ~
# /usr/lib/sesi/sesinetd -l /dev/stdout -D -V 4 -z 0 -y 0 -m *.*.*.* -M *.*.*.* -p 1715 -W 1 -l /dev/stdout -u /dev/stdout -R /var/run/sesinetd.pid &
# echo sesi started
# sleep 10
# source /root/sourceHoudini.sh && hython /root/bitstream_baker/bitstream_bake.py -i 2 -s /root/downloader/files/$GDRIVE_OBJECT_NAME/ -t /root/downloader/output/$GDRIVE_OBJECT_NAME/ /root/bitstream_baker/bitstream_item_bake_pipeline.hiplc