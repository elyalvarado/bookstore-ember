import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name(i) {
    return `Author ${i}`
  },
  bio() {
    return faker.lorem.paragraph()
  },
  discount: 10,
});
