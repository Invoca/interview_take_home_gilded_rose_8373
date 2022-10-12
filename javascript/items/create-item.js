const Item = require('./item');
const GoldCoinItem = require('./gold-coin-item');
const ConcertTicketItem = require('./concert-ticket-item');
const FineArtItem = require('./fine-art-item');
const Flowers = require('./flowers');

function createItem(name, sellBy, price) {
  if (name === 'Gold Coins') {
    return new GoldCoinItem(name, sellBy, price);
  }

  if (name === 'Concert Tickets') {
    return new ConcertTicketItem(name, sellBy, price);
  }

  if (name === 'Fine Art') {
    return new FineArtItem(name, sellBy, price);
  }

  if (name === 'Flowers') {
    return new Flowers(name, sellBy, price);
  }

  return new Item(name, sellBy, price);
}

module.exports = createItem;
