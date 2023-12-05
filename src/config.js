'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    COOKIE_ENCRYPT_PWD,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    SQL_UTC,
    OKTA_ORG_URL,
    OKTA_CLIENT_ID,
    OKTA_CLIENT_SECRET
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    routes: { cors: true },
    cookiePwd : COOKIE_ENCRYPT_PWD,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,  
        requestTimeout: 60000,
        connectionTimeout: 60000,   
        pool: {
            max: 50,
            min: 0,
            idleTimeoutMillis: 60000 
        },
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: false,
            useUTC: false
        },
        okta: {
            url: OKTA_ORG_URL,
            clientId: OKTA_CLIENT_ID,
            clientSecret: OKTA_CLIENT_SECRET
        }
    }

};

