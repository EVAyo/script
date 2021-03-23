#!/usr/bin/env bash

## 路径
dir_shell=$(dirname $(readlink -f "$0"))
dir_root=$dir_shell

## 导入通用变量与函数
. $dir_shell/jshare.sh
detect_termux
detect_macos
link_shell
