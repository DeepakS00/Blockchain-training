class BloomFilter {
  constructor(itemCount, falseProb) {
    this.falseProb = falseProb;
    this.size = this.getSize(itemCount, falseProb);
    this.hashCount = this.getHashCount(this.size, itemCount);
    this.bitArray = new Array(this.size).fill(0);
  }

  hashFunction(item, index) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i) + index * this.size;
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    return hash;
  }

  add(item) {
    for (let i = 0; i < this.hashCount; i++) {
      const hashValue = this.hashFunction(item, i);
      const index = hashValue % this.size;
      this.bitArray[index] = 1;
    }
  }

  contains(item) {
    for (let i = 0; i < this.hashCount; i++) {
      const hashValue = this.hashFunction(item, i);
      const index = hashValue % this.size;
      if (this.bitArray[index] === 0) {
        return false;
      }
    }
    return true;
  }

  getSize(n, p) {
    const size = -(n * Math.log(p)) / Math.log(2) ** 2;
    return Math.ceil(size);
  }

  getHashCount(m, n) {
    const count = (m / n) * Math.log(2);
    return Math.ceil(count);
  }
}

module.exports = BloomFilter;
