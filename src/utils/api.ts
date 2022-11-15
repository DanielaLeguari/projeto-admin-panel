import axios from "axios";

const url = 'http://vemser-dbc.dbccompany.com.br:39000/vemser/dados-pessoais-api';

const config = {
    headers: {
    }
}

export const api = axios.create({
   baseURL:url,
   headers:config.headers
})