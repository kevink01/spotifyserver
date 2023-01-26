import { Request, Response, Router } from 'express';
import { playing, success } from '..';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { devices, playback, position, repeat, shuffle } from './utility';

const router: Router = Router();

router.get('/devices', (_req: Request, res: Response) => {
	spotify
		.getMyDevices()
		.then((data) => {
			res.status(200).send(devices(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/playback', (_req: Request, res: Response) => {
	spotify
		.getMyCurrentPlaybackState()
		.then((playbackStateData) => {
			spotify
				.getTrack(playbackStateData.body.item?.id as string)
				.then((playbackTrackData) => {
					res.status(200).send(playback(playbackStateData.body, playbackTrackData.body));
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

router.get('/transfer', (req: Request, res: Response) => {
	spotify
		.transferMyPlayback([req.body.id])
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/play', (_req: Request, res: Response) => {
	spotify
		.play()
		.then(() => {
			res.status(200).send(playing(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/pause', (_req: Request, res: Response) => {
	spotify
		.pause()
		.then(() => {
			res.status(200).send(playing(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/seek', (req: Request, res: Response) => {
	spotify
		.seek(req.body.position as number)
		.then(() => {
			res.status(200).send(position(req.body.position as number));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/next', (_req: Request, res: Response) => {
	spotify
		.skipToNext()
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/previous', (_req: Request, res: Response) => {
	spotify
		.skipToPrevious()
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/shuffle', (req: Request, res: Response) => {
	spotify
		.setShuffle(req.body.shuffle as boolean)
		.then(() => {
			res.status(200).send(shuffle(req.body.shuffle as boolean));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/repeat', (req: Request, res: Response) => {
	spotify
		.setRepeat(req.body.repeat)
		.then(() => {
			res.status(200).send(repeat(req.body.repeat as string));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/queue', (req: Request, res: Response) => {
	spotify
		.addToQueue(req.body.id as string)
		.then((data) => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
