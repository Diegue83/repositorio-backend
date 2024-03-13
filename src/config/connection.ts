import mysql from 'promise-mysql';


const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'apliweb'
});

export default {
    keys: {
        secret:')(/&%$webintegral$#&/%'
    },
    database: pool
};
