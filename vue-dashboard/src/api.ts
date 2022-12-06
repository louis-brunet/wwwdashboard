import axios from "axios";
import type { Todo } from "./todos";

console.log(`todo_api : ${import.meta.env.VITE_API_URL}`);

async function getTodos(uid: string) {
  //: Promise<Todo[]> {
  const axiosRes = await axios.get<Todo[]>(
    `${import.meta.env.VITE_API_URL}/${uid}`
  );
  return axiosRes.data;
}

async function postTodo(
  uid: string,
  title: string,
  content: string,
  date: string
): Promise<Todo> {
  const axiosRes = await axios.post(`${import.meta.env.VITE_API_URL}/${uid}`, {
    todo: {
      title,
      content,
      date,
    },
  });

  return axiosRes.data;
}

export default { getTodos, postTodo };
