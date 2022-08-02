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
        print(automobile)
        AutomobileVO.objects.update_or_create(
            id = automobile['id'],
            vin = automobile["vin"],

        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
