const { Inventory, createItem } = require('./index.js');

describe('Inventory', () => {
    function addItemAndUpdatePrice(itemName, sellBy, price) {
        const items = [createItem(itemName, sellBy, price)];
        const inventory = new Inventory(items)
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

        const updatedConcertTickets = addItemAndUpdatePrice('Concert Tickets', 10, 50);
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
        const inventory = new Inventory([normalItem, goldCoins, concertTickets])
        inventory.updatePrice();

        expect(normalItem.price).toBe(4);
        expect(normalItem.sellBy).toBe(9);
        expect(goldCoins.price).toBe(80);
        expect(goldCoins.sellBy).toBe(10);
        expect(concertTickets.price).toBe(28);
        expect(concertTickets.sellBy).toBe(2);
    });

    test('updates the same item multiple times', () => {
        const normalItem = createItem('Normal Item', 1, 4);
        const inventory = new Inventory([normalItem])

        inventory.updatePrice();
        expect(normalItem.price).toBe(3);
        expect(normalItem.sellBy).toBe(0);

        inventory.updatePrice();
        expect(normalItem.price).toBe(1);
        expect(normalItem.sellBy).toBe(-1);

        inventory.updatePrice();
        expect(normalItem.price).toBe(0);
        expect(normalItem.sellBy).toBe(-2);

        inventory.updatePrice();
        expect(normalItem.price).toBe(0);
        expect(normalItem.sellBy).toBe(-3);
    });
});
