const Item = require('./item');

const GOLD_COIN_PRICE = 80;

class GoldCoinItem extends Item {
  updatePriceAndSellBy() {
    // Intentionally Empty
  }

  getMaxPrice() {
    return GOLD_COIN_PRICE;
  }

  getMinPrice() {
    return GOLD_COIN_PRICE;
  }
}

module.exports = GoldCoinItem;
