const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./model/workoutModel");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

app.post("/submit", ({body}, res) => {
  const user = new User(body);
  user.setFullName();
  user.lastUpdatedDate();

  User.create(user)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});