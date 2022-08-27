"use strict";

import "./style.css";
import { mdiMenu, mdiHome, mdiPlus, mdiTrayFull, mdiCalendarTodayOutline, mdiChevronRight, mdiCheckboxBlankCircleOutline } from "@mdi/js";

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
    const addTaskButton = document.querySelector(".add-task");
    addTaskButton.append(createSvg(24, "white", mdiPlus));
  }
  
  function sidebarButtonSelectHandler(button) {
    document.querySelector(".sidebar").querySelector(".selected").classList.remove("selected");
    button.classList.add("selected");
  }
  
  function setupSidebar() {
    const inboxButton = document.querySelector(".inbox");
    inboxButton.prepend(createSvg(24, "#246FE0", mdiTrayFull));
    inboxButton.addEventListener("click", (e) => sidebarButtonSelectHandler(e.target));
  
    const todayButton = document.querySelector(".today");
    todayButton.prepend(createSvg(24, "#058527", mdiCalendarTodayOutline));
    todayButton.addEventListener("click", (e) => sidebarButtonSelectHandler(e.target));
  
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
      
    });
  }

  setupNavbar();
  setupSidebar();
}

const projects = (() => {
  const _projects = [];

  const _project = (name) => {
    let _tasks = [];

    const _task = (title, description, dueDate, priority) => {
      const display = () => {
        const task = document.createElement("div");
        task.classList.add("task");
    
        let button = document.createElement("button");
        button.appendChild(createSvg(24, "#9C9C9C", mdiCheckboxBlankCircleOutline));
        task.appendChild(button);
    
        let name = document.createElement("p");
        name.innerText = title;
        task.appendChild(name);
        
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
  
    const addTask = (title, description, dueDate, priority) => {
      const task = _task(title, description, dueDate, priority);
      _tasks.push(task);
      if (_tasks.length > 1) {
        document.querySelector(".tasks").appendChild(document.createElement("hr"));
      }
      task.display();
    }
  
    const removeTask = (task) => {
      _tasks = _tasks.filter(t => t !== task);
    }
  
    return { addTask, removeTask, getName }
  }

  const createProject = (name) => {
    _projects.push(_project(name));
  }

  const getProject = (name) => {
    return _projects.filter(p => name === p.getName());
  }

  return { createProject, getProject }
})();



setupPage();
projects.createProject("Inbox");

const inbox = projects.getProject("Inbox")[0];
inbox.addTask("Example task 1", "Description of example task 1", "", "");
inbox.addTask("Example task 2", "Description of example task 2", "", "");
