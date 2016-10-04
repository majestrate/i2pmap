from . import app as flask_app
import flask
from . import netdb
import os
import fnmatch
import json

app = flask_app.app

netdbdir = os.path.join(os.environ["HOME"], '.i2pd', 'netDb')

def stream_netdb_folder(fpath):
    for root, dirs, files in os.walk(fpath):
        for f in files:
            fname = os.path.join(root, f)
            e = netdb.Entry(fname)
            d = e.dict()
            yield json.dumps(d)
            yield ','

def stream_netdb(dirname=netdbdir):
    yield '['
    for root, dirnames, filenames in os.walk(dirname):
        for d in dirnames:
            yield from stream_netdb_folder(os.path.join(root, d))
    yield ' null]'

@app.route('/api/netdb.json')
def getnetdb():
    return flask.Response(flask.stream_with_context(stream_netdb()), mimetype="text/json")

@app.route('/')
def index():
    filename = flask.safe_join(app.static_folder, 'index.html')
    with open(filename) as fd:
        return fd.read()
