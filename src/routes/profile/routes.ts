import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { logger } from '../../utility';
import { isFollowing, profile, userPlaylists } from './utility';
import { success } from '..';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	spotify
		.getUser(req.query.id as string)
		.then((data) => {
			res.status(200).send(profile(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.post('/follow', (req: Request, res: Response) => {
	spotify
		.followUsers(req.body.id as string[])
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/following', (req: Request, res: Response) => {
	spotify
		.isFollowingUsers(req.query.id as string[])
		.then((data) => {
			res.status(200).send(isFollowing(req.query.id as string[], data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.get('/playlists', (req: Request, res: Response) => {
	spotify
		.getUserPlaylists(req.query.id as string)
		.then((data) => {
			res.status(200).send(userPlaylists(data.body));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

router.delete('/unfollow', (req: Request, res: Response) => {
	spotify
		.unfollowUsers(req.body.id as string[])
		.then(() => {
			res.status(200).send(success(true));
		})
		.catch((err) => {
			logger.error(err);
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
