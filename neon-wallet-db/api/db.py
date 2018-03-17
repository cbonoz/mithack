from pymongo import MongoClient
import os
import redis
from rq import Queue

MONGOUSER = os.environ.get('MONGOUSER')
MONGOPASS = os.environ.get('MONGOPASS')
MONGOURL = os.environ.get('MONGOURL')
MONGOAPP = os.environ.get('MONGOAPP')
# MONGOURL = "mongodb://{}:{}@{}/{}".format(MONGOUSER, MONGOPASS, MONGOURL, MONGOAPP)
MONGOURL = "mongodb://{}/{}".format(MONGOURL, MONGOAPP)

client = MongoClient(MONGOURL, connect=False)
db = client[MONGOAPP]

# redis

redis_url = os.environ.get('REDISTOGO_URL')

redis_db = redis.from_url(redis_url)

# redis_db.flushdb()

q = Queue(connection=redis_db)

transaction_db = db['transactions']
blockchain_db = db['blockchain']
meta_db = db['meta']
logs_db = db['logs']
address_db = db['addresses']
