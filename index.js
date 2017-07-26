const GbfsClient = require('./lib/gbfs');
const gbfsClient = new GbfsClient();

gbfsClient.stationStatus('325').then((data) => console.log(data));
