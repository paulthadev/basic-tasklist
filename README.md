## Install

```sh
npm create vite@latest typescript -- --template vanilla-ts
```

## Tasks - Setup

- create src/tasks.ts
- Add task.ts script in index.html
- optional : change html snippet in main.ts
- optional css
  - copy from final or end of the README

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="stylesheet" href="src/tasks.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic Task App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
    <script type="module" src="/src/tasks.ts"></script>
  </body>
</html>
```

## Tasks - Part 1 (tasks.ts)

```ts
const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

// task type
type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = [];
```

## Tasks - Part 2 (tasks.ts)

```ts
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // add task to list
    // render tasks
    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});
```

- event gotcha

```ts
function createTask(event: SubmitEvent) {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // add task to list
    // render tasks
    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
}

taskForm?.addEventListener("submit", createTask);
```

## Tasks - Part 3 (tasks.ts)

```ts
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // add task to list
    addTask(task);
    // render tasks

    // update local storage

    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});

function addTask(task: Task): void {
  tasks.push(task);
  // console.log(tasks);
}
```

## Tasks - Part 4 (tasks.ts)

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  taskListElement?.appendChild(taskElement);
}
```

```ts
// add task to list
addTask(task);
// render task
renderTask(task);
```

## Tasks - Part 5 (tasks.ts)

```ts
// Retrieve tasks from localStorage
const tasks: Task[] = loadTasks();

// Load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// tasks.forEach((task) => renderTask(task));
tasks.forEach(renderTask);

// Update tasks in localStorage
function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

```ts
// add task to list
addTask(task);
// render task
renderTask(task);
// update local storage
updateStorage();
```

## Tasks - Part 6 (tasks.ts)

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}
```

## Tasks - Part 7 (tasks.ts)

```ts
function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;
  // toggle checkbox
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}
```

## Tasks - CSS (style.css)

tasks.css

```css
/* ============= GLOBAL CSS =============== */

*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

:root {
  /* colors */
  --primary-500: #645cff;
  --primary-700: #3c3799;
  --white: #fff;
  --background-color: var(--white);
  --text-color: #222;

  /* shadow */
  --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  --border-radius: 0.25rem;
  --letter-spacing: 1px;
  --transition: 0.3s ease-in-out all;
}

body {
  background: var(--background-color);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  line-height: 1;
  color: var(--text-color);
}

main {
  padding: 5rem 0;
  min-height: 100vh;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
}

/* title */
h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 100px;
}

.form-input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  background: #f5f5f5;
  border: 1px solid #e2e8f0;
}

.btn {
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  letter-spacing: var(--letter-spacing);
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
}

.btn:hover {
  background: var(--primary-700);
  box-shadow: var(--shadow-3);
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.5rem;
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
}
```
