export default class Tasks {
    constructor() {
      this.list = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    }
  
    removetask(indexval) {
        console.log("finally");
        
        for(let i=0;i<indexval.length;i++){
      this.list = this.list.filter((currentlist) => currentlist.index !== indexval[i]);
console.log(this.list.index);        
console.log("ID sent at class is at i ", indexval[i]);
        }
      localStorage.setItem('tasks', JSON.stringify(this.list));
    }
  
    addtask(task) {
       
      this.list.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.list));
    }
  }