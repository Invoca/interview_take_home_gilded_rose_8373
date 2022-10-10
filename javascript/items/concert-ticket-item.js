const Item = require('./item');

class ConcertTicketItem extends Item {
  updatePriceAndSellBy() {
    this.sellBy = this.sellBy - 1;

    if (this.sellBy >= 0) {
      this.increasePriceIfAllowed();

      if (this.sellBy < 11) {
        this.increasePriceIfAllowed();
      }

      if (this.sellBy < 6) {
        this.increasePriceIfAllowed();
      }
    } else {
      this.price = 0;
    }
  }
}

module.exports = ConcertTicketItem;
