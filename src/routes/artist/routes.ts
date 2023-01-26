import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { artist, artistAlbums, artistTopTracks, relatedArtists } from './utility';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	spotify
		.getArtist(req.query.id as string)
		.then((data) => {
			res.status(200).send(artist(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/albums', (req: Request, res: Response) => {
	spotify
		.getArtistAlbums(req.query.id as string)
		.then((data) => {
			res.status(200).send(artistAlbums(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/related', (req: Request, res: Response) => {
	spotify
		.getArtistRelatedArtists(req.query.id as string)
		.then((data) => {
			res.status(200).send(relatedArtists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/tracks', (req: Request, res: Response) => {
	spotify
		.getArtistTopTracks(req.query.id as string, req.query.country as string)
		.then((data) => {
			res.status(200).send(artistTopTracks(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
