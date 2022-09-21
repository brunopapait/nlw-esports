import express, {Request, Response} from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client';
import { convertHourInMinutes } from './utils/convertHourInMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

/**
 * Listagem de games com contagem de anúncios
 */
app.get('/games', async (request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ads: true,
        }
      }
    }
  });

  return response.json(games);
});

/**
 * Criar um novo anúncio
 */
app.post('/ads', async (request: Request, response: Response) => {
  const body = request.body;
  console.log(body);
  
  const createdAd = await prisma.ad.create({
    data: {
      ...body,
      hourStart: convertHourInMinutes(body.hourStart),
      hourEnd: convertHourInMinutes(body.hourEnd),
      weekDays: body.weekDays.join(','),      
    },

    select: {
      id: true,
      discord: true,
      game: {
        select: {
          id: true,
          title: true,
          bannerUrl: true,
        }
      },
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
      createdAt: true,
    }
  });

  return response.status(201).json(createdAd);
})

/**
 * Listagem de anúncios por game
 */
app.get('/games/:gameId/ads', async (request: Request, response: Response) => {
  const gameId = request.params.gameId;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
      createdAt: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedAds = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  });

  return response.status(200).json(formattedAds);
});

/**
 * Buscar Discord pelo ID do anúncio
 */
app.get('/ads/:adsId/discord', async (request: Request, response: Response) => {
  const adsId = request.params.adsId;

  const discord = await prisma.ad.findUnique({
    select: {
      discord: true,
    },

    where: {
      id: adsId
    }
  });

  if (!discord) {
    return response.status(404).json({message: 'Discord não encontrado'});
  }
  

  return response.status(200).json(discord);
});

app.listen(3333, () => console.log("Server started on port 3333"));