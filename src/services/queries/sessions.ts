import type { Session } from '$services/types';
import { client } from '$services/redis';
import { sessionsKey } from '$services/keys';
import { genId } from '../utils/gen-id';

export const getSession = async (id: string) => {
	const session = await client.hGetAll(sessionsKey(id));
	if (Object.keys(session).length === 0) {
		return null;
	}
	return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
	const id = genId();
	return await client.hSet(sessionsKey(id), {
		username: session.username,
		userId: session.userId
	});
};

const deserialize = (id: string, session: { [key: string]: string }) => {
	return {
		id: id,
		userId: session.id,
		username: session.username
	};
};
