#!/usr/bin/env hython

import sys, os, argparse

def usage(msg=''):
    print \
"""
Usage:

Bake bitstream lods:   hrender    [options] file.hip
e.g.            hrender -i 32 -s products/32_couch/fbx/ -t products/32_couch/bitstream/ bitstream_item_bake_pipeline.hiplc

options:        -i              Index - unique ID for temp files
                -t              Target Folder - where bitstream lod folders will be created
                -s              Source Folder - where FBX + textures can be found
"""
    error(msg)
    
def validate_args(args):
    # Does some light validation on the input and exits on error.

    hipfiles = []
    for f in args.file:
	if '.' in f and f.split('.')[-1] in ('hip', 'hipnc', 'hiplc'):
	    hipfiles.append(f)
    
    if not hipfiles:
	return 'Missing .hip motion file name.'
    if len(hipfiles) > 1:
	return 'Too many .hip motion file names: %s.' % (' '.join(hipfiles))
    if not os.path.isfile(hipfiles[0]):
	return 'Cannot find file %s.' % hipfiles[0]

    args.file = hipfiles[0]

    if not args.index:
        return 'Must specify -i index argument to create unique id for temp files.'
    if not isinstance(args.index, int):
        return '-i index argument must be an integer'
    
    if not args.source_folder:
        return '-s Argument must provide source folder location'
    if not os.path.isdir(args.source_folder):
        return 'Source folder provided with -s does not exist'
    if args.source_folder[-1] != '/' and args.source_folder[-1] != '\\':
        args.source_folder += '/'
        
    if not args.target_folder:
        return '-t Argument must provide target folder location'
    if not os.path.isdir(args.target_folder):
        return 'Target folder provided with -t does not exist'
    if args.target_folder[-1] != '/' and args.target_folder[-1] != '\\':
        args.target_folder += '/'
    
    return ''

def parse_args():
    """Parses the command line arguments, then validates them. If there are any
    validation errors, those are sent to usage() which terminates the process.
    """
    parser = argparse.ArgumentParser(add_help=False)

    # Option arguments
    parser.add_argument('-i', dest='index', type=int)
    parser.add_argument('-s', dest='source_folder')
    parser.add_argument('-t', dest='target_folder')

    # .hip|.hiplc|.hipnc file
    parser.add_argument('file', nargs='*')

    args, unknown = parser.parse_known_args()

    # Handle unknown arguments (show usage text and exit)
    if unknown:
	usage('Unknown argument(s): %s' % (' '.join(unknown)))

    # If there's something wrong with the arguments, show usage and exit.
    err = validate_args(args)
    if err:
	usage(err)

    return args

def error(msg, exit=True):
    if msg:
	sys.stderr.write('\n')
	sys.stderr.write('Error: %s\n' % msg)
	sys.stderr.write('*****')

    sys.stderr.write('\n')
    if exit:
	sys.exit(1)
    
def render(args):
    try:
        hou.hipFile.load(args.file)
    except hou.LoadWarning, e:
        print e

    in_node = hou.node("/obj/lod_generator/python2")
    out_node = hou.node("/obj/lod_generator/OUT")
    
    in_node.parm("asset_folder").set(args.source_folder)
    in_node.parm("output_folder").set(args.target_folder)
    in_node.parm("index").set(args.index)

    in_node.cook(force=True)
    # return "spanner in the works..."
    out_node.cook(force=True)
    #error here 
    
#--------------------------------------------------------
# Main application
#--------------------------------------------------------

args = sys.argv[1:]
if len(args) < 1 or args[0] == '-':
    usage()

args = parse_args()
render(args)