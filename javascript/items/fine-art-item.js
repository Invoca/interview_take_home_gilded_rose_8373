const Item = require('./item');

class FineArtItem extends Item {
  updatePriceAndSellBy() {
    this.increasePriceIfAllowed();

    if (this.sellBy < 0) {
      this.increasePriceIfAllowed();
    }

    this.sellBy = this.sellBy - 1;
  }
}

module.exports = FineArtItem;
