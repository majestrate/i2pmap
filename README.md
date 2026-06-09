# i2p netdb viewer


web based i2p netdb viewer


legacy setup:

```bash
# https://mailfud.org/geoip-legacy/
wget https://mailfud.org/geoip-legacy/GeoIPCity.dat.gz
sudo mkdir -p /usr/share/GeoIP
gzip -d GeoIPCity.dat.gz
sudo mv GeoIPCity.dat /usr/share/GeoIP/
sudo chmod a+r -R /usr/share/GeoIP/

sudo apt install python3-venv
python3 -m venv v
v/bin/pip install -r requirements.txt
v/bin/gunicorn i2pmap:app
```
