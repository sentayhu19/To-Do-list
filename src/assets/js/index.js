/* eslint-disable import/no-cycle */
import '../../style.css';
import Tasks from './tasklist';
import taskchecker from './taskchecker';

let renderlists = () => {}; // introduction
const tasks = new Tasks();
const inputBox = document.querySelector('#input-field');
const fixindex = () => {
  tasks.list.forEach((taskindex, i) => {
    taskindex.index = i;
    localStorage.setItem('tasks', JSON.stringify(tasks.list));
  });
};

const editfunc = () => {
  const edit = document.querySelectorAll('li img');
  edit.forEach((e) => {
    e.addEventListener('click', () => {
      const elem = e.parentNode.parentNode;
      const editID = elem.querySelector('input[class=checkbox]').id;

      const EditBoxId = `${editID}box`;
      document.getElementById(EditBoxId).style.cssText = 'display: block;';
      const place = `${editID}d`;
      document.getElementById(place).style.cssText = 'display: none;';
      const editbox = document.getElementById(EditBoxId);
      editbox.addEventListener('keyup', (event) => {
        if (event.code === '13') {
          tasks.list[editID].description = editbox.value;

          localStorage.setItem('tasks', JSON.stringify(tasks.list));
          document.getElementById(EditBoxId).style.cssText = 'display: none;';
          document.getElementById(place).style.cssText = 'display: block;';
          renderlists();
          taskchecker();
        }
      });
    });
  });
};
editfunc();
const deleteTask = () => {
  const deletetask = document.querySelectorAll('li button');

  deletetask.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      const elem = deleteBtn.parentNode.parentNode.parentNode.parentNode;
      const listid = elem.querySelector('input[type=checkbox]:checked').id;
      // Delete those checked checkboxes

      tasks.removetask(listid);
      renderlists();
      taskchecker();
    });
  });
};

renderlists = () => {
  const listselector = document.getElementById('to-do-list');
  let render = '';
  tasks.list
    .sort((x, y) => x.index - y.index)
    .forEach((listItem, i) => {
      render += `
     <li  id=${i}t class="taskitems">
    <div class="main-item-wrap">
    <div  class="listitems-wrap" >
    <input type="checkbox" name="checkboxtask" id=${i} class="checkbox" ${
  listItem.completed ? 'checked' : 'not'
} ><p id=${i}d> ${listItem.description} </p>
      <input type="text" class="editBox" placeholder="${
  listItem.description
}" id=${i}box>
    </div>
   
    <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/150px-Edit_icon_%28the_Noun_Project_30184%29.svg.png?20161202215740" id=${i}e alt="edit"  class="edit">
    <button type="button" class="trashbtn"><b class="trash-icn">🗑</b></button>
</div>
    </div>
    <br>
    
    <hr>
    </li>  `;
    });
  listselector.innerHTML = render;
  editfunc();
  deleteTask();

  taskchecker();
  fixindex();
};
deleteTask();
const addTasks = () => {
  const description = inputBox.value.trim();
  inputBox.value = '';
  const completed = false;
  const index = tasks.list.length;

  tasks.addtask({ index, description, completed });
  renderlists();
  taskchecker();
};

inputBox.addEventListener('keyup', (event) => {
  if (event.code === '13') {
    addTasks();
    deleteTask();
  }
});

renderlists();

const clearbtn = document.querySelector('.clear');
clearbtn.addEventListener('click', () => {
  const test = [];
  const checkbox = document.querySelectorAll('input[type=checkbox]:checked');
  checkbox.forEach((box) => {
    const elem = box.parentNode.parentNode.parentNode;
    const listid = elem.querySelector('input[class=checkbox]').id;
    tasks.removetask(listid);
    test.push(listid);
    elem.remove();
  });
  renderlists();
  fixindex();
});
taskchecker();

export default tasks;
