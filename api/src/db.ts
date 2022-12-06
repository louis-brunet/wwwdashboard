import mariadb, { PoolConfig } from "mariadb";
import * as dotenv from "dotenv";
dotenv.config();

interface TodoResponse {
  uid: string;
  todoId: number;
  title: string;
  content: string;
  date: string;
}

interface TodoPostRequest {
  uid: string;
  title: string;
  content: string;
  date: string;
}

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD 
    || !process.env.DB_NAME) {// || !process.env.DB_PORT) {
  console.error('Missing DB environment variables!');
  process.exit(1);
}

const todoTable = 'todo';

const poolConfig: PoolConfig = {
    host: process.env.DB_HOST,
    //port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
}
const connPool = mariadb.createPool(poolConfig);

async function selectTodos(uid: string) {
  let conn;
  try {
    conn = await connPool.getConnection();
    const rows = await conn.query(`SELECT * FROM ${todoTable} WHERE uid = ?;`, uid);
    return rows;    
    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    console.error('db.selectTodos(): sql error', err);
  } finally {
	  if (conn) conn.end();
  }
}

async function insertTodo(todo: TodoPostRequest): Promise<TodoResponse | null> {
  let conn;
  try {
    conn = await connPool.getConnection();
    const res = await conn.query(
        `INSERT INTO ${todoTable} (uid, title, content, date) VALUES (?, ?, ?, ?);`,
        [todo.uid, todo.title, todo.content, todo.date]
    );
    
    return { ...todo, todoId: Number(res.insertId) }; 
  } catch (err) {
    console.error('db.insertTodo(): sql error', err);
    return null;
  } finally {
	  if (conn) conn.release();;
  }
}

async function deleteTodo(uid: string, todoId: number): Promise<void> {
    let conn;
    try {
        conn = await connPool.getConnection();
        await conn.query(
            `DELETE FROM ${todoTable} WHERE uid = ? AND todoId = ?;`,
            [uid, todoId]
        );
        
        return; 
    } catch (err) {
        console.error('db.insertTodo(): sql error', err);
        return;
    } finally {
        if (conn) conn.release();;
    }
}

async function close(errCallback: Function) {
    try {
        await connPool.end();
        errCallback(null);
    } catch (e) {
        errCallback(e);
    }
}

export default { selectTodos, close, insertTodo, deleteTodo };
