import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://api.datomicos.team/v1/', 
    //baseURL: 'http://localhost:5080/v1'
});

export default clienteAxios; 