import argparse
import json
import generator.db

from config import JSON_FILE, SQL_FILE
from generator import Generator
from generator.db import del_db, update_or_create_activity, Activity,select_load_logs


def run_strava_sync(client_id, client_secret, refresh_token):
    generator = Generator(SQL_FILE)
    generator.set_strava_config(client_id, client_secret, refresh_token)
    # if you want to refresh data change False to True
    generator.sync(True)

    activities_list = generator.load()

    print("---------")
    print(activities_list)

    with open(JSON_FILE, "w") as f:
        json.dump(activities_list, f)

# 上传gpx到strava
def test_upload(client_id, client_secret, refresh_token):
    generator = Generator(SQL_FILE)
    generator.set_strava_config(client_id, client_secret, refresh_token)
    generator.upload_activitys()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("client_id", help="strava client id")
    parser.add_argument("client_secret", help="strava client secret")
    parser.add_argument("refresh_token", help="strava refresh token")
    options = parser.parse_args()
    # del_db(SQL_FILE)

    select_load_logs(SQL_FILE)



    # run_strava_sync(options.client_id, options.client_secret, options.refresh_token)

    # test_upload(options.client_id, options.client_secret, options.refresh_token)
