import os
import yaml

GET_DIR = "activities"
OUTPUT_DIR = "activities"
GPX_FOLDER = os.path.join(os.getcwd(), "GPX_OUT")
GPX_TO_STRAVA_FOLDER = os.path.join(os.getcwd(), "GPX_TO_STRAVA")
SQL_FILE = "scripts/data.db"
JSON_FILE = "src/static/activities.json"

try:
    with open("config.yaml") as f:
        _config = yaml.safe_load(f)
except:
    _config = {}


def config(*keys):
    def safeget(dct, *keys):
        for key in keys:
            try:
                dct = dct[key]
            except KeyError:
                return None
        return dct

    return safeget(_config, *keys)
