import { Request, Response, Router } from 'express';
import { spotify } from '../../app';
import { me } from './utility';

const router: Router = Router();

router.get('/me', (_req: Request, res: Response) => {
	spotify
		.getMe()
		.then((data) => {
			res.status(200).send(me(data.body));
		})
		.catch((err) => {
			res.status(err.statusCode).send(err.body.error);
		});
});

export default router;
