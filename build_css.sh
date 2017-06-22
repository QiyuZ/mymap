#!/bin/bash
pushd css && for file in *.less; do lessc $file `basename $file | sed -e "s/less/css/"` ; done && popd
