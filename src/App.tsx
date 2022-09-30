import {
  CheckCircle,
  Circle,
  Notepad,
  PlusCircle,
  Rocket,
  Trash,
} from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./App.module.css";
import "./global.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      content:
        "01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam assumenda soluta, rem iure totam accusantium quae eligendi ut aperiam quia eaque alias possimus distinctio minus nisi cupiditate vel, ab pariatur!",
      status: true,
    },
    {
      id: 2,
      content:
        "02 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam assumenda soluta, rem iure totam accusantium quae eligendi ut aperiam quia eaque alias possimus distinctio minus nisi cupiditate vel, ab pariatur!",
      status: false,
    },
  ]);
  const [tasksCreated, setTasksCreated] = useState(0);
  const [tasksClosed, setTasksClosed] = useState(0);
  const [newTask, setNewTask] = useState("");

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateTask() {
    const newId = tasks.length + 1;
    const newTaskCreated = {
      id: newId,
      content: newTask,
      status: false,
    };
    setTasks([...tasks, newTaskCreated]);
    setTasksCreated(tasks.length + 1);
    setNewTask("");
  }

  function handleChangeTaskStatus(taskId: number) {
    const tasksNotChange: any = tasks.filter((task) => task.id !== taskId);
    tasks.find((task) => {
      if (task.id === taskId) {
        task.status = !task.status;
        setTasks([...tasksNotChange, task].sort((a, b) => a.id - b.id));
      }
    });
  }

  function handleDeleteTask(taskId: number) {
    const tasksNotDeleteds = tasks.filter((task) => task.id !== taskId);

    setTasks([...tasksNotDeleteds]);
  }

  useEffect(() => {
    setTasksCreated(tasks.length);
    const done = tasks.filter((task) => task.status === true);
    setTasksClosed(done.length);
  }, [tasks]);

  return (
    <div>
      <header className={styles.cover}>
        <p className={styles.logo}>
          <Rocket size={45} className={styles.icon} />
          todo
        </p>
      </header>
      <main className={styles.wrapper}>
        <div className={styles.createTask}>
          <input
            value={newTask}
            onChange={handleNewTask}
            type="text"
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={handleCreateTask}>
            Criar
            <PlusCircle size={15} className={styles.buttonIcon} />
          </button>
        </div>
        <div className={styles.tasks}>
          <div className={styles.countTasks}>
            <p>Tarefas criadas </p>
            <span>{tasksCreated}</span>
          </div>
          <div className={styles.countTasks}>
            <p>Tarefas concluídas</p>
            <span className={styles.span}>
              {tasksClosed} de {tasks.length}
            </span>
          </div>
        </div>
        <div className={styles.tasksContent}>
          {tasks ? (
            tasks.map((task) => {
              return (
                <div key={task.id} className={styles.hasContent}>
                  <div className={styles.card}>
                    <div>
                      {task.status === false ? (
                        <a
                          onClick={() => handleChangeTaskStatus(task.id)}
                          className={styles.toDo}
                        ></a>
                      ) : (
                        <a
                          className={styles.done}
                          onClick={() => handleChangeTaskStatus(task.id)}
                        ></a>
                      )}
                      <label>{task.content}</label>
                    </div>
                    <div className={styles.deleteButton}>
                      <Trash onClick={() => handleDeleteTask(task.id)} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.hasNoContent}>
              <Notepad className={styles.tasksIcon} size={50} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie Tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </main>
      <footer>
        <div>Desafio 01</div>
      </footer>
    </div>
  );
}

export default App;
