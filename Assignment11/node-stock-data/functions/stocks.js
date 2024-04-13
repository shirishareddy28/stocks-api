const fetchData = require('../util/fetchData');
const formatOptions = require('../util/formatOptionsStocks');

function mergeData(fetchedData) {
  const mergedData = { count: 0, data: [] };
  fetchedData.forEach((dataObject) => {
    mergedData.count += dataObject.pagination['count'];
    mergedData.data = mergedData.data.concat(dataObject.data);
  });
  return mergedData;
}

async function stocks({
  API_TOKEN, options
}) {
  const URL = 'http://api.marketstack.com/v1/eod';
  if (API_TOKEN === undefined) {
    throw new Error('No API_TOKEN provided, add your API_TOKEN from http://marketstack.com/ as an argument');
  }
  const optionQuery = formatOptions(options);
  try {
    const data = [];
    data.push(fetchData(URL, API_TOKEN, optionQuery));
    const fetchedData = await Promise.all(data);
    return mergeData(fetchedData);
  } catch (error) {
    throw error;
  }
}


module.exports = stocks;
