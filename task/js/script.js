let task, tasks, task__close, arrTask;
let add__button = document.querySelector('.add__button');
let add__input = document.querySelector('.add__input');
tasks = document.querySelector('.tasks');
task = tasks.querySelectorAll('.task');

add__button.addEventListener('click', ()=>{
    addElem();
});

add__input.addEventListener('keydown', (event)=>{
    if (event.code == 'Enter' || event.keyCode == '13' || event.key == 'Enter') {
        addElem();
    }
});

if (localStorage.getItem('arrTask') !== null) {
    arrTask = JSON.parse(localStorage.getItem('arrTask'));
    for (let i = 0; i < arrTask.length; i++) {
        let text = arrTask[i][0];
        let id = arrTask[i][1];
        addElem(text, id);
    }   
} else {
    arrTask = [];
    function addElemStart(text, id) {
        arrTask.push([text, id]);
        localStorage.setItem('arrTask', JSON.stringify(arrTask));
        addElem(text, id);
    }
    addElemStart('Моя первая задача', 0);
}

startClose();

function addElem(localHtml, localId) {
    if (add__input.value === '' && localHtml === undefined) {
        return false;
    }
    let block = document.createElement('div');
    block.className = 'task';
    block.innerHTML = '<div class="task__close"></div>';
    if (localHtml === undefined) {
        // Если это добавление блока НЕ ИЗ локального хранилища
        task = tasks.querySelectorAll('.task');
        let arr = [];
        for (let i = 0; i < task.length; i++) {
            arr.unshift(task[i].getAttribute('data-id'));
        }
        arr.sort(function(a, b) {
            return a - b;
        });
        let num = addNext(arr);
        block.setAttribute('data-id', num);
        block.innerHTML += add__input.value;

        let id = num;
        let text = add__input.value;
        arrTask.push([text, id]);
        localStorage.setItem('arrTask', JSON.stringify(arrTask));

        localHtml = add__input.value;
        localId = id;
        add__input.value = '';
    } else {
        // Если это добавление блока ИЗ локального хранилища
        block.setAttribute('data-id', localId);
        block.innerHTML += localHtml;
    }
    block.setAttribute('data-listener', false);
    tasks.prepend(block);
    startClose(localHtml, localId);
}
// function addElem()

function startClose(localHtml, localId) {
    task__close = tasks.querySelectorAll('.task__close');
    task = tasks.querySelectorAll('.task');
    for (let i = 0; i < task.length; i++) {
        if (task[i].getAttribute('data-listener') == 'false') {
            task__close[i].addEventListener('click', (event)=> {
                for (let j = 0; j < arrTask.length; j++) {
                    if (arrTask[j][1] == localId) {
                        arrTask.splice(j, 1);
                    }
                    localStorage.setItem('arrTask', JSON.stringify(arrTask));
                }
                event.path[1].remove();
                task = tasks.querySelectorAll('.task');
                task__close = tasks.querySelectorAll('.task__close');
            });
            task[i].setAttribute('data-listener', true);
        }
    }
}
// function startClose()

function addNext(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != i) {
            arr.splice(i, 0, i);
            return i;
        }
    }
    arr.push(arr.length);
    return arr.length - 1;
}