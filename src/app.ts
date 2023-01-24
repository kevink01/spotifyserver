import express, { NextFunction, Request, Response } from 'express';
import { Config } from './interfaces';
import { logger } from './utility';
import dotenv from 'dotenv';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import { Login } from './types/core';
import { userRoutes } from './routes';

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

app.use((req: Request, _res: Response, next: NextFunction) => {
	req.headers.accept = 'application/json';
	req.acceptsEncodings(['gzip', 'deflate', 'br']);
	req.headers['accept-language'] = 'en-US,en;q=0.5';
	req.headers['access-control-allow-origin'] = 'cors';
	req.headers.connection = 'keep-alive';
	next();
});

app.use('/user', userRoutes);

app.listen(config.port, () => {
	logger.info(`Listening on port ${config.port}`);
});

app.post('/login', (req: Request, res: Response) => {
	logger.info(JSON.parse(req.body.code));
	spotify
		.authorizationCodeGrant(JSON.parse(req.body.code))
		.then((data) => {
			logger.info(data);
			spotify.setAccessToken(data.body.access_token);
			spotify.setRefreshToken(data.body.refresh_token);
			res.status(200).send(login(data));
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
