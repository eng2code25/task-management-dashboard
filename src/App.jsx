import "./App.css";

function App() {
  return (
    <section>
      <h2>Task Management Dashboard</h2>
      <div>
        <button>+Add Tasks</button>
      </div>
      <form>
        <div className="task-editor-container">
          <div className="task-editor">
            <textarea
              placeholder="Write task here..."
              className="editor"
            ></textarea>
          </div>
          <div className="task-condition">
            <div className="task-status">
              <select>
                <option>Not complete</option>
                <option>In progress</option>
                <option>Complete</option>
              </select>
            </div>
            <div className="task-priority">
              <select>
                <option>Urgent</option>
                <option>Not Urgent</option>
              </select>
            </div>
            <div className="task-due">
              <input type="datetime-local"></input>
            </div>
          </div>
          <div className="task-action">
            <div>
              <button>Save</button>
            </div>
            <div>
              <button>Clear</button>
            </div>
          </div>
        </div>
      </form>
      <section className="task-summary">
        <h3>Task Summary</h3>
        <div>
          <ul>
            <li>
              {/*Dummy list reference*/}
              <span>Task Name</span>
              <span>Status</span>
              <span>Priority</span>
              <span>Due Date</span>
              <span>Mark complete</span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default App;
