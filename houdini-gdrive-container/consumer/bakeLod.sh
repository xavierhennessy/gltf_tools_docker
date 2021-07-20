#!/bin/bash

# echo $ITEMNAME

source /root/sourceHoudini.sh
/opt/hfs18.0.597/bin/hython /root/bake/bitstream_baker/bitstream_bake.py -i 2 -s /root/bake/files/01/ -t /root/bake/output/01/ /root/bake/bitstream_baker/bitstream_item_bake_pipeline.hiplc
