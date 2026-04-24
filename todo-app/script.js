// Local Storage Manager
class StorageManager {
    constructor(key = 'tasks') {
        this.key = key;
    }

    getTasks() {
        const tasks = localStorage.getItem(this.key);
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks(tasks) {
        localStorage.setItem(this.key, JSON.stringify(tasks));
    }

    addTask(task) {
        const tasks = this.getTasks();
        task.id = Date.now();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        tasks.push(task);
        this.saveTasks(tasks);
        return task;
    }

    updateTask(id, updates) {
        let tasks = this.getTasks();
        tasks = tasks.map(task => task.id === id ? { ...task, ...updates } : task);
        this.saveTasks(tasks);
    }

    deleteTask(id) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== id);
        this.saveTasks(tasks);
    }

    deleteCompleted() {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => !task.completed);
        this.saveTasks(tasks);
    }

    clearAll() {
        localStorage.removeItem(this.key);
    }
}

// Task Manager App
class TaskManager {
    constructor() {
        this.storage = new StorageManager();
        this.tasks = this.storage.getTasks();
        this.filter = 'all';
        this.sortBy = 'date';
        this.searchQuery = '';
        this.editingTaskId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
        this.restoreTheme();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('task-form').addEventListener('submit', e => {
            e.preventDefault();
            this.handleAddTask();
        });

        // Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filter = e.target.dataset.filter;
                this.render();
            });
        });

        // Priority filters
        document.querySelectorAll('.priority-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const priority = e.target.closest('.priority-btn').dataset.priority;
                this.filterByPriority(priority);
            });
        });

        // Search
        document.getElementById('search-input').addEventListener('input', e => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Sort
        document.getElementById('sort-btn').addEventListener('click', () => {
            this.sortBy = this.sortBy === 'date' ? 'priority' : 'date';
            document.getElementById('sort-btn').textContent = `Sort: ${this.sortBy === 'date' ? 'Date ↓' : 'Priority ↓'}`;
            this.render();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Export
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportTasks();
        });

        // Clear completed
        document.getElementById('clear-all-btn').addEventListener('click', () => {
            if (confirm('Delete all completed tasks?')) {
                this.storage.deleteCompleted();
                this.tasks = this.storage.getTasks();
                this.render();
            }
        });

        // Modal events
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('edit-form').addEventListener('submit', e => {
            e.preventDefault();
            this.handleSaveEdit();
        });

        document.querySelector('.btn-cancel').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('edit-modal').addEventListener('click', e => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });
    }

    handleAddTask() {
        const title = document.getElementById('task-input').value.trim();
        const priority = document.getElementById('priority-select').value;
        const dueDate = document.getElementById('due-date-input').value;
        const category = document.getElementById('category-input').value.trim();

        if (!title) return;

        const task = {
            title,
            priority,
            dueDate: dueDate || null,
            category: category || null
        };

        this.storage.addTask(task);
        this.tasks = this.storage.getTasks();
        this.render();

        // Reset form
        document.getElementById('task-form').reset();
        document.getElementById('priority-select').value = 'medium';
    }

    filterByPriority(priority) {
        const filtered = this.tasks.filter(task => task.priority === priority);
        this.displayCustomList(filtered, `${priority.toUpperCase()} Priority Tasks`);
    }

    displayCustomList(tasks, title) {
        const list = document.getElementById('tasks-list');
        list.innerHTML = `<h3 style="margin: 1rem 0; font-weight: 600;">${title}</h3>`;
        
        if (tasks.length === 0) {
            list.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">No tasks found</p>`;
            return;
        }

        tasks.forEach(task => {
            list.appendChild(this.createTaskElement(task));
        });
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];

        // Apply filter
        if (this.filter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (this.filter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }

        // Apply search
        if (this.searchQuery) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(this.searchQuery) ||
                (task.category && task.category.toLowerCase().includes(this.searchQuery))
            );
        }

        // Apply sorting
        if (this.sortBy === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return filtered;
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item priority-${task.priority}`;
        if (task.completed) div.classList.add('completed');

        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        const dueDateClass = isOverdue ? 'overdue' : '';

        const dueText = task.dueDate ? `📅 ${new Date(task.dueDate).toLocaleDateString()}` : '';

        div.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <div class="task-title">${this.escapeHtml(task.title)}</div>
                <div class="task-meta">
                    ${task.category ? `<span class="task-category">${this.escapeHtml(task.category)}</span>` : ''}
                    ${task.dueDate ? `<span class="task-due-date ${dueDateClass}">${dueText}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-task edit">✏️ Edit</button>
                <button class="btn-task delete">🗑️ Delete</button>
            </div>
        `;

        // Checkbox event
        div.querySelector('.task-checkbox').addEventListener('change', e => {
            this.storage.updateTask(task.id, { completed: e.target.checked });
            this.tasks = this.storage.getTasks();
            this.render();
        });

        // Edit button
        div.querySelector('.edit').addEventListener('click', () => {
            this.openEditModal(task);
        });

        // Delete button
        div.querySelector('.delete').addEventListener('click', () => {
            if (confirm('Delete this task?')) {
                this.storage.deleteTask(task.id);
                this.tasks = this.storage.getTasks();
                this.render();
            }
        });

        return div;
    }

    openEditModal(task) {
        this.editingTaskId = task.id;
        document.getElementById('edit-task-input').value = task.title;
        document.getElementById('edit-priority').value = task.priority;
        document.getElementById('edit-due-date').value = task.dueDate || '';
        document.getElementById('edit-category').value = task.category || '';
        document.getElementById('edit-modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('edit-modal').classList.remove('active');
        this.editingTaskId = null;
    }

    handleSaveEdit() {
        const title = document.getElementById('edit-task-input').value.trim();
        const priority = document.getElementById('edit-priority').value;
        const dueDate = document.getElementById('edit-due-date').value;
        const category = document.getElementById('edit-category').value.trim();

        if (!title) {
            alert('Task title cannot be empty');
            return;
        }

        this.storage.updateTask(this.editingTaskId, {
            title,
            priority,
            dueDate: dueDate || null,
            category: category || null
        });

        this.tasks = this.storage.getTasks();
        this.closeModal();
        this.render();
    }

    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('total-tasks').textContent = total;
        document.getElementById('active-tasks').textContent = active;
        document.getElementById('completed-tasks').textContent = completed;
    }

    render() {
        const filtered = this.getFilteredTasks();
        const list = document.getElementById('tasks-list');
        const empty = document.getElementById('empty-state');

        list.innerHTML = '';

        if (filtered.length === 0) {
            empty.style.display = 'flex';
        } else {
            empty.style.display = 'none';
            filtered.forEach(task => {
                list.appendChild(this.createTaskElement(task));
            });
        }

        this.updateStats();
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    restoreTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
            this.updateThemeIcon(saved);
        }
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});