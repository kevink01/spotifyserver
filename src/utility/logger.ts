import logger from 'pino';
import pretty from 'pino-pretty';

export const log = logger(
	{
		base: {
			pid: false
		}
	},
	pretty({ colorize: true, translateTime: 'SYS:longTime' })
);
