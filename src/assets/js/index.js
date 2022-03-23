import { set } from 'lodash';
import '../../style.css';
import Tasks from "./tasklist";
const tasklist = [];

const tasks = new Tasks();

let addTasks = () =>
{
  const description = inputBox.value.trim();
  inputBox.value = '';
  let completed = false;
  let index = tasks.list.length;
 
  tasks.addtask({ index, description, completed });
  renderlists();
}
const inputBox =document.querySelector("#input-field");
  inputBox.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
       addTasks();
    }
});


let renderlists = () => {
  const listselector = document.getElementById('to-do-list');
  let render = '';
  tasks.list.sort((x, y) => x.index - y.index).forEach((listItem, i) => {
    render += ` <li  id=${i}t class="taskitems"><div class="main-item-wrap"><div class="listitems-wrap"><input type="checkbox" name="checkboxtask" id=${i} class="checkbox" ${tasks.list.completed ? 'checked' : ''} > ${listItem.description}</div><img src="https://icon-library.com/images/three-vertical-dots-icon/three-vertical-dots-icon-6.jpg" alt="edit"></div><hr></li>  `;
  });
  listselector.innerHTML = render;
};
renderlists();

const clearbtn = document.querySelector('.clear');
clearbtn.addEventListener('click',()=>{
  let test=[];
const checkbox = document.querySelectorAll('input[type=checkbox]:checked');
checkbox.forEach((box)=>{
  
    const elem = box.parentNode.parentNode.parentNode;
    const listid = elem.querySelector('input[class=checkbox]').id;
    tasks.removetask(listid);
    test.push(listid);
    elem.remove();
    
});
tasks.list.forEach((taskindex,i )=> {
  taskindex.index=i;
  localStorage.setItem('tasks', JSON.stringify(tasks.list));
  return;
});
});
