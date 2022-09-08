"use strict";

import "./style.css";
import { mdiMenu, mdiHome, mdiPlus, mdiTrayFull, mdiCalendarTodayOutline, mdiChevronRight, mdiCheckboxBlankCircleOutline, mdiPen, mdiPencilOutline, mdiArmFlex } from "@mdi/js";

function createSvg(size, colour, svgPath) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.setAttribute("width", `${size}px`);
  svg.setAttribute("height", `${size}px`);
  svg.setAttribute("viewBox", "0 0 24 24");
  path.setAttribute("d", svgPath);
  path.setAttribute("fill", colour);
  svg.appendChild(path);

  return svg
}

function sidebarButtonSelectHandler(button) {
  document.querySelector(".sidebar").querySelector(".selected").classList.remove("selected");
  button.classList.add("selected");
}

function setupPage() {
  function setupNavbar() {
    const sidebarButton = document.querySelector(".sidebar-toggle");
    sidebarButton.append(createSvg(24, "white", mdiMenu));
    sidebarButton.addEventListener("click", (e) => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar.classList.contains("hidden")) {
        sidebar.classList.remove("hidden")
      } else {
        sidebar.classList.add("hidden")
      }
    });

    const homeButton = document.querySelector(".home");
    homeButton.append(createSvg(24, "white", mdiHome));
    homeButton.addEventListener("click", (e) => {
      projects.displayProject(projects.getProject("Inbox"));
    });

    const addTaskButton = document.querySelector(".add-task");
    addTaskButton.append(createSvg(24, "white", mdiPlus));
    addTaskButton.addEventListener("click", (e) => {
      document.querySelector(".new-task-form").classList.remove("hidden");
    });
  }
  
  function setupSidebar() {
    const inboxButton = document.querySelector(".inbox");
    inboxButton.prepend(createSvg(24, "#246FE0", mdiTrayFull));
    inboxButton.addEventListener("click", (e) => {
      sidebarButtonSelectHandler(e.target);
      projects.displayProject(projects.getProject("Inbox"));
    });
  
    const todayButton = document.querySelector(".today");
    todayButton.prepend(createSvg(24, "#058527", mdiCalendarTodayOutline));
    todayButton.addEventListener("click", (e) => {
      sidebarButtonSelectHandler(e.target);
    });
  
    const projectsButton = document.querySelector("button.projects");
    projectsButton.prepend(createSvg(24, "#3D3D3D", mdiChevronRight));
    projectsButton.addEventListener("click", (e) => {
      const projects = document.querySelector("div.projects-list");
      if (projects.classList.contains("open")) {
        projects.classList.remove("open");
        projects.classList.add("closed");
      } else {
        projects.classList.remove("closed");
        projects.classList.add("open");
      }
    });
  
    const addProjectButton = document.querySelector("button.add-project");
    addProjectButton.prepend(createSvg(24, "#3D3D3D", mdiPlus));
    addProjectButton.addEventListener("click", (e) => {
      let projectName = prompt("What's the name of your new project?");
      while (projectName === "") {
        projectName = prompt("Please insert a project name.\nWhat's the name of your new project?");
      }
      if (projectName === null) return;
      projects.createProject(projectName);
    });
  }

  

  function setupTaskInputForm() {
    function checkAddTaskFormValid(form) {
      if (form.querySelector("#title").value == "") return false;
      if (form.querySelector("#priority").value == "") return false;
      if (form.querySelector("#project").value == "Select Project") return false;
      return true;
    }
  
    function addTaskFormHandler(form) {
      const isValid = checkAddTaskFormValid(form);
      if (isValid) {
        const title = form.querySelector("#title").value;
        const description = form.querySelector("#description").value;
        const dueDate = form.querySelector("#dueDate").value;
        const priority = form.querySelector("#priority").value;
        const project = form.querySelector("#project").value;
        projects.getProject(project).addTask(title, description, dueDate, priority);
  
        document.querySelector(".new-task-form").classList.add("hidden");
        resetForm(form);
      }
    }

    function resetForm(form) {
      document.querySelector(".submit-new-task-form").classList.add("disabled");
      form.reset();
    }

    const formInputButton = document.querySelector(".submit-new-task-form");
    formInputButton.addEventListener("click", (e) => {
      addTaskFormHandler(e.target.closest(".new-task-form").querySelector("form"));
    });

    const formCancelButton = document.querySelector(".new-task-form").querySelector(".cancel");
    formCancelButton.addEventListener("click", (e) => {
      const formDiv = document.querySelector(".new-task-form");
      formDiv.classList.add("hidden");
      resetForm(formDiv.querySelector("form"));
    });

    const form = document.querySelector(".new-task-form").querySelector("form");
    form.addEventListener("input", () => {
      const isValid = checkAddTaskFormValid(form);
      console.log()
      if (isValid) {
        document.querySelector(".submit-new-task-form").classList.remove("disabled");
      } else {
        document.querySelector(".submit-new-task-form").classList.add("disabled");
      }
    });

    
  }

  setupNavbar();
  setupSidebar();
  setupTaskInputForm();
}

const projects = (() => {
  const _projects = [];

  const _project = (name) => {
    let _tasks = [];

    const _task = (title, description, dueDate, priority) => {
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

        let edit = document.createElement("button");
        edit.classList.add("edit-task");
        edit.appendChild(createSvg(24, "#9C9C9C", mdiPencilOutline))
        edit.addEventListener("click", (e) => {
          console.log(e.target.closest(".edit-task"));
        });
        task.appendChild(edit);
        
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
      const task = _task(title, description, dueDate, priority);
      _tasks.push(task);
      displayTask(task);
    }

    const removeTask = (task) => {
      _tasks = _tasks.filter(t => t !== task);
    }

    const getTasks = () => {
      return Array.from(_tasks);
    }
  
    return { getName, displayTask, addTask, removeTask, getTasks }
  }

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
    const project = _project(name)
    _projects.push(project);
    _displayProjectButton(project);
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

  _projects.push(_project("Inbox"));

  return { createProject, getProject, displayProject }
})();



setupPage();

const inbox = projects.getProject("Inbox");
inbox.addTask("Example task 1", "Description of example task 1", "", "");
inbox.addTask("Example task 2", "Description of example task 2", "", "");
