import ENV from "bookstore/config/environment";

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.get('/books', (schema, request) => {
    let limit = request.queryParams.limit
    let books = schema.books.all()
    let total = books.length
    request.mirageMeta = { total }
    return books.slice(0,limit)
  });
  this.get('/books/:id');
  this.get('/authors');
  this.get('/authors/:id');

  // Allow passthrough to the development server for all other requests
  this.passthrough(`${ENV.BACKEND_HOST}/**`);
}
