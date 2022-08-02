import django
import os
import sys
import time
import json
import requests

sys.path.append(os.path.abspath('../api'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO# Import models from sales_rest, here.
# from sales_rest.models import Something

def get_locations():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content['autos']:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            sold = automobile['sold'],

        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(30)


if __name__ == "__main__":
    poll()
