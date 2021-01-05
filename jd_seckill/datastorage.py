#!/usr/bin/env python
# -*- encoding=utf8 -*-

import pickle
from pathlib import Path

from datetime import datetime

from .jd_logger import logger
from .config import global_config

class DataStorage(object):
    def __init__(self):
        self.DATA_FILENAME = 'datastorage.bin'
        self.is_reserve = "0"
        if Path(self.DATA_FILENAME).is_file():
            with open(self.DATA_FILENAME, 'rb') as f:
                self.is_reserve = pickle.load(f)
        else:
            with open(self.DATA_FILENAME, 'wb+') as f:
                pickle.dump(self.is_reserve, f)
            
    def is_reserve_get(self):
        with open(self.DATA_FILENAME, 'rb') as f:
            self.is_reserve = pickle.load(f)
        return self.is_reserve
    
    def is_reserve_set(self, is_reserve = "1"):
        with open(self.DATA_FILENAME, 'wb+') as f:
            pickle.dump(is_reserve, f)