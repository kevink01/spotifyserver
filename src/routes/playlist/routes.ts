import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { createPlaylist, featuredPlaylists, playlistTracks } from './utility';
import { snapshot, success } from '..';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	spotify
		.getPlaylist(req.query.id as string)
		.then((data) => {
			playlistTracks(data.body)
				.then((data) => {
					res.status(200).send(data);
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

router.put('/details', (req: Request, res: Response) => {
	spotify
		.changePlaylistDetails(req.body.id, {
			name: req.body.details.name,
			description: req.body.details.description,
			public: req.body.details.public,
			collaborative: req.body.details.collaborative
		})
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/featured', (req: Request, res: Response) => {
	spotify
		.getFeaturedPlaylists()
		.then((data) => {
			res.status(200).send(featuredPlaylists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/image', (req: Request, res: Response) => {
	spotify
		.uploadCustomPlaylistCoverImage(req.body.id, req.body.image)
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/new', (req: Request, res: Response) => {
	spotify
		.createPlaylist(req.body.name, {
			description: req.body.description,
			public: req.body.public,
			collaborative: req.body.collaborative
		})
		.then((data) => {
			res.status(200).send(createPlaylist(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.delete('/playlist', (req: Request, res: Response) => {
	spotify
		.unfollowPlaylist(req.body.id)
		.then(() => res.status(200).send(success(true)))
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/tracks/new', (req: Request, res: Response) => {
	spotify
		.addTracksToPlaylist(req.body.id, req.body.tracks, {
			position: req.body.position
		})
		.then((data) => {
			res.status(200).send(snapshot(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.put('/tracks/reorder', async (req: Request, res: Response) => {
	// TODO: Bad reorder code
	let sent = false;
	let snapshot = req.body.snapshot;
	const calls = Math.ceil(req.body.tracks.length / 100);
	await spotify
		.replaceTracksInPlaylist(
			req.body.id,
			req.body.tracks.slice(0, req.body.tracks.length < 100 ? req.body.tracks.length : 100)
		)
		.then((data) => {
			snapshot = data.body.snapshot_id;
		})
		.catch((err) => {
			sent = true;
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
	for (let i = 1; i < calls; i++) {
		if (!sent) {
			await spotify
				.addTracksToPlaylist(
					req.body.id,
					req.body.tracks.slice(
						i * 100,
						i * 100 + 100 > req.body.tracks.length ? i * 100 + (req.body.tracks.length % 100) : i * 100 + 100
					),
					{ position: i * 100 }
				)
				.then((data) => {
					snapshot = data.body.snapshot_id;
				})
				.catch((err) => {
					sent = true;
					logger.error(err);
					res.status(err.statusCode).send(err.body.error);
				});
		}
	}
	if (!sent) {
		res.status(200).send({ snapshot: snapshot });
	}
});

export default router;
