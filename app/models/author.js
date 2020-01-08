import {attr, hasMany} from '@ember-data/model';

import PublisherModel from "./publisher"

export default class AuthorModel extends PublisherModel {
  @attr('string') bio;
  @hasMany books;

  didLoad() {
    this.set('loadedAt', new Date())
  }
}
