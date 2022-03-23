import '../../style.css';
import Tasks from './tasklist';

const tasks = new Tasks();
const inputBox = document.querySelector('#input-field');

const editfunc = () => {
  const edit = document.querySelectorAll('li img');
  edit.forEach((e) => {
    e.addEventListener('click', () => {
      const elem = e.parentNode.parentNode;
      const editID = elem.querySelector('input[class=checkbox]').id;

      const EditBoxId = `${editID}box`;
      document.getElementById(EditBoxId).style.cssText = 'display: block;';
      const editbox = document.getElementById(EditBoxId);
      editbox.addEventListener('keyup', (event) => {
        if (event.code === 'Enter') {
          tasks.list[editID].description = editbox.value;

          localStorage.setItem('tasks', JSON.stringify(tasks.list));
          document.getElementById(EditBoxId).style.cssText = 'display: none;';
          renderlists();
        }
      });
    });
  });
};
editfunc();
const deleteTask = () => {
  try {
    const deletetask = document.querySelectorAll('li button');

    deletetask.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', () => {
        const elem = deleteBtn.parentNode.parentNode;
        const listid = elem.querySelector('input[type=checkbox]:checked').id;

        tasks.list.forEach((taskindex, i) => {
          taskindex.index = i;
          localStorage.setItem('tasks', JSON.stringify(tasks.list));
        });
        tasks.removetask(listid);

        renderlists();
      });
    });
  } catch (e) {
  }
};

const renderlists = () => {
  const listselector = document.getElementById('to-do-list');
  let render = '';
  tasks.list.sort((x, y) => x.index - y.index).forEach((listItem, i) => {
    render += `
     <li  id=${i}t class="taskitems">
    <div class="main-item-wrap">
    <div class="listitems-wrap">
    <input type="checkbox" name="checkboxtask" id=${i} class="checkbox" ${tasks.list.completed ? 'checked' : ''} > ${listItem.description}
    </div>
    <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/150px-Edit_icon_%28the_Noun_Project_30184%29.svg.png?20161202215740" id=${i}e alt="edit"  class="edit">
    <button type="button" class="trashbtn"><b class="trash-icn">🗑</b></button>
</div>
    </div>
    <br>
    <input type="text" class="editBox" placeholder="${listItem.description}" id=${i}box>
    <hr>
    </li>  `;
  });
  listselector.innerHTML = render;
  editfunc();
  deleteTask();
};
const addTasks = () => {
  const description = inputBox.value.trim();
  inputBox.value = '';
  const completed = false;
  const index = tasks.list.length;

  tasks.addtask({ index, description, completed });
  renderlists();
};

inputBox.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
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
    renderlists();
  });
  tasks.list.forEach((taskindex, i) => {
    taskindex.index = i;
    localStorage.setItem('tasks', JSON.stringify(tasks.list));
  });
  renderlists();
});
const checkboxtf = document.querySelectorAll('input[type=checkbox]');
checkboxtf.forEach((box) => {
  box.addEventListener('change', () => {
    if (box.checked) {
      tasks.list[box.id].completed = true;
      localStorage.setItem('tasks', JSON.stringify(tasks.list));
    } else {
      tasks.list[box.id].completed = false;
      localStorage.setItem('tasks', JSON.stringify(tasks.list));
    }
  });
});