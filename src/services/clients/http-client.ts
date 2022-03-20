import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8079/',
    headers: {
        'Content-type': 'application/json'
    }
});
