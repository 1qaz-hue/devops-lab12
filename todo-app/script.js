// ========================================
// Todo App — JavaScript
// Lab 12 Final Work
// 功能: 添加/删除/完成/过滤/本地存储
// ========================================

let todos = [];
let currentFilter = 'all';

// ---- DOM 引用 ----
const todoInput    = document.getElementById('todoInput');
const todoList     = document.getElementById('todoList');
const itemCount    = document.getElementById('itemCount');
const filterBtns   = document.querySelectorAll('.filter-btn');

// ---- 初始化：从 localStorage 加载 ----
function loadTodos() {
    const stored = localStorage.getItem('todos');
    if (stored) {
        todos = JSON.parse(stored);
    }
    render();
}

// ---- 保存到 localStorage ----
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ---- 添加任务 ----
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        alert('请输入任务内容！');
        return;
    }

    const todo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.unshift(todo);
    saveTodos();
    render();
    todoInput.value = '';
    todoInput.focus();
}

// ---- 切换完成状态 ----
function toggleTodo(id) {
    todos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTodos();
    render();
}

// ---- 删除任务 ----
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    render();
}

// ---- 设置过滤器 ----
function setFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    render();
}

// ---- 清除已完成 ----
function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
}

// ---- 获取过滤后的任务 ----
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':     return todos.filter(t => !t.completed);
        case 'completed':  return todos.filter(t => t.completed);
        default:           return todos;
    }
}

// ---- 渲染列表 ----
function render() {
    const filtered = getFilteredTodos();
    const activeCount = todos.filter(t => !t.completed).length;

    // 更新统计
    itemCount.textContent = `${activeCount} 项待完成`;

    // 空状态
    if (filtered.length === 0) {
        todoList.innerHTML = `
            <li class="empty-state">
                ${currentFilter === 'all'
                    ? '✨ 还没有任务，添加一个吧！'
                    : currentFilter === 'active'
                        ? '🎉 所有任务都已完成！'
                        : '📭 还没有已完成的任务'}
            </li>
        `;
        return;
    }

    // 渲染列表
    todoList.innerHTML = filtered.map(todo => `
        <li class="${todo.completed ? 'completed' : ''}">
            <input type="checkbox"
                   ${todo.completed ? 'checked' : ''}
                   onchange="toggleTodo('${todo.id}')">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')"
                    title="删除">✕</button>
        </li>
    `).join('');
}

// ---- XSS 防护 ----
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ---- 回车键添加 ----
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// ---- 启动 ----
loadTodos();
