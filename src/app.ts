import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';

import {
	albumRoutes,
	artistRoutes,
	login,
	playbackRoutes,
	playlistRoutes,
	profileRoutes,
	track,
	userRoutes
} from './routes';
import { Config } from './types/util';
import { logger } from './utility';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config({ path: './.env' });

const config: Config = {
	clientID: process.env.CLIENT_ID as string,
	clientSecret: process.env.CLIENT_SECRET as string,
	redirectUri: 'http://localhost:4200/login',
	port: 3030
};
export const spotify = new SpotifyWebApi({
	clientId: config.clientID,
	clientSecret: config.clientSecret,
	redirectUri: config.redirectUri
});

/* Define routes */
app.use('/album', albumRoutes);
app.use('/artist', artistRoutes);
app.use('/playback', playbackRoutes);
app.use('/playlist', playlistRoutes);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);

app.post('/login', (req: Request, res: Response) => {
	spotify
		.authorizationCodeGrant(JSON.parse(req.body.code))
		.then((data) => {
			spotify.setAccessToken(data.body.access_token);
			spotify.setRefreshToken(data.body.refresh_token);
			res.status(200).send(login(data));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

app.get('/track', (req: Request, res: Response) => {
	spotify
		.getTrack(req.body.id as string)
		.then((data) => {
			res.status(200).send(track(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

app.listen(config.port, () => {
	logger.info(`Listening on port ${config.port}`);
});
