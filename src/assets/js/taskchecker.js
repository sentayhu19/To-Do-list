import Tasks from './tasklist';

const tasks = new Tasks();

const taskchecker = () => {
  const checkboxtf = document.querySelectorAll('input[type=checkbox]');
  console.log(checkboxtf);
  checkboxtf.forEach((box) => {
    box.addEventListener('change', () => {
      if (box.checked) {
          console.log("box is checked ");
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