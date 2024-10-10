const express = require('express');

class App {
  constructor() {
    this.app = express();

    this.mddlewares();
    this.routes();
  }

  mddlewares() {
    this.app.use(express.json());
  }

  routes() {}
}

module.exports = new App().app;