import userRoutes from './user/routes';
import profileRoutes from './profile/routes';

export { userRoutes, profileRoutes };

export function success(value: boolean) {
	return {
		success: value
	};
}
