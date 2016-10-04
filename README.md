# i2p netdb viewer


web based i2p netdb viewer


setup:

    sudo apt install geoip-database-contrib

    pyvenv v
    v/bin/pip install -r requirements.txt
    v/bin/gunicorn i2pmap:app

