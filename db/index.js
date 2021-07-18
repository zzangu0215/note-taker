const { readFile, writeFile } = require('fs').promises;
const path = require('path');

class Store {
  constructor(filename) {
    this.path = path.join(__dirname, `${filename}.json`);
  }

  getAll() {
    return readFile(this.path, 'utf-8').then(data => JSON.parse(data));
  }

  write(data) {
    return writeFile(this.path, JSON.stringify(data));
  }

  push(item) {
    return this.getAll().then(data => this.write([...data, item]));
  }

  clear() {
    return this.write([]);
  }
}

const noteTaking = new Store('db');

module.exports = noteTaking;