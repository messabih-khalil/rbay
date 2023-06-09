import type { CreateItemAttrs } from '$services/types';
import { serialize, deserialize } from './serialize';
import { client } from '$services/redis';

import { genId } from '$services/utils';
import { itemsKey } from '$services/keys';
export const getItem = async (id: string) => {
	const items = await client.hGetAll(itemsKey(id));

	if (Object.keys(items).length === 0) {
		return null;
	}

	return deserialize(items);
};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs) => {
	const id = genId();

	const serialized = serialize(attrs);

	await client.hSet(itemsKey(id), serialized);

	return id;
};
