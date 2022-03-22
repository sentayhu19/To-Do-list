import './style.css';

const list = [
  {
    index: 0,
    description: 'my task one',
    completed: true,
  },
  {
    index: 3,
    description: 'my task two',
    completed: true,
  },
  {
    index: 1,
    description: 'my task three',
    completed: true,
  },
  {
    index: 2,
    description: 'my task four',
    completed: false,
  },
];
const renderlists = () => {
  const listselector = document.getElementById('to-do-list');
  let render = '';
  list.sort((x, y) => x.index - y.index).forEach((listItem) => {
    render += ` <li><div class="main-item-wrap"><div class="listitems-wrap"><input type="checkbox" class="checkbox" ${list.completed ? 'checked' : ''} > ${listItem.description}</div><img src="https://icon-library.com/images/three-vertical-dots-icon/three-vertical-dots-icon-6.jpg" alt="edit"></div></li> <hr> `;
  });
  listselector.innerHTML = render;
};
renderlists();
