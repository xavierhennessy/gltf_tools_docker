#!/bin/bash

echo $GDRIVE_OBJECT
echo $GDRIVE_OBJECT_NAME
cd /root/downloader/
npm run start
cd ~
/usr/lib/sesi/sesinetd -l /dev/stdout -D -V 4 -z 0 -y 0 -m *.*.*.* -M *.*.*.* -p 1715 -W 1 -l /dev/stdout -u /dev/stdout -R /var/run/sesinetd.pid &
echo started
sleep 10
source /root/sourceHoudini.sh && hython /root/drive/bitstream_baker/bitstream_bake.py -i 69 -s /root/drive/files/$GDRIVE_OBJECT -t /root/drive/output/$GDRIVE_OBJECT_NAME /root/drive/bitstream_baker/bitstream_item_bake_pipeline.hiplc