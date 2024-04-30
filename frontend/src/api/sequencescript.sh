#!/bin/bash
fullfile=$1
outputfilepath=$2

# echo "filename is: $fullfile"
# echo "extension is: $outputfilepath"

source $PWD/src/api/bbtools/bbmap/bbduk.sh in=$fullfile out=$outputfilepath ref=$PWD/src/api/bbtools/bbmap/resources/adapters.fa ktrim=r k=23 mink=11 hdist=1;

echo "PWD directory is: $PWD"