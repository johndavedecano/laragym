// @ts-nocheck
import { PUBLIC_API_URL } from '$env/static/public';

export const getAvatarUrl = (avatar) => {
	return PUBLIC_API_URL + avatar;
};
