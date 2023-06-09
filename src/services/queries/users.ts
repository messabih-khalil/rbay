import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userKey } from '../keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(userKey(id));

	return deserilizer(user, id);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();
	await client.hSet(userKey(id), serializer(attrs));

	return id;
};

const serializer = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deserilizer = (user: { [key: string]: string }, userId: string) => {
	return {
		id: userId,
		...user
	};
};
