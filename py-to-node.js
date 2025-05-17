const axios = require('axios');
const https = require('https');

async function getDeviceInventory(ipAddress, userName, password, filterBy, field, inventoryType) {
    const filterMap = {
        'Name': 'DeviceName',
        'Id': 'Id',
        'SvcTag': 'DeviceServiceTag'
    };

    const inventoryTypes = {
        cpus: "serverProcessors",
        os: "serverOperatingSystems",
        disks: "serverArrayDisks",
        controllers: "serverRaidControllers",
        memory: "serverMemoryDevices"
    };

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });

    const sessionUrl = `https://${ipAddress}/api/SessionService/Sessions`;
    const baseUrl = `https://${ipAddress}/api/DeviceService/Devices?$filter=${filterMap[filterBy]} eq`;
    const deviceUrl = filterBy === 'Id' ? `${baseUrl} ${field}` : `${baseUrl} '${field}'`;

    const headers = { 'Content-Type': 'application/json' };

    const userDetails = {
        UserName: userName,
        Password: password,
        SessionType: 'API'
    };

    try {
        const sessionInfo = await axios.post(sessionUrl, userDetails, {
            headers,
            httpsAgent
        });

        if (sessionInfo.status === 201) {
            const token = sessionInfo.headers['x-auth-token'];
            headers['X-Auth-Token'] = token;

            const response = await axios.get(deviceUrl, {
                headers,
                httpsAgent
            });

            if (response.status === 200) {
                const jsonData = response.data;

                if (jsonData['@odata.count'] > 1) {
                    console.warn("WARNING: Filter returned more than one result. Ignore all results except the first.");
                }

                if (jsonData['@odata.count'] > 0) {
                    const deviceId = jsonData['value'][0]['Id'];
                    let inventoryUrl = `https://${ipAddress}/api/DeviceService/Devices(${deviceId})/InventoryDetails`;

                    if (inventoryType) {
                        inventoryUrl = `https://${ipAddress}/api/DeviceService/Devices(${deviceId})/InventoryDetails('${inventoryTypes[inventoryType]}')`;
                    }

                    const invenResp = await axios.get(inventoryUrl, {
                        headers,
                        httpsAgent
                    });

                    if (invenResp.status === 200) {
                        console.log(`\n*** Inventory for device (${field}) ***`);
                        console.log(JSON.stringify(invenResp.data, null, 4));
                    } else if (invenResp.status === 400) {
                        console.log(`Inventory type ${inventoryType} not applicable for device with Id ${deviceId}`);
                    } else {
                        console.log(`Unable to retrieve inventory for device ${deviceId} due to status code ${invenResp.status}`);
                    }
                } else {
                    console.log(`Unable to retrieve details for device (${field}) from ${ipAddress}`);
                }
            } else {
                console.log(`No device data retrieved from ${ipAddress}`);
            }
        } else {
            console.log(`Unable to create a session with appliance ${ipAddress}`);
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
}
