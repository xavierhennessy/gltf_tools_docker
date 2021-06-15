#!/bin/bash

cd /usr/src/app
npm run start
cd ~
/usr/lib/sesi/sesinetd -l /dev/stdout -D -V 4 -z 0 -y 0 -m *.*.*.* -M *.*.*.* -p 1715 -W 1 -l /dev/stdout -u /dev/stdout -R /var/run/sesinetd.pid
echo started