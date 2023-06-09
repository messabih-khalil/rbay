import type { CreateItemAttrs } from '$services/types';
import { DateTime } from 'luxon';

export const serialize = (attrs: { [key: string]: any }) => {
	return {
		...attrs,
		createdAt: attrs.createdAt.toMillis(),
		ending: attrs.endingAt.toMillis()
	};
};

export const deserialize = (attrs: { [key: string]: any }) => {
	return {
		...attrs,
		createdAt: DateTime.fromMillis(parseInt(attrs.createdAt)),
		views: parseInt(attrs.view),
		likes: parseInt(attrs.likes),
		bids: parseInt(attrs.bids),
		price: parseFloat(attrs.price),
		endingAt: DateTime.fromMillis(parseInt(attrs.endingAt))
	};
};
