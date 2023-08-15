import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { album, containsSavedAlbums } from './utility';
import { success } from '..';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	spotify
		.getAlbum(req.query.id as string)
		.then((data) => {
			res.status(200).send(album(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/add', (req: Request, res: Response) => {
	switch (req.body.following as boolean) {
		case true:
			spotify
				.removeFromMySavedAlbums([req.body.id as string])
				.then(() => {
					res.status(200).send(success(true));
				})
				.catch((err) => {
					logger.error(err);
					res.status(err.statusCode).send(err.body.error);
				});
			break;
		case false:
			spotify
				.addToMySavedAlbums(req.body.id as string[])
				.then(() => {
					res.status(200).send(success(true));
				})
				.catch((err) => {
					logger.error(err);
					res.status(err.statusCode).send(err.body.error);
				});
			break;
		default:
			// TODO Error handle
			res.sendStatus(400);
			break;
	}
});

router.get('/following', (req: Request, res: Response) => {
	spotify
		.containsMySavedAlbums([req.query.id as string])
		.then((data) => {
			res.status(200).send(containsSavedAlbums([req.query.id as string], data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
