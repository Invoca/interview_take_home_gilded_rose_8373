const Item = require('./item');

class Flowers extends Item {
  updatePriceAndSellBy() {
    this.sellBy = this.sellBy - 1;

    this.decreasePriceIfAllowed( 2 );
  }
}

module.exports = Flowers;
