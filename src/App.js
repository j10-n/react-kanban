import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { stat } from "fs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      priority: "",
      status: "",
      created_by: "",
      assigned_to: "",
      tasks: [
        // {
        //   id: 1,
        //   title: "grab some dino snacks",
        //   body: "What is it? Google it.",
        //   priority: "Medium",
        //   created_by: "justen",
        //   assigned_to: "j10",
        //   status: "inQueue"
        // },
        // {
        //   id: 2,
        //   title: "work on kaaaaaaaanbaaaaaaaaan",
        //   body: "What is it? Google it.",
        //   priority: "High",
        //   created_by: "justen",
        //   assigned_to: "j10",
        //   status: "inProgress"
        // },
        // {
        //   id: 3,
        //   title: "make this page look noice",
        //   body: "What is it? Google it.",
        //   priority: "High",
        //   created_by: "justen",
        //   assigned_to: "j10",
        //   status: "donezo"
        // },
        // {
        //   id: 3,
        //   title: "hit the hay",
        //   body: "What is it? Google it.",
        //   priority: "Low",
        //   created_by: "justen",
        //   assigned_to: "j10",
        //   status: "donezo"
        // }
      ]
    };

    this.getUsers = this.getUsers.bind(this);
    this.getTasks = this.getTasks.bind(this);

    this.getUsers();
    this.getTasks();
  }

  handleSubmit = e => {
    e.preventDefault();
    const tasks = this.state.tasks;
    tasks.push({
      title: this.state.title,
      priority: this.state.priority,
      status: this.state.status,
      created_by: this.state.created_by,
      assigned_to: this.state.assigned_to
    });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  getUsers() {
    fetch("/api/users")
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState({ users: body });
      });
  }

  getTasks() {
    fetch("/api/tasks")
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState({ tasks: body });
      });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div class="app">
        <div class="container">
          <h2>
            IN QUEUE{"  "}
            {"  "}
            {"  "}
            {"  "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 30 27"
            >
              <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
            </svg>
          </h2>
          {tasks
            .filter(task => {
              if (task.status === "inQueue") {
                return task;
              }
            })
            .map(task => (
              <Card
                id={task.id}
                title={task.title}
                body={task.body}
                priority={task.priority}
                status={task.status}
                created_by={task.created_by}
                assigned_to={task.assigned_to}
                delete={this.delete}
                edit={this.edit}
              />
            ))}
        </div>
        <div class="container">
          <h2>
            IN PROGRESS&ensp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 30 27"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </h2>
          {tasks
            .filter(task => {
              if (task.status === "inProgress") {
                return task;
              }
            })
            .map(task => (
              <Card
                id={task.id}
                title={task.title}
                body={task.body}
                priority={task.priority}
                status={task.status}
                created_by={task.created_by}
                assigned_to={task.assigned_to}
                delete={this.delete}
                edit={this.edit}
              />
            ))}
        </div>
        <div class="container">
          <h2>
            DONEZO&ensp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 30 28"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </h2>

          {tasks
            .filter(task => {
              if (task.status === "donezo") {
                return task;
              }
            })
            .map(task => (
              <Card
                id={task.id}
                title={task.title}
                body={task.body}
                priority={task.priority}
                status={task.status}
                created_by={task.created_by}
                assigned_to={task.assigned_to}
                delete={this.delete}
                edit={this.edit}
              />
            ))}
        </div>
        <div class="panel-body">
          <h5>Create a New Task</h5>
          <form onSubmit={this.createTask}>
            Title:
            <br />
            <input type="text" name="title" onChange={this.handleChange} />
            <br />
            Body:
            <br />
            <input type="text" name="body" onChange={this.handleChange} />
            Assigned to:
            <input
              type="text"
              name="assigned_to"
              onChange={this.handleChange}
            />
            <br />
            By:
            <br />
            <input type="text" name="created_by" onChange={this.handleChange} />
            <br />
            Priority:
            <br />
            <select name="priority" onChange={this.handleChange}>
              <option>Select...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <br />
            Status:
            <br />
            <select name="status" onChange={this.handleChange}>
              <option>Select...</option>
              <option value="inQueue">In Queue</option>
              <option value="inProgress">In Progress</option>
              <option value="donezo">Donezo</option>
            </select>
            <br />
            <br />
            <button onClick={this.createTask}>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  createTask = e => {
    let state = this.state;
    console.log(state);
    e.preventDefault();
    const newTask = {
      title: state.title,
      body: state.body,
      priority: state.priority,
      status: state.status,
      created_by: state.created_by,
      assigned_to: state.assigned_to
    };
    const headers = { "Content-Type": "application/json" };
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers
    }).then(res => {
      return fetch("/api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };

  edit = id => {
    console.log("id", id);
    const headers = { "Content-Type": "application/json" };
    let data = { useID: id };
    fetch("/api/tasks/edit", {
      method: "POST",
      body: JSON.stringify(data),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
    // const tasks = this.state.tasks.filter(task => status !== task.status);
    // this.setState({ tasks });
  };

  delete = id => {
    console.log("id", id);
    const headers = { "Content-Type": "application/json" };
    let data = { useID: id };
    fetch("/api/tasks/delete", {
      method: "POST",
      body: JSON.stringify(data),
      headers
    }).then(res => {
      return fetch("api/tasks")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.setState({ tasks: body });
        });
    });
  };
}

function Card(props) {
  console.log(props.status);
  return (
    <div className={props.status}>
      <div class="card">
        <h6>{props.title}</h6>
        {props.body}
        <br />
        Priority: {props.priority}
        <br />
        Assigned to: {props.assigned_to}
        <br />
        By: {props.created_by}
        <button class="btn" onClick={() => props.edit(props.id)}>
          Edit
        </button>
        <button class="btn" onClick={() => props.delete(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
