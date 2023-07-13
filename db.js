//import pool dari library pg
import pkg from "pg";

const { Pool } = pkg; //pool untuk mengelola koneksi ke database PostgreSQL, 
                    //sehingga Anda dapat menggunakan koneksi tersebut untuk menjalankan query atau operasi lain pada database.


//configuration
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "gatherly"
});

// agar bisa digunain di file lain
export default pool;