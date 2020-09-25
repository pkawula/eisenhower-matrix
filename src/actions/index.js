export const Tasks = {
    get: () => window.localStorage.getItem('tasks'),
    save: item => {
        if (Tasks.get()) {
            const tasks = JSON.parse(Tasks.get());
            tasks.push(item);

            window.localStorage.setItem('tasks', JSON.stringify(tasks));
        } else if (item.length) {
            window.localStorage.setItem('tasks', JSON.stringify(item));
        } else {
            window.localStorage.setItem('tasks', JSON.stringify([item]));
        }
    },
    delete: () => window.localStorage.removeItem('tasks'),
    update: item => {
        Tasks.delete();
        Tasks.save(item);
    },
};