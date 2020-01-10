import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `book title ${i}`
  },
  price: 4.99,
});
