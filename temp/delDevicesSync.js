// This is the Synchronous version of delDevices.js which is more appropriate in CLI for easy debugging
// install sync-request: `npm install sync-request`
const fs = require('fs');
const readline = require('readline-sync'); // for synchronous line-by-line reading
const request = require('sync-request');

const hostname = 'vx-sim-01';

const credentials = {
  UserName: 'somUser',
  Password: 'somePass',
  SessionType: 'API',
};

// Step 1: Login and get token
function login() {
  const url = `https://${hostname}/api/SessionService/Sessions`;
  const body = JSON.stringify(credentials);

  const res = request('POST', url, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    body,
    rejectUnauthorized: false
  });

  const authToken = res.headers['x-auth-token'];

  if (!authToken) {
    throw new Error('No auth token received');
  }
  return authToken;
}

// Step 2: Get device details
function getDevice(authToken, serverName) {
  const path = `/api/DeviceService/Devices?$filter=contains(DeviceName,'${serverName}')`;
  const url = `https://${hostname}${path}`;

  const res = request('GET', url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': authToken
    },
    rejectUnauthorized: false
  });

  const json = JSON.parse(res.getBody('utf8'));

  const device = json.value && json.value[0];
  if (!device) {
    throw new Error('No devices found in the response');
  }

  return device;
}

// Step 3: Delete the device
function deleteDevice(authToken, deviceName, deviceId) {
  const path = `/api/DeviceService/Devices(${deviceId})`;
  const url = `https://${hostname}${path}`;

  const res = request('DELETE', url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': authToken
    },
    rejectUnauthorized: false
  });

  console.log(`Device ${deviceName} with ID ${deviceId} deleted.`);
}

// Process server list (synchronously line-by-line)
function processServerList() {
  const filePath = 'serverList.txt';

  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  //convert lines into array
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const serverName of lines) {
    if (!serverName.trim()) {
      continue;
    }
    console.log(`\nProcessing server: ${serverName}`);
    try {
      const authToken = login();
      const device = getDevice(authToken, serverName);

      console.log(`Device: ${device.DeviceName} ${device.Id}`);

      deleteDevice(authToken, device.DeviceName, device.Id);
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
}

// Run the main logic
processServerList();
