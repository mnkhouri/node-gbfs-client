const GbfsClient = require('../lib/gbfs.js');

// Initialize the module with the GBFS feed url for CitiBike NYC
const gbfsClient = new GbfsClient('https://gbfs.citibikenyc.com/gbfs/en/');

// Get system info
gbfsClient.system()
  .then(system => console.log(`System name: ${system.name}`));

// Get station info for all stations
gbfsClient.stationInfo()
  .then(stations => {
    const stationCount = stations.length;
    // get a renadom number between 1 and stationCount
    const randomNumber = Math.floor(Math.random() * stationCount);
    console.log(`Station count: ${stationCount}`);
    console.log(`Station info for a random station:`);
    console.log(stations[randomNumber]);
    // hand off the station id to the next function
    return stations[randomNumber].station_id
  })
  // Get status for that station
  .then(stationId => gbfsClient.stationStatus(stationId))
  .then(status => {
    console.log(`Station status for that station:`);
    console.log(status)
  });

