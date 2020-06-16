const fs = require("fs");

let userInput = require("../db/db.json");
let currentId = userInput.map((note) => note.id);

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(userInput);

    app.post("/api/notes", function (req, res) {
      let newId = 0;
      while (currentId.includes(newId)) {
        newId++;
      }
      currentId.push(newId);
      const newNote = {
        id: newId,
        title: req.body.title,
        text: req.body.text,
      };

      userInput.push(newNote);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(userInput),
        "UTF8",
        (err, data) => {
          if (err) throw err;
        }
      );
      res.json(newNote);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < userInput.length; i++) {
      if (userInput[i].id === id) {
        userInput.splice(i, 1);
      }
    }

    fs.writeFile("./db/db.json", JSON.stringify(userInput), function (err) {
      res.json(userInput);
    });
  });
};
