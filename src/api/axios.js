import axios from 'axios';

export default axios.create({
	baseURL: 'http://kanban.test/api/',
});
