import express from 'express';

const app = express();

app.get('/ads', (request, response) => {
  return response.status(200).json([
    { id: 1, nome: "Anuncio 1" },
    { id: 2, nome: "Anuncio 2" },
    { id: 3, nome: "Anuncio 3" },
    { id: 4, nome: "Anuncio 4" },
  ]);
});

app.listen(3333, () => console.log("Server started on port 3333"));