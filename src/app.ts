import express, { NextFunction, Request, Response } from 'express';
import { Config } from './interfaces';
import { logger } from './utility';
import dotenv from 'dotenv';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import { Login } from './types/util';
import { albumRoutes, artistRoutes, playlistRoutes, profileRoutes, userRoutes } from './routes';
import { track } from './routes';

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

app.use('/album', albumRoutes);
app.use('/artist', artistRoutes);
app.use('/profile', profileRoutes);
app.use('/playlist', playlistRoutes);
app.use('/user', userRoutes);

app.listen(config.port, () => {
	logger.info(`Listening on port ${config.port}`);
});

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

function login(data: any): Login {
	return {
		access: data.body.access_token,
		expires: data.body.expires_in,
		refresh: data.body.refresh_token
	};
}
