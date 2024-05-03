import { API_URL } from '$env/static/private';

import axios from 'axios';

export default axios.create({
	baseURL: API_URL
});
