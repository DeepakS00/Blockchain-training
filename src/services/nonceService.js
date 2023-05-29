const {create} = require('../helper/address');
const RoundRobin = require('../helper/roundRobin');

class NonceService {
  constructor() {
    this.allAddresses = {};
    this.series;
  }

  createAddresses(count) {
    const addresses = create(count);
    this.allAddresses = addresses;
    this.series = new RoundRobin(Object.keys(this.allAddresses));
  }

  getAllAddressess() {
    return this.allAddresses;
  }

  selectAddress() {
    return this.series.getNext();
  }

  setFailedNonces(id, failedNonces) {
    const maxFailed = Math.max(...failedNonces);
    if (this.allAddresses[id].nonce <= maxFailed) {
      throw new Error('Nonce too high');
    }
    this.allAddresses[id].failed = [...this.allAddresses[id].failed, ...failedNonces];
  }

  async setNonce(id) {
    let isProcessing = false;

    let nonce;
    if (isProcessing) {
      return;
    }
    isProcessing = true;

    if (this.allAddresses[id]?.failed?.length) {
      nonce = Math.min(...this.allAddresses[id].failed);
      const index = this.allAddresses[id].failed.indexOf(nonce);
      this.allAddresses[id].failed.splice(index, 1);
    } else {
      nonce = this.allAddresses[id].nonce;
      this.allAddresses[id].nonce++;
    }

    isProcessing = false;
    return nonce;
  }
}

module.exports = NonceService;
