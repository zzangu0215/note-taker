const fs = require('fs');
const path = require('path');
const { noteTaking } = require('../db/store.js');

module.exports = app => {

  app.get('/api/notes', (req, res) => {
    noteTaking
      .getAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      });
  })

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
  })
}