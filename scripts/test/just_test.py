import datetime
import time
from generator import Generator
from config import GPX_FOLDER, JSON_FILE, SQL_FILE, GPX_TO_STRAVA_FOLDER

if __name__ == "__main__":
    load_time = datetime.datetime.now().time()

    print(load_time)

    now_time = time.time()

    print(int(now_time))

    generator = Generator("/Users/meng/Documents/GitHub/sport-map/" + SQL_FILE)
    print("7777")
    load_track_ids = generator.get_old_tracks_ids()
    print("8888")
    print(load_track_ids)
