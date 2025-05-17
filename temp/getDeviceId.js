const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const serverName = 'omsdp11fae'

const hostname = 'vx-sim-01';
const port = 443;
const loginPath = `/api/SessionService/Sessions`;
let method = 'POST';

const body = JSON.stringify({
  "UserName":"somuser",
  "Password":"somepass",
  "SessionType":"API"
});

const loginOptions = {
  hostname,
  port,
  path: loginPath,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  },
  agent: httpsAgent
};

const req = https.request(loginOptions, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const authToken = res.headers['x-auth-token'];
    // console.log('X-Auth-Token:', authToken);

    if (!authToken) {
      console.error('No auth token received.');
      return;
    }
  
    // Now make a follow-up authenticated GET request
    const followUpOptions = {
      hostname,
      port: 443,
      path: `/api/DeviceService/Devices?$filter=contains(DeviceName,'${serverName}')`, 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken
      },
      agent: httpsAgent
    };

    const followUpReq = https.request(followUpOptions, (followUpRes) => {
      let followUpData = '';

      followUpRes.on('data', (chunk) => {
        followUpData += chunk;
      });

      followUpRes.on('end', () => {
        //console.log('Follow-up Response:', followUpData);
        //now extract the Id and deviceName
        try {
          const json = JSON.parse(followUpData);
          const device = json.value && json.value[0]; // Assuming there's at least one device
      
          if (device) {
            const id = device.Id;
            const deviceName = device.DeviceName;
      
            console.log('Device ID:', id);
            console.log('Device Name:', deviceName);


            // Now make a follow up request - in this case a DELETE request
            const deleteOptions = {
              hostname,
              port: 443,
              path: `/api/DeviceService/Devices(${id})`,
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': authToken
              },
              agent: httpsAgent
            };

            const deleteReq = https.request(deleteOptions, (deleteRes) => {
              let deleteData = '';

              deleteRes.on('data', (chunk) => {
                deleteData += chunk;
              });

              deleteRes.on('end', () => {
                console.log('Deleted:', deviceName);
              });
            });

            deleteReq.on('error', (e) => {
              console.error(`Delete request error: ${e.message}`);
            });

            deleteReq.end();
            //end of delete request


          } else {
            console.error('No devices found in the response.');
          }
        } catch (err) {
          console.error('Failed to parse JSON response:', err.message);
        }
      });
    });

    followUpReq.on('error', (e) => {
      console.error(`Follow-up request error: ${e.message}`);

    });

    followUpReq.end();

  });
});

req.on('error', (e) => {
console.error(`Login request error: ${e.message}`);
});

// Write data to request body
req.write(body);
req.end();

