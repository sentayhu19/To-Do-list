/* eslint-disable import/no-cycle */
import tasks from './index';

const taskchecker = () => {
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
};
export default taskchecker;