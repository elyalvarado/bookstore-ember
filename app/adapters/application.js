import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bookstore/config/environment'

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.BACKEND_HOST
}
