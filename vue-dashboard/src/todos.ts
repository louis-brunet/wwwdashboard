//import api from "./api";

export interface Todo {
  uid: string;
  todoId: number;
  title: string;
  content: string;
  date: string;
}

//export async function getTodos(uid: string): Promise<Todo[]> {
//  try {
//    const todos = await api.fetchTodos(uid);
//    console.log(`fetched todos : `, todos.data);

//    return todos.data;
//  } catch (error) {
//    console.error(error);
//    return [];
//  }
//}

/*

User (
    uid INTEGER PRIMARY KEY,
    ... ?
);

CREATE TABLE todo (
    todoId INTEGER AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(128) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(300),
    date VARCHAR(50) NOT NULL
);

INSERT INTO todo (uid, title, content, date) VALUES ('1', 'test todo in mariadb with string uid', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro aut fugiat nulla illum omnis tempore id ipsum natus officia exercitationem', 'date string');
 */
