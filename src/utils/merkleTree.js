const generateHash = require('../helper/hash');
class MerkleTree {
  constructor(transactions) {
    this.transactions = transactions;
    this.levels = [];
    this.createMerkleTree();
  }

  ensureEven(hashes) {
    if (hashes.length % 2 !== 0) {
      hashes.push(hashes[hashes.length - 1]);
    }
  }

  createMerkleTree() {
    if (!this.transactions || this.transactions.length === 0) {
      return [];
    }
    this.ensureEven(this.transactions);
    const hashes = this.transactions.map((trx) => generateHash(trx));
    let tree = [hashes];
    const generate = (hashes, tree) => {
      if (hashes.length === 1) {
        return hashes;
      }
      this.ensureEven(hashes);
      const combinedHashes = [];
      for (let i = 0; i < hashes.length; i += 2) {
        const hashesConcatenated = hashes[i] + hashes[i + 1];
        const hash = generateHash(hashesConcatenated);
        combinedHashes.push(hash);
      }
      tree.push(combinedHashes);
      return generate(combinedHashes, tree);
    };
    generate(hashes, tree);
    this.levels = tree;
  }

  getRootNode() {
    return this.levels[this.levels.length - 1][0];
  }

  getLeafNodeDirectionInMerkleTree(hash, merkleTree) {
    const hashIndex = merkleTree[0].findIndex((h) => h === hash);
    return hashIndex % 2 === 0 ? LEFT : RIGHT;
  }
}
const transactions = ['a', 'b', 'c', 'd', 'e'];
const tree = new MerkleTree(transactions);
console.log(tree.levels);
console.log(tree.getRootNode());
