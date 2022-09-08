"use strict";

import "../style.styl";
import { createSvg, sidebarButtonSelectHandler } from "./common.js";
import { projects } from "./tasks.js";
import { mdiMenu, mdiHome, mdiPlus, mdiTrayFull, mdiCalendarTodayOutline, mdiChevronRight } from "@mdi/js";

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

export default function setupPage() {
  setupNavbar();
  setupSidebar();
  setupTaskInputForm();
}