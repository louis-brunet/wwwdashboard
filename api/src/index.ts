import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import db from "./db";

dotenv.config();

if (!process.env.PORT) {
  console.error('Missing PORT environment variable!');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: '*',
    //[
    //    'http://localhost:5173', 
    //    'http://129.151.226.58', 
    //    'https://129.151.226.58'
    //]
}));

process.on('SIGINT', function() {
   db.close(function(err: Error | null) {
     process.exit(err ? 1 : 0);
   });
});


async function getAllTodos(req: Request, res: Response): Promise<void> {
    console.log(`GET ${req.path} from ${ req.headers.origin }`);
    res.json(await db.selectTodos(req.params.uid));
}

async function postTodo(req: Request, res: Response): Promise<void> {
    const { uid } = req.params;
    const { todo } = req.body;
    console.log(`POST ${ req.path } from ${ req.headers.origin } : `, req.body);

    if (!todo) {
        res.status(400).send({ message: "Need a todo item" });
        return;
    }
    if (!uid|| !todo.title || !todo.content || !todo.date) {
        res.status(400).send({ message: "Missing todo attributes" });
        return;
    } 
    const dbRes = await db.insertTodo({...todo, uid});
    
    res.json(dbRes);
}

async function deleteTodo(req: Request, res: Response): Promise<void> {
    const { uid, todoId } = req.params;

    console.log(`DELETE ${req.path}`);

    await db.deleteTodo(uid, parseInt(todoId));
    res.status(204).send();
}

function getApiTest(req: Request, res: Response): void {
  console.log(`GET ${req.path} -- API test`);
  res.json({
    testMsg: "API test message"
  });
}

app.get('/', getApiTest);
app.get('/todo/:uid', getAllTodos);
app.post('/todo/:uid', postTodo);
app.delete('/todo/:uid/:todoId', deleteTodo);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
})
