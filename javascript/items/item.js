const MAX_ITEM_PRICE = 50;
const MIN_ITEM_PRICE = 0;

class Item {
  constructor(name, sellBy, price) {
    this.name = name;
    this.sellBy = sellBy;
    this.price = price;
  }

  updatePriceAndSellBy() {
    this.sellBy = this.sellBy - 1;

    this.decreasePriceIfAllowed();
    if (this.sellBy < 0) {
      this.decreasePriceIfAllowed();
    }
  }

  increasePriceIfAllowed() {
    if (this.price < this.getMaxPrice()) {
      this.price = this.price + 1;
    }
  }

  decreasePriceIfAllowed() {
    if (this.price > this.getMinPrice()) {
      this.price = this.price - 1;
    }
  }

  getMaxPrice() {
    return MAX_ITEM_PRICE;
  }

  getMinPrice() {
    return MIN_ITEM_PRICE;
  }

  toString() {
    return `${this.name}, ${this.sellBy}, ${this.price}`;
  }
}

module.exports = Item;
