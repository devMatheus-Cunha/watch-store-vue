import {
    createServer,
    Response
} from 'miragejs';

if (process.env.NODE_ENV === 'development') {
    require('@/miragejs/server').makeServer();
}