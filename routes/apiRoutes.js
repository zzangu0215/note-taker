const noteTaking = require('../db/store.js');

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

    const randomNum = Math.floor((Math.random()*1000000) + 1);
    newNote.id = randomNum;

    noteTaking
      .push(newNote)
      .then(() => {
        res.json(newNote);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      }); 
  })

  app.get('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;

    noteTaking
      .getAll()
      .then(data => {
        res.json(data[chosen]);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      })
  })

  app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;

    noteTaking
      .getAll()
      .then(data => {
        deleteChosenID(res, data, chosen);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      })
  })

  function deleteChosenID(res, data, chosen) {
    for (const element of data) {
      if (element.id == chosen) {
        const index = data.indexOf(element);
        data.splice(index, 1);
        noteTaking.write(data);
        res.json(data);
      }
    }
  }

}
