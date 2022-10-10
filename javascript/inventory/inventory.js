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

module.exports = Inventory;
