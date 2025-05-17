def get_device_inventory(ip_address, user_name, password, filter_by, field, inventory_type):
    """ Get inventory details for a device based on filters """
    filter_map = {'Name': 'DeviceName',
                  'Id': 'Id',
                  'SvcTag': 'DeviceServiceTag'}
    inventory_types = {
        "cpus": "serverProcessors",
        "os": "serverOperatingSystems",
        "disks": "serverArrayDisks",
        "controllers": "serverRaidControllers",
        "memory": "serverMemoryDevices"}

    try:

        session_url = 'https://%s/api/SessionService/Sessions' % ip_address
        base_url = "https://%s/api/DeviceService/Devices?$filter=%s eq" % (ip_address, filter_map[filter_by])
        if filter_by == 'Id':
            device_url = "%s %s" % (base_url, field)
        else:
            device_url = "%s '%s'" % (base_url, field)
        headers = {'content-type': 'application/json'}

        user_details = {'UserName': user_name,
                        'Password': password,
                        'SessionType': 'API'}
        session_info = requests.post(session_url, verify=False,
                                     data=json.dumps(user_details),
                                     headers=headers)
        if session_info.status_code == 201:
            headers['X-Auth-Token'] = session_info.headers['X-Auth-Token']
            response = requests.get(device_url, headers=headers, verify=False)
            if response.status_code == 200:
                json_data = response.json()
                if json_data['@odata.count'] > 1:
                    print("WARNING: Filter returned more than one result. Ignore all results except the first.")
                if json_data['@odata.count'] > 0:
                    device_id = json_data['value'][0]['Id']
                    inventory_url = "https://%s/api/DeviceService/Devices(%s)/InventoryDetails" % (
                        ip_address, device_id)
                    if inventory_type:
                        inventory_url = "https://%s/api/DeviceService/Devices(%s)/InventoryDetails(\'%s\')" % \
                                        (ip_address, device_id, inventory_types[inventory_type])
                    inven_resp = requests.get(inventory_url, headers=headers,
                                              verify=False)
                    if inven_resp.status_code == 200:
                        print("\n*** Inventory for device (%s) ***" % field)
                        print(json.dumps(inven_resp.json(), indent=4,
                                         sort_keys=True))
                    elif inven_resp.status_code == 400:
                        print("Inventory type %s not applicable for device with Id %s" % (inventory_type, device_id))
                    else:
                        print("Unable to retrieve inventory for device %s due to status code %s" %
                              (device_id, inven_resp.status_code))
                else:
                    print("Unable to retrieve details for device (%s) from %s" % (field, ip_address))
            else:
                print("No device data retrieved from %s" % ip_address)
        else:
            print("Unable to create a session with appliance %s" % ip_address)
    except Exception as error:
        print("Unexpected error:", str(error))