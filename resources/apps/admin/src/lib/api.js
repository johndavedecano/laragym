import { PUBLIC_API_URL } from '$env/static/public';

import axios from 'axios';

export default axios.create({
	baseURL: PUBLIC_API_URL
});
