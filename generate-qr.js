/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const qrcode = require('qrcode-terminal');
const os = require('os');

// Get all network interfaces
const networkInterfaces = os.networkInterfaces();
let ipAddress = null;

// Loop through each network interface and look for the first IPv4 address
for (const interfaceName in networkInterfaces) {
  const iface = networkInterfaces[interfaceName];

  // Some interfaces may have multiple entries (IPv4 and IPv6)
  iface.forEach(details => {
    if (details.family === 'IPv4' && !details.internal) {
      ipAddress = details.address;
    }
  });

  if (ipAddress) {
    break; // Exit the loop once an IPv4 address is found
  }
}

if (!ipAddress) {
  console.error('Unable to find a network interface.');
  process.exit(1);
}

const port = 3000; // Adjust this to the correct port if necessary

// Generate a QR code for the local IP address and port
const url = `http://${ipAddress}:${port}`;
console.log(`Generated URL: ${url}`);
qrcode.generate(url, { small: true });
