import axios from "axios";

const url = 'http://vemser-dbc.dbccompany.com.br:39000/vemser/dados-pessoais-api';

export const api = axios.create({
    url
})