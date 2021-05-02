#!/usr/bin/env bash

while :; do
    if [[ $(cat $JD_DIR/config/crontab.list) != $(crontab -l) ]]; then
        crontab $JD_DIR/config/crontab.list
    fi
    sleep 1
done