const fs = require('fs');


module.exports = function(app) {

  app.get('/api/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

  app.post('/api/notes', function(req, res) {
      let noteNew = req.body;
  
          fs.readFile('./db/db.json', 'utf8', (err, data) => {
              if (err) {
                  console.log(`err at the database ${err}`);
              } 
              
              else if (data.length > 2) {
                  obj = JSON.parse(data);
                  obj.push(noteNew);
  
                  fs.writeFile('./db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                      if(err) {
                          throw err;
                      }
                      console.log('Note saved.')
                  });
             }
              else {
                  obj = [];
                  obj.push(noteNew);
                  fs.writeFile('./db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                      if(err) {
                          throw err;
                      }
                      console.log('Note saved.')
                  });
              }
          });
  });


  app.delete('/api/notes/:id', function(req, res) {
    // Gets id number of note to delete
    const deleteNote = req.params.id;
    console.log(deleteNote);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      // Comparing each note's id to delete note
      dbData = JSON.parse(data);
      // for each function, comparing each note's id to the deleted one
      for (let i = 0; i < dbData.length; i++) {
        if (dbData[i].id === Number(deleteNote)) {
          dbData.splice([i], 1);
        }
      }
      console.log(dbData);
      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    // Express response.status
    res.status(204).send();
  });
};