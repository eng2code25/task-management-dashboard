import { useEffect, useState } from "react";
import "./App.css";

function App() {
  {
    /*pop up and down editor*/
  }
  const [taskInput, setTaskInput] = useState(false);

  {
    /*Editor content clipboard*/
  }
  const [editorInput, setEditorInput] = useState("");

  {
    /*Task Status clipboard*/
  }
  const [taskStatus, setTaskStatus] = useState("Not Complete");

  {
    /*Priority clipboard*/
  }
  const [priority, setPriority] = useState("Urgent");

  {
    /*Due date clipboard*/
  }
  const [dueDate, setDueDate] = useState("");

  {
    /*Task summary and persistence function*/
  }
  const [taskSummary, setTaskSummary] = useState(() => {
    const saveTask = JSON.parse(localStorage.getItem("task"));
    return saveTask ? saveTask : [];
  });

  {
    /*writing and storing data into local storage*/
  }
  useEffect(() => {
    const savedTask = localStorage.setItem("task", JSON.stringify(taskSummary));
  }, [taskSummary]);

  {
    /*Delete function/Event handler*/
  }
  const deleteFunction = (deleteIndex) => {
    const userChoice = confirm(
      "You're about to delete this note. Proceed or go back?",
    );

    if (userChoice) {
      const updatedList = taskSummary.filter(
        (item, index) => index !== deleteIndex,
      );
      setTaskSummary(updatedList);
    }
  };

  {/*Edit event handler*/}
  const editFunction = (editIndex) => {
    (item, index) =>  
  }

  return (
    <section>
      <h2>Task Management Dashboard</h2>
      <div>
        <button onClick={() => setTaskInput(!taskInput)}>+Add Tasks</button>
      </div>
      <form>
        {taskInput && (
          <div className="task-editor-container">
            <div className="task-editor">
              <textarea
                placeholder="Write task here..."
                className="editor"
                value={editorInput}
                onChange={(e) => setEditorInput(e.target.value)}
              ></textarea>
            </div>
            <div className="task-condition">
              <div className="task-status">
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value="Not Complete">Not complete</option>
                  <option value="In Progress">In progress</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div className="task-priority">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Not Urgent">Not Urgent</option>
                </select>
              </div>
              <div className="task-due">
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="task-action">
              <div>
                <button
                  onClick={(e) => {
                    (e.preventDefault(),
                      setTaskSummary([
                        ...taskSummary,
                        {
                          name: editorInput,
                          status: taskStatus,
                          priority: priority,
                          dueDate: dueDate,
                        },
                      ]),
                      setEditorInput(""));
                  }}
                >
                  Save
                </button>
              </div>
              <div>
                <button onClick={(e) => e.preventDefault()}>Clear</button>
              </div>
            </div>
          </div>
        )}
      </form>
      <section className="task-summary">
        <h3>Task Summary</h3>
        <div>
          <ul>
            {taskSummary.map((item, index) => (
              <li key={index} className="single-task">
                <span>Task Name: {item.name}</span> <br />
                <span>Status: {item.status}</span> <br />
                <span>Priority: {item.priority}</span> <br />
                <span>Due Date: {item.dueDate}</span> <br />
                <span>
                  Mark as complete
                  <input type="checkbox"></input>
                </span>
                <div className="button-container">
                  <div>
                    <button onClick={() => deleteFunction(index)}>
                      Delete
                    </button>
                  </div>
                  <div>
                    <button onClick={() => editFunction(index)}>Edit</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

export default App;
