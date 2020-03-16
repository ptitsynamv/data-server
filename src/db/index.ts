import keys from "../config";
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: keys.mysql.host,
    user: keys.mysql.user,
    password: keys.mysql.password,
    database: keys.mysql.user,
});

connection.connect(null, function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('MySQL connected as id ' + connection.threadId);
});

export default connection;
