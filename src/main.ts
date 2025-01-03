import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <main>
      <h2>Tasks</h2>
      <form class="form">
        <input
          type="text"
          class="form-input"
          placeholder="Add task description"
        />
        <button type="submit" class="btn">add task</button>
      </form>
      <ul class="list"></ul>
    </main>
  </div>
`;
