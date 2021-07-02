#!/bin/bash

sleep 1
echo "OBJECT ===> " + $GDRIVE_OBJECT
echo "NAME ===> " + $GDRIVE_OBJECT_NAME


# /usr/lib/sesi/sesinetd -l /dev/stdout -D -V 4 -z 0 -y 0 -m *.*.*.* -M *.*.*.* -p 1715 -W 1 -l /dev/stdout -u /dev/stdout -R /var/run/sesinetd.pid &
# echo "sesi started"
sleep 2
source /root/sourceHoudini.sh && hython /root/bitstream_baker/bitstream_bake.py -i 2 -s /root/files/$GDRIVE_OBJECT_NAME/ -t /root/output/$GDRIVE_OBJECT_NAME/ /root/bitstream_baker/bitstream_item_bake_pipeline.hiplc
# echo "baking lod....."
sleep 2
echo "yeah it didnt work" 