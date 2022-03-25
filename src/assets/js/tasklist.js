/* eslint-disable eqeqeq */
export default class Tasks {
  constructor() {
    this.list = localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : [];
  }

  removetask(indexval) {
    this.list = this.list.filter((currentlist) => currentlist.index != indexval);
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  addtask(task) {
    this.list.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }
}
