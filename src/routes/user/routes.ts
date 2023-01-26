import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { albums, artists, me, playlists, savedTracks, recentTracks, topArtists, topTracks } from './utility';

const router: Router = Router();

router.get('/me', (_req: Request, res: Response) => {
	spotify
		.getMe()
		.then((data) => {
			res.status(200).send(me(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/playlists', (req: Request, res: Response) => {
	spotify
		.getUserPlaylists()
		.then((data) => {
			res.status(200).send(playlists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/artists', (_req: Request, res: Response) => {
	spotify
		.getFollowedArtists()
		.then((data) => {
			res.status(200).send(artists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/albums', (_req: Request, res: Response) => {
	spotify
		.getMySavedAlbums()
		.then((data) => {
			res.status(200).send(albums(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/tracks', (_req: Request, res: Response) => {
	spotify
		.getMySavedTracks({ limit: 1 })
		.then((data) => {
			savedTracks(data.body)
				.then((tracks) => {
					res.status(200).send(tracks);
				})
				.catch((err) => {
					logger.error(err);
					res.status(err.statusCode).send(err.body.error);
				});
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/top/tracks', (_req: Request, res: Response) => {
	spotify
		.getMyTopTracks()
		.then((data) => {
			res.status(200).send(topTracks(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/top/artists', (_req: Request, res: Response) => {
	spotify
		.getMyTopArtists()
		.then((data) => {
			res.status(200).send(topArtists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/recent/tracks', (_req: Request, res: Response) => {
	spotify
		.getMyRecentlyPlayedTracks({
			limit: 10
		})
		.then((data) => {
			res.status(200).send(recentTracks(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
