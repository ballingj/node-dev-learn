const https = require('https');
const fs = require('fs');
const readline = require('readline');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const hostname = 'vx-sim-01';
const port = 443;

const credentials = {
  UserName: 'somuser',
  Password: 'sompass',
  SessionType: 'API',
};

// Utility to perform HTTPS requests
function performRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ data, headers: res.headers });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

// Step 1: Login and get token
async function login() {
  const body = JSON.stringify(credentials);

  const loginOptions = {
    hostname,
    port,
    path: '/api/SessionService/Sessions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
    agent: httpsAgent,
  };

  const response = await performRequest(loginOptions, body);
  const authToken = response.headers['x-auth-token'];

  if (!authToken) {
    throw new Error('No auth token received');
  }

  return authToken;
}

// Step 2: Get device details
async function getDevice(authToken, serverName) {
  const queryPath = `/api/DeviceService/Devices?$filter=contains(DeviceName,'${serverName}')`;

  const getOptions = {
    hostname,
    port,
    path: queryPath,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': authToken,
    },
    agent: httpsAgent,
  };

  const response = await performRequest(getOptions);
  const json = JSON.parse(response.data);

  const device = json.value && json.value[0];
  if (!device) {
    throw new Error('No devices found in the response');
  }

  return device;
}

// Step 3: Delete the device
async function deleteDevice(authToken, deviceId) {
  const deleteOptions = {
    hostname,
    port,
    path: `/api/DeviceService/Devices(${deviceId})`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': authToken,
    },
    agent: httpsAgent,
  };

  await performRequest(deleteOptions);
  console.log(`Device with ID ${deviceId} deleted.`);
}

// Function to read a file that contains list of servers by line

async function processLineByLine() {
    const fileStream = fs.createReadStream('./server.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // To handle different line endings
    });

    for await (const serverName of rl) {
        // Process each line here
        console.log(`Deleting: ${serverName}`);
        (async () => {
          try {
            const authToken = await login();
            const device = await getDevice(authToken, serverName);
        
            console.log('Device ID:', device.Id);
            console.log('Device Name:', device.DeviceName);
        
            // delete the device:
            await deleteDevice(authToken, device.Id);
        
          } catch (error) {
            console.error('Error:', error.message);
          }
        })();
    }
}



// Main workflow
processLineByLine();

