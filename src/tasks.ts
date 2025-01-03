const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

// create type/interface
interface Task {
  description: string;
  isCompleted: boolean;
}

// function to load task from storage
const loadTask = (): Task[] => {
  const storedTasks = localStorage?.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// function to add task
const addTask = (task: Task): void => {
  tasks.push(task);
};

// function to render tasks
const renderTask = (task: Task): void => {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;

  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  // toggle checkbox
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    alert(
      `Task ${task.description}: ${
        task.isCompleted ? "✅ Completed" : "❌ Unfinished"
      }`
    );
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
};

// function to update localeìstorage
const updateStorage = (): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// -------------------------------
// define Task state and render task if there's an existing data from the local storage
const tasks: Task[] = loadTask();

tasks.map((task) => {
  renderTask(task);
});

// function to create tasks
function createTask(e: SubmitEvent): void {
  e.preventDefault();
  const taskDescription = formInput?.value;

  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };

    addTask(task);
    renderTask(task);
    updateStorage();

    formInput.value = "";
    return;
  }

  alert("Please enter a task description");
}

// Event listener to submit tasks
taskForm?.addEventListener("submit", createTask);
