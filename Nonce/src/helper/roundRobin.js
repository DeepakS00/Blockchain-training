class RoundRobin {
  constructor(items) {
    this.items = items;
    this.currentIndex = 0;
  }

  getNext() {
    if (this.items.length === 0) {
      return null;
    }

    const currentItem = this.items[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.items.length;

    return currentItem;
  }
}

module.exports = RoundRobin;
