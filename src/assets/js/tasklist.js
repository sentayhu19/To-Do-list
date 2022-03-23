export default class Tasks {
    constructor() {
      this.list = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    }
  
    removetask(indexval) {
        console.log("finally remove func called");
        console.log("ID sent at class is at i ", indexval);
      this.list = this.list.filter((currentlist) => {
        console.log("currentlist index",currentlist.index);
          return currentlist.index != indexval;
    });


console.log("The whole aray ",this.list);        

      localStorage.setItem('tasks', JSON.stringify(this.list));
    }
  
    addtask(task) {
       
      this.list.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.list));
    }
  }