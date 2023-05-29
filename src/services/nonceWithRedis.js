const {get, set} = require('../utils/redis');
// const RoundRobin = require('../helper/roundRobin');
const {create} = require('../helper/address');

const createAddresses = (count) => {
  const allAddresses = create(count);
  set('Addresses', JSON.stringify(allAddresses));
};

// const selectAddress = (allAdresses) => {
//   const series = new RoundRobin(Object.keys(allAdresses));
//   return series.getNext();
// };

const getAllAddressess = () => {
  const all = get('Addresses');
  return all;
};

const nonceService = async ({id, failed = []}) => {
  let isProcessing = false;

  async function processRequests() {
    let nonce;
    if (isProcessing) {
      return;
    }
    isProcessing = true;
    const allAddresses = await get('Addresses');
    if (failed.length) {
      allAddresses[id].failed = [...allAddresses[id].failed, ...failed];
    } else {
      if (allAddresses[id].failed.length) {
        nonce = Math.min(...allAddresses[id].failed);
        const index = allAddresses[id].failed.indexOf(nonce);
        allAddresses[id].failed.splice(index, 1);
      } else {
        nonce = allAddresses[id].nonce;
        allAddresses[id].nonce++;
      }
    }
    set('Addresses', JSON.stringify(allAddresses));
    isProcessing = false;
    return nonce;
  }
  return processRequests();
};

module.exports = {
  createAddresses,
  // selectAddress,
  nonceService,
  getAllAddressess,
};
