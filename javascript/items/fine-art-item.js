const Item = require('./item');

class FineArtItem extends Item {
  updatePriceAndSellBy() {
    this.sellBy = this.sellBy - 1;

    this.increasePriceIfAllowed();

    if (this.sellBy < 0) {
      this.increasePriceIfAllowed();
    }
  }
}

module.exports = FineArtItem;
