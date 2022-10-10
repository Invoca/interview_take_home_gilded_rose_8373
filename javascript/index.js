class Inventory {
  constructor(items) {
    this.items = items;
  }

  updatePrice() {
    this.items.forEach((item) => {
      item.updatePriceAndSellBy();
    });
  }
}

class Item {
  constructor(name, sellBy, price) {
    this.name = name;
    this.sellBy = sellBy;
    this.price = price;
  }

  updatePriceAndSellBy() {
    this.decreasePriceIfAllowed();

    this.sellBy = this.sellBy - 1;

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
    return 50;
  }

  getMinPrice() {
    return 0;
  }

  toString() {
    return `${this.name}, ${this.sellBy}, ${this.price}`
  }
}

class GoldCoinItem extends Item {
  updatePriceAndSellBy() {
    // Intentionally Empty
  }

  getMaxPrice() {
    return 80;
  }

  getMinPrice() {
    return 80;
  }
}

class ConcertTicketsItem extends Item {
  updatePriceAndSellBy() {
    if (this.sellBy > 0) {
      this.increasePriceIfAllowed();

      if ( this.sellBy < 11) {
        this.increasePriceIfAllowed();
      }

      if ( this.sellBy < 6) {
        this.increasePriceIfAllowed();
      }
    }

    this.sellBy = this.sellBy - 1;

    if (this.sellBy < 0) {
      this.price = 0;
    }
  }
}

class FineArtItem extends Item {
  updatePriceAndSellBy() {
    this.increasePriceIfAllowed();

    if (this.sellBy < 0) {
      this.increasePriceIfAllowed();
    }

    this.sellBy = this.sellBy - 1;
  }
}

function createItem(name, sellBy, price) {
  if (name === 'Gold Coins') {
    return new GoldCoinItem(name, sellBy, price);
  }
  if (name === 'Concert Tickets') {
    return new ConcertTicketsItem(name, sellBy, price);
  }
  if (name === 'Fine Art') {
    return new FineArtItem(name, sellBy, price);
  }

  return new Item(name, sellBy, price);
}

module.exports = { Inventory, Item, createItem };
