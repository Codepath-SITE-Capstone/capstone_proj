'use strict';
//Globals
const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const API_KEY = "[enter your key]";
//variables
const qs = require('querystring');
const axios = require('axios');
async function distance(args) {
  const options = formatOptions(args);  
  const data = await fetchData(DISTANCE_API_URL, options);
  if(data.status != "OK"){return new Error('Status error: ' + data.status + ': ' + data.error_message)};
  return formatResults(data, options);;
};
function formatOptions(args) {
  var options = {
    index: args.index || null,
    origins: args.origin,
    destinations: args.destination,
    mode: args.mode || 'driving',
    units: args.units || 'imperial',
    language: args.language || 'en',
    avoid: args.avoid || null,
    sensor: args.sensor || false,
    key: API_KEY
  };
  if (!args.origin && args.origins) {
    options.origins = args.origins.join('|');
    options.batchMode = true;
  }
  if (!args.destination && args.destinations) {
    options.destinations = args.destinations.join('|');
    options.batchMode = true;
  }
  if (!options.origins) {
    throw new Error('Argument Error: Origin is invalid');
  }
  if (!options.destinations) {
    throw new Error('Argument Error: Destination is invalid');
  }
  return options;
};
function formatResults(data, options) {
  const formatData = (element) => {
    return {
      index: options.index,
      distance: element.distance.text,
      distanceValue: element.distance.value,
      duration: element.duration.text,
      durationValue: element.duration.value,
      origin: element.origin,
      destination: element.destination,
      mode: options.mode,
      units: options.units,
      language: options.language,
      avoid: options.avoid,
      sensor: options.sensor
    };
  };
  let output = [];
  for (var i = 0; i < data.origin_addresses.length; i++) {
    for (var j = 0; j < data.destination_addresses.length; j++) {
      const element = data.rows[i].elements[j];
      const { status } = element;
      if (status != 'OK') { return new Error('Result error: ' + resultStatus) }
      element.origin = data.origin_addresses[i];
      element.destination = data.destination_addresses[j];
      output.push(formatData(element));
    }
  }
  if (output.length == 1 && !options.batchMode) { output = output[0] }
  return output;
};
async function fetchData(apiURL, options) {
  const endpoint = apiURL + qs.stringify(options);
  const results = await axios.get(endpoint);  
  return results.data;
};
const distanceAPI = {
  distance: distance,
}

export default distanceAPI;