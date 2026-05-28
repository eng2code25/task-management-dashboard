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

  {
    /*Edit event handler*/
  }
  const editFunction = (editIndex) => {
    if (editorInput !== "") {
      const editOverwrite = confirm(
        "You're about to overwrite an existing note. Please save your notes or click OK to overwrite and proceed",
      );

      {
        /*guard clause to listen to the user*/
      }
      if (!editOverwrite) {
        return;
      }
    }

    const targetTask = taskSummary[editIndex];
    setEditorInput(targetTask.name);
    setTaskStatus(targetTask.status);
    setPriority(targetTask.priority);
    setDueDate(targetTask.dueDate || "");

    {
      /*Drop down the editor*/
    }
    setTaskInput(true);

    {
      /*remove the selected saved note*/
    }
    const updatedList = taskSummary.filter(
      (item, index) => index !== editIndex,
    );
    setTaskSummary(updatedList);
  };

  {
    /*dynamic filtering search event handler*/
  }

  const [searchInput, setSearchInput] = useState("");

  {
    /*State management filtering for status*/
  }
  const [statusFilter, setStatusFilter] = useState("All Status");

  {
    /*State management filtering for priority*/
  }
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const filteredTask = taskSummary.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchInput.toLowerCase().trim());

    const matchStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    const matchPriority =
      priorityFilter === "All Priority" || item.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  {
    /*Math stats count event handler*/
  }
  const totalTasks = taskSummary.length;

  const urgentTasks = taskSummary.filter(
    (item) => item.priority === "Urgent",
  ).length;

  const inProgressTasks = taskSummary.filter(
    (item) => item.status === "In Progress",
  ).length;

  const notCompleteTasks = taskSummary.filter(
    (item) => item.status === "Not Complete",
  ).length;

  const dueTasksCount = taskSummary.filter((item) => {
    if (!item.dueDate || item.status == "Complete") return false;
    const currentDateTime = new Date();
    const taskDueDate = new Date(item.dueDate);
    return taskDueDate < currentDateTime;
  }).length;

  {
    /*Event handler for due date*/
  }

  const isOverdue = (item) => {
    {
      /*exclude overdue event if there is no due date or if task is marked as complete*/
    }
    if (!item.dueDate || item.status == "Complete") return false;

    const currentDateTime = new Date();
    const taskDueDate = new Date(item.dueDate);
    return taskDueDate < currentDateTime;
  };

  {
    /*Weather API integration state management*/
  }
  {
    /*Data fetched from weather API*/
  }
  const [weatherData, setWeatherData] = useState(null);

  {
    /*Data loading awaiting for reply*/
  }
  const [weatherLoading, setWeatherLoading] = useState(true);

  {
    /*State,city input from user*/
  }
  const [city, setCity] = useState("Kuala Lumpur");

  {
    /*event handler for weather API*/
  }

  const fetchWeather = async () => {
    try {
      setWeatherLoading(true);
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await response.json();

      setWeatherData(data);
      setWeatherLoading(false);
    } catch (error) {
      console.error("Weather API failed to load: ", error);
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section className="container">
      <div className="dashboard">
        <div className="add-task-dashboard">
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
                    <button
                      onClick={(e) => {
                        (e.preventDefault(), setEditorInput(""));
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="weather-container">
          <div>
            <h4>{city}</h4>
            {weatherLoading ? (
              <p>Loading real-time weather...</p>
            ) : weatherData ? (
              <div className="weather-info">
                <p>
                  <strong>
                    Temperature: {weatherData.current_condition[0].temp_C}°C
                  </strong>
                </p>
                <p>
                  <strong>
                    Condition:{" "}
                    {weatherData.current_condition[0].weatherDesc[0].value}
                  </strong>
                </p>
                <p>
                  <strong>
                    Humidity: {weatherData.current_condition[0].humidity}%
                  </strong>
                </p>
              </div>
            ) : (
              <p>Could not retrieve weather data.</p>
            )}
          </div>
          <div className="nation-weather">
            <select>
              <option></option>
            </select>
          </div>
        </div>
        <section className="task-summary">
          <h3>Task Summary</h3>
          <input
            placeholder="Search Task"
            className="search-task"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <div className="filter-container">
            <label>Filter by: </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Not Complete">Not Complete</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All Priority">All Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="Not Urgent">Not Urgent</option>
              </select>
            </div>
          </div>
          <div className="task-count">
            <div>
              <label>Total Tasks: {totalTasks}</label>
            </div>
            <div>
              <label>Total Urgent: {urgentTasks}</label>
            </div>
            <div>
              <label>Total In Progress: {inProgressTasks}</label>
            </div>
            <div>
              <label>Total Not Complete: {notCompleteTasks}</label>
            </div>
            <div>
              <label style={{ color: "red" }}>
                <strong>Total Due: {dueTasksCount}</strong>
              </label>
            </div>
          </div>
          <div>
            <ul className="task-container">
              {filteredTask.map((item) => {
                const originalIndex = taskSummary.indexOf(item);
                let taskClassName = "single-task";

                if (isOverdue(item)) {
                  taskClassName = "single-task overdue";
                }
                return (
                  <li key={originalIndex} className={taskClassName}>
                    <span>
                      <strong>Task Name:</strong> {item.name}
                    </span>{" "}
                    <br />
                    <span>
                      <strong>Status: </strong>
                      {item.status}
                    </span>{" "}
                    <br />
                    <span>
                      <strong>Priority: </strong>
                      {item.priority}
                    </span>{" "}
                    <br />
                    <span>
                      <strong>Due Date: </strong>
                      {item.dueDate}
                    </span>{" "}
                    <br />
                    <span>
                      <strong>Mark as complete</strong>
                      <input type="checkbox"></input>
                    </span>
                    <div className="button-container">
                      <div>
                        <button onClick={() => deleteFunction(originalIndex)}>
                          Delete
                        </button>
                      </div>
                      <div>
                        <button onClick={() => editFunction(originalIndex)}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
