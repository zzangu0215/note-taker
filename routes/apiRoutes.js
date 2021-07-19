// const fs = require('fs');
// const path = require('path');
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

    const randomNum = Math.floor((Math.random()*10000) + 1);
    newNote.id = `${randomNum}`;

        // newNote.id = `${data.length}`;
    // console.log(`New note ID is: ${newNote.id}`);
    // setID(newNote);

    // noteTaking
    //   .push(newNote)
    //   .then(data => {
    //     noteTaking.write(data);
    //     res.json(data);
    //     console.log(`Added new note: ${newNote.title}
    //     New note ID is: ${newNote.id}\n`);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     return res.status(500).end();
    //   }); 

    noteTaking.push(newNote);
    noteTaking
      .getAll()
      .then(data => {
        noteTaking.write(data);
        res.json(data);
        console.log(`Added new note: ${newNote.title}
        New note ID is: ${newNote.id}\n`);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      }); 
  
    // noteTaking
    //   .push(newNote)
    //   .then(
    //     noteTaking.getAll()
    //     .then(data => {
    //       noteTaking.write(data);
    //       res.json(data);
    //       console.log(`Added new note: ${newNote.title}
    //       New note ID is: ${newNote.id}\n`);
    //     })
    //   )
    //   .catch(err => {
    //     console.log(err);
    //     return res.status(500).end();
    //   })       
  })

  app.get('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    console.log(`Note ID: ${chosen}`);

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
        // const afterDelete = data.splice(parseInt(chosen), 1);
        // noteTaking.write(afterDelete);
        // res.json(afterDelete);
        // console.log(`ID(${chosen}) Note Deleted`);
        deleteChosenID(res, data, chosen);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      })
  })

  function setID(newNote) {
    noteTaking
      .getAll()
      .then(() => {
        // const dataLength = data.length;

        // if (dataLength === 0) newNote.id = `${dataLength}`;
        // else newNote.id = `${dataLength + 1}`
        let randomNum = Math.floor((Math.random()*10000) + 1);
        newNote.id = `${randomNum}`;

        // newNote.id = `${data.length}`;
        // console.log(`New note ID is: ${newNote.id}`);
      })
  };

  function deleteChosenID(res, data, chosen) {
    for (const element of data) {
      if (element.id == chosen) {
        const index = data.indexOf(element);
        // const afterDelete = data.splice(index, 1);
        data.splice(index, 1);

        noteTaking.write(data);
        res.json(data);
        console.log(`ID(${chosen}) Note Deleted\n`);
      }
    }
  }

}
