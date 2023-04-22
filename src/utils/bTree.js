class BTreeNode {
  constructor(isLeaf) {
    this.keys = [];
    this.isLeaf = isLeaf;
    this.children = [];
    this.parent = null;
  }

  get numberOfKeys() {
    return this.keys.length;
  }

  addKey(key) {
    if (!key) {
      return;
    }
    let pos = 0;
    while (pos < this.numberOfKeys && this.keys[pos] < key) {
      pos++;
    }
    this.keys.splice(pos, 0, key);
  }

  removeValue(pos) {
    if (pos >= this.numberOfKeys) {
      return null;
    }
    return this.keys.splice(pos, 1)[0];
  }

  addChild(node, pos) {
    this.children.splice(pos, 0, node);
    node.parent = this;
  }

  removeChild(pos) {
    return this.children.splice(pos, 1)[0];
  }
}

class BTree {
  constructor(order) {
    this.order = order;
    this.keysLength = order - 1;
    this.root = null;
  }

  searchKey(node, value) {
    if (node.keys.includes(value)) {
      return node;
    }
    if (node.leaf) {
      return null;
    }
    let child = 0;
    while (child <= node.numberOfKeys && node.keys[child] < parseInt(value, 10)) {
      child++;
    }
    this.searchKey(node.children[child], value);
  }
}
