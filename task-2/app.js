const showHideBtn = document.querySelector('#showHidebtn button')
const myForm = document.querySelector('#myForm')
const formData = document.querySelector('#myForm form')
const tasksWrap = document.querySelector('#content-wrapper .row')
const addbtn = document.querySelector('#addBtn')

const dateHeads = ['taskTitle', 'taskContent', 'taskType']
let tasks = []


getTasks = () => {
    tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}

setTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

showHidebtn = function (e) {
    myForm.classList.toggle('d-none')
    if (e.target) this.innerText === "show form" ? this.innerText = "hide form" : this.innerText = "show form"
    else { e.innerText = "show form" }
}

addTask = function (e) {
    e.preventDefault()
    task = { status: false, id: new Date().getTime() }
    dateHeads.forEach(head => task[head] = this.elements[head].value);
    tasks = getTasks()
    if (!(task.taskTitle && task.taskType && task.taskContent)) {
        alert("No Data Please Write Something")
    } else {
        tasks.push(task)
        setTasks(tasks)
        this.reset()
        showHidebtn(showHideBtn)
        showSingle(task)
        showTasks()
    }

}

validateForm = (e) => {
    let userNameRegex = /^[A-Z][a-z]{3,8}/
    let typeName = /^[0-9]{4}/
    if (userNameRegex.test(e) == false && typeName.test(e) == false) {
        addbtn.disabled = "true";
    } else {
        addbtn.removeAttribute("disabled");
    }
}

let createNewElement = (elementTag, elementTxt, elementClasses, parent, attributes) => {
    myNewEl = document.createElement(elementTag)
    if (elementTxt != '') myNewEl.innerText = elementTxt
    if (elementClasses != "") myNewEl.className = elementClasses
    parent.appendChild(myNewEl)
    attributes.forEach(attr => {
        myNewEl.setAttribute(attr.attrName, attr.attrVal)
    })
    return myNewEl
}

deleteTask = function (task) {
    i = tasks.findIndex(t => t.id == task.id)
    tasks.splice(i, 1)
    setTasks(tasks)
    showTasks()
}


editTask = function (task) {
    showHidebtn(showHideBtn)
    addbtn.innerText = 'Edit Task'
    tasks = getTasks()
    i = tasks.findIndex(t => t.id == task.id)
    dateHeads.forEach(head => task[head] = formData.elements[head].value = task[dateHeads[i]])
    setTasks(tasks)
}

handelarFun = (e) => {
    e.preventDefault()
    if (addbtn.innerText == 'Add Task') { addTask() }
    else { editTask() }
}

showTasks = () => {
    tasks = getTasks()
    tasksWrap.innerText = ""
    if (tasks.length == 0) createNewElement('div', 'No Tasks To Show', 'alert alert-danger', tasksWrap, [])
    else tasks.forEach((task, i) => { showSingle(task) })
}

showSingle = function (task) {
    colDiv = createNewElement('div', '', 'col-4 x', tasksWrap, [])
    contentDiv = createNewElement('div', '', 'm-3 border border-primary border-3 p-2 bg-primary text-white', colDiv, [])
    createNewElement('h3', task.taskTitle, '', contentDiv, [])
    createNewElement('p', task.taskContent, '', contentDiv, [])
    createNewElement('p', task.taskType, '', contentDiv, [])
    deleteBtn = createNewElement('button', 'delete', 'btn btn-danger m-3', contentDiv, [])
    editeBtn = createNewElement('button', 'edit', 'btn btn-success', contentDiv, ["id", "editbtn"])
    deleteBtn.addEventListener('click', function (e) { deleteTask(task) })
    editeBtn.addEventListener('click', function (e) { editTask(tasks) })
}

showHideBtn.addEventListener('click', showHidebtn)
formData.addEventListener('submit', addTask)
// inpForm.addEventListener('onkeyup', validateForm(this.value))

showTasks()
