import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class AuthorAdapter extends JSONAPIAdapter {
  shouldReloadRecord() {
    return false
  }

  shouldBackgroundReloadRecord(store, snapshot) {
    const loadedAt = snapshot.record.get('loadedAt');
    // if it was loaded more than an hour ago
    return Date.now() - loadedAt > 3600000;
  }
}
