#!/bin/bash
#sequencescript-practice01-trythis
fullfile=$1
outputfilepath=$2

# filename=$(basename -- "$fullfile")
# extension="${filename##*.}"
# filename="${filename%.*}"
# echo "filename is: $filename"
# echo "extension is: $extension"
# echo "HOME directory is: $HOME"
echo "PWD directory is: $PWD"


# bbduk.sh in=$1 out=int01/{$1}_trim.{$outputext} ref=resources/adapters.fa ktrim=r k=23 mink=11 hdist=1;
source $PWD/src/api/bbtools/bbmap/bbduk.sh in=$fullfile out=$outputfilepath ref=$PWD/src/api/bbtools/bbmap/resources/adapters.fa ktrim=r k=23 mink=11 hdist=1;

#dpendent files/dirs
# seal.sh ---
# adapters.fa ---
# bbduk.sh ---
# calcmem.sh ---
# bbduk.sh ---
# current/jgi.BBDuk
# 