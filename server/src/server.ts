import express, {request, Request, Response} from 'express';

const app = express();

/**
 * Listagem de games com contagem de anúncios
 */
app.get('/games', (request: Request, response: Response) => {
  return response.json([]);
});

/**
 * Criar um novo anúncio
 */
app.post('/ads', (request: Request, response: Response) => {
  return response.json([]);
})


/**
 * Listagem de anúncios por game
 */
app.get('/game/:gameId/ads', (request: Request, response: Response) => {
  const gameId = request.params.gameId;

  console.log(gameId);
  
  return response.status(200).json([ ]);
});

/**
 * Buscar Discord pelo ID do anúncio
 */
app.get('/ads/:adsId/discord', (request: Request, response: Response) => {
  const adsId = request.params.adsId;

  console.log(adsId);
  
  return response.status(200).json([]);
});

app.listen(3333, () => console.log("Server started on port 3333"));