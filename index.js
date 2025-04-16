const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let movies = [
  { id: 1, title: "Mughal-e-Azam", director: "K. Asif", year: 1960 },
  { id: 2, title: "Mother India", director: "Mehboob Khan", year: 1957 },
  { id: 3, title: "Pakeezah", director: "Kamal Amrohi", year: 1972 },
  { id: 4, title: "Deewaar", director: "Yash Chopra", year: 1975 },
  { id: 5, title: "Chak De! India", director: "Shimit Amin", year: 2007 },
  { id: 6, title: "Barfi!", director: "Anurag Basu", year: 2012 },
  { id: 7, title: "Queen", director: "Vikas Bahl", year: 2014 },
  { id: 8, title: "Andhadhun", director: "Sriram Raghavan", year: 2018 },
  { id: 9, title: "Padmaavat", director: "Sanjay Leela Bhansali", year: 2018 },
  { id: 10, title: "RRR", director: "S.S. Rajamouli", year: 2022 }
];

app.get('/movies', (req, res) => res.json(movies));

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === Number(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

app.post('/movies', (req, res) => {
  if (!req.body.title || !req.body.director || !req.body.year) {
    return res.status(400).send('Title, director, and year required');
  }
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: Number(req.body.year)
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === Number(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  movie.title = req.body.title || movie.title;
  movie.director = req.body.director || movie.director;
  movie.year = req.body.year ? Number(req.body.year) : movie.year;
  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const index = movies.findIndex(m => m.id === Number(req.params.id));
  if (index === -1) return res.status(404).send('Movie not found');
  movies.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));