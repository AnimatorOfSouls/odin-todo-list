"use strict";

import "../style.styl";
import { mdiCheckboxBlankCircleOutline, mdiPencilOutline, mdiEyeOutline } from "@mdi/js";
import { createSvg, sidebarButtonSelectHandler } from "./common.js";

const task = (title, description, dueDate, priority) => {
  const display = () => {
    const task = document.createElement("div");
    task.classList.add("task");

    let leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    let button = document.createElement("button");
    button.classList.add("complete-task");
    button.appendChild(createSvg(24, "#9C9C9C", mdiCheckboxBlankCircleOutline));
    leftDiv.appendChild(button);

    let name = document.createElement("p");
    name.innerText = title;
    leftDiv.appendChild(name);
    task.appendChild(leftDiv);

    let rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    let details = document.createElement("button");
    details.classList.add("view-task-details");
    details.appendChild(createSvg(24, "#9C9C9C", mdiEyeOutline))
    details.addEventListener("click", (e) => {
      console.log(e.target.closest(".task").querySelector("p").innerText);
    });
    rightDiv.appendChild(details);

    let edit = document.createElement("button");
    edit.classList.add("edit-task");
    edit.appendChild(createSvg(24, "#9C9C9C", mdiPencilOutline))
    edit.addEventListener("click", (e) => {
      console.log(e.target.closest(".edit-task"));
    });
    rightDiv.appendChild(edit);
    task.appendChild(rightDiv);
    
    document.querySelector(".tasks").append(task);
  }

  const displayCard = () => {
    const task = document.createElement("div");
    const t = document.createElement("h2");
    t.classList.add("title");
    t.innerText = title;
    task.appendChild(t);

    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.innerText = description;
    task.appendChild(desc);

    const due = document.createElement("p");
    due.classList.add("due-date");
    due.innerText = dueDate;
    task.appendChild(due);

    const p = document.createElement("p");
    p.classList.add("priority");
    p.innerText = priority;
    task.appendChild(p);

    //document.querySelector(".tasks").appendChild(task);
  }

  return { display, displayCard }
}

const project = (name) => {
  let _tasks = [];

  const getName = () => {
    return name;
  }

  const displayTask = (task) => {
    if (document.querySelector(".tasks").childElementCount > 0) {
      document.querySelector(".tasks").appendChild(document.createElement("hr"));
    }
    task.display();
  }

  const addTask = (title, description, dueDate, priority) => {
    const t = task(title, description, dueDate, priority);
    _tasks.push(t);
    displayTask(t);
  }

  const removeTask = (task) => {
    _tasks = _tasks.filter(t => t !== task);
  }

  const getTasks = () => {
    return Array.from(_tasks);
  }

  return { getName, displayTask, addTask, removeTask, getTasks }
}

const projects = (() => {
  const _projects = [];

  const _displayProjectButton = (project) => {
    const list = document.querySelector(".project-buttons");

    const button = document.createElement("button");
    button.classList.add("project");
    button.innerText = project.getName();
    button.addEventListener("click", (e) => {
      displayProject(project);
      sidebarButtonSelectHandler(e.target);
    });

    list.insertBefore(button, document.querySelector(".add-project"));
  }

  const createProject = (name) => {
    const proj = project(name)
    _projects.push(proj);
    _displayProjectButton(proj);
  }

  const displayProject = (project) => {
    console.log(project.getName());
    document.querySelector("h1.project-name").innerText = project.getName();
    document.querySelector(".tasks").replaceChildren();
    for (let task of project.getTasks()) {
      if (task != null) {
        project.displayTask(task);
      }
    }
  }

  const getProject = (name) => {
    return _projects.filter(p => name === p.getName())[0];
  }

  _projects.push(project("Inbox"));

  return { createProject, getProject, displayProject }
})();


export { projects }