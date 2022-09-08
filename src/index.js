"use strict";

import "./style.styl";
import { projects } from "./scripts/tasks.js";
import setupPage from "./scripts/setup.js";


setupPage();

// adding example tasks
const inbox = projects.getProject("Inbox");
inbox.addTask("Example task 1", "Description of example task 1", "", "");
inbox.addTask("Example task 2", "Description of example task 2", "", "");
