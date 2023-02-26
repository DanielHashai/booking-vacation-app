import mysql from "mysql";
import appConfig from "./appConfig";



const Connection = mysql.createPool({
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDataBase
})

function execute(sql: string, ...values: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        Connection.query(sql, values, (err, result) => {

            if (err) {
                reject(err)
                return;
            }
            resolve(result);

        })

    });
}
export default {
    execute
}
