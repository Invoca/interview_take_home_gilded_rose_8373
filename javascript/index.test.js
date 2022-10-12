const { Inventory, createItem } = require('./index.js');

describe('Inventory', () => {
  function addItemAndUpdatePrice(itemName, sellBy, price) {
    const items = [createItem(itemName, sellBy, price)];
    const inventory = new Inventory(items);
    inventory.updatePrice();
    return items[0];
  }

  test('reduces price and sellBy for normal items', () => {
    const updatedItem = addItemAndUpdatePrice('Normal Item', 10, 20);
    expect(updatedItem.sellBy).toBe(9);
    expect(updatedItem.price).toBe(19);
  });

  test('reduces price twice as fast for normal items past sellBy', () => {
    const updatedItem = addItemAndUpdatePrice('Normal Item', -1, 20);
    expect(updatedItem.price).toBe(18);
  });

  test('does not allow price to go negative', () => {
    const updatedItem = addItemAndUpdatePrice('Normal Item', 10, 0);
    expect(updatedItem.price).toBe(0);
  });

  test('increases price for Fine Art', () => {
    const updatedItem = addItemAndUpdatePrice('Fine Art', 10, 20);
    expect(updatedItem.price).toBe(21);
  });

  test('does not allow price of appreciating items to exceed 50', () => {
    const updatedFineArt = addItemAndUpdatePrice('Fine Art', 10, 50);
    expect(updatedFineArt.price).toBe(50);

    const updatedConcertTickets = addItemAndUpdatePrice(
      'Concert Tickets',
      10,
      50
    );
    expect(updatedConcertTickets.price).toBe(50);
  });

  test('does not allow gold coin price to exceed 80 and does not update the sellBy value', () => {
    const updatedItem = addItemAndUpdatePrice('Gold Coins', 10, 80);
    expect(updatedItem.price).toBe(80);
    expect(updatedItem.sellBy).toBe(10);
  });

  test('does not reduce sellBy time for gold coins', () => {
    const updatedItem = addItemAndUpdatePrice('Gold Coins', 10, 80);
    expect(updatedItem.sellBy).toBe(10);
  });

  test('increases price for Concert Tickets by 1 when more than 10 days before sellBy', () => {
    const updatedItem = addItemAndUpdatePrice('Concert Tickets', 12, 20);
    expect(updatedItem.price).toBe(21);
  });

  test('increases price for Concert Tickets by 2 when between 6 and 10 days before sellBy', () => {
    const updatedItem = addItemAndUpdatePrice('Concert Tickets', 7, 20);
    expect(updatedItem.price).toBe(22);
  });

  test('increases price for Concert Tickets by 3 when less than 6 days before sellBy', () => {
    const updatedItem = addItemAndUpdatePrice('Concert Tickets', 5, 20);
    expect(updatedItem.price).toBe(23);
  });

  test('reduces price to 0 when sellBy for Concert Tickets is zero', () => {
    const updatedItem = addItemAndUpdatePrice('Concert Tickets', 0, 20);
    expect(updatedItem.price).toBe(0);
  });

  test('updates the price and sell by value accordigly for multiple items', () => {
    const normalItem = createItem('Normal Item', 10, 5);
    const goldCoins = createItem('Gold Coins', 10, 80);
    const concertTickets = createItem('Concert Tickets', 3, 25);
    const inventory = new Inventory([normalItem, goldCoins, concertTickets]);
    inventory.updatePrice();

    expect(normalItem.price).toBe(4);
    expect(normalItem.sellBy).toBe(9);
    expect(goldCoins.price).toBe(80);
    expect(goldCoins.sellBy).toBe(10);
    expect(concertTickets.price).toBe(28);
    expect(concertTickets.sellBy).toBe(2);
  });

  test('changes prices for normal items based on the sellBy value', () => {
    const item = createItem('Normal Item', 2, 8);
    const inventory = new Inventory([item]);

    const expectedUpdatedPriceAndSellBy = [
      { price: 7, sellBy: 1 },
      { price: 6, sellBy: 0 },
      { price: 4, sellBy: -1 },
      { price: 2, sellBy: -2 },
      { price: 0, sellBy: -3 },
      { price: 0, sellBy: -4 },
      { price: 0, sellBy: -5 },
    ];

    expectedUpdatedPriceAndSellBy.forEach(({ price, sellBy }) => {
      inventory.updatePrice();
      expect(item.price).toBe(price);
      expect(item.sellBy).toBe(sellBy);
    });
  });

  test('changes price for concert tickets based on the sellBy value', () => {
    const item = createItem('Concert Tickets', 12, 8);
    const inventory = new Inventory([item]);

    const expectedUpdatedPriceAndSellBy = [
      { price: 9, sellBy: 11 },
      { price: 11, sellBy: 10 },
      { price: 13, sellBy: 9 },
      { price: 15, sellBy: 8 },
      { price: 17, sellBy: 7 },
      { price: 19, sellBy: 6 },
      { price: 22, sellBy: 5 },
      { price: 25, sellBy: 4 },
      { price: 28, sellBy: 3 },
      { price: 31, sellBy: 2 },
      { price: 34, sellBy: 1 },
      { price: 37, sellBy: 0 },
      { price: 0, sellBy: -1 },
      { price: 0, sellBy: -2 },
    ];

    expectedUpdatedPriceAndSellBy.forEach(({ price, sellBy }) => {
      inventory.updatePrice();
      expect(item.price).toBe(price);
      expect(item.sellBy).toBe(sellBy);
    });
  });

  test('changes price for fine art based on the sellBy value', () => {
    const item = createItem('Fine Art', 3, 40);
    const inventory = new Inventory([item]);

    const expectedUpdatedPriceAndSellBy = [
      { price: 41, sellBy: 2 },
      { price: 42, sellBy: 1 },
      { price: 43, sellBy: 0 },
      { price: 45, sellBy: -1 },
      { price: 47, sellBy: -2 },
      { price: 49, sellBy: -3 },
      { price: 50, sellBy: -4 },
      { price: 50, sellBy: -5 },
    ];

    expectedUpdatedPriceAndSellBy.forEach(({ price, sellBy }) => {
      inventory.updatePrice();
      expect(item.price).toBe(price);
      expect(item.sellBy).toBe(sellBy);
    });
  });

  test('changes price for Flowers twice as fast compared to normal products', () => {
    const item = createItem('Flowers', 3, 9);
    const inventory = new Inventory([item]);

    const expectedUpdatedPriceAndSellBy = [
      { price: 7, sellBy: 2 },
      { price: 5, sellBy: 1 },
      { price: 3, sellBy: 0 },
      { price: 1, sellBy: -1 },
      { price: 0, sellBy: -2 },
      { price: 0, sellBy: -3 },
    ];

    expectedUpdatedPriceAndSellBy.forEach(({ price, sellBy }) => {
      inventory.updatePrice();
      expect(item.price).toBe(price);
      expect(item.sellBy).toBe(sellBy);
    });
  });
});
