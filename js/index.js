

let task = [
    {
        id:1,
        taskName: "Помогите",
        isImportant:false,
        isDone:false
    }
]

const submit = document.querySelector(".addSubmit")
const checkbox = document.querySelector(".addCheckBox")
const addInput = document.querySelector(".addInput")
const modal = document.querySelector("#exampleModal")
const modalError = document.querySelector(".modalError")
const modalEdit = document.querySelector("#staticBackdrop")
const editError = document.querySelector(".editError")
const taskList = document.querySelector(".taskList")
const error = ""

const fillTaskList = () => {
    taskList.innerHTML = ''
    task.forEach((item) => {
        taskList.innerHTML += `          <tr>
        <th scope="row">${item.id}</th>
        <td>${item.taskName}</td>
        <td>${item.isDone ? 'Done': 'IsProgress'}</td>
        <td>
            <button data-id=${item.id} type="button" class="btn taskDoneStatus ${item.isDone? 'btn-primary':'btn-outline-primary'}">Done</button>
        </td>
        <td>
            <button data-id=${item.id} type="button" class="btn taskImportantBtn ${item.isImportant? 'btn-warning': 'btn-outline-warning'}">Important</button>
        </td>
        <td>
            <button data-name=${item.taskName} data-id=${item.id} type="button" class="btn editBtn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
        </td>
        <td>
            <button data-id=${item.id} type="button" class="btn taskRemoveBtn btn-outline-danger">Remove</button>
        </td>
      </tr>`

      
    } )
    const allDoneStatus = document.querySelectorAll('.taskDoneStatus')
    const allImportantBtn = document.querySelectorAll('.taskImportantBtn')
    const removeBtn = document.querySelectorAll('.taskRemoveBtn')
    const editSaveBtn = document.querySelector('.editSave')
    const editInput = document.querySelector('.editInput')
    const editBtn = document.querySelectorAll('.editBtn')
    
    Array.from(editBtn).forEach(item =>{
        item.addEventListener("click", () =>{
            editInput.value = item.dataset.name
            editSaveBtn.dataset.id = item.dataset.id
        })
    })
    
    editSaveBtn.addEventListener("click", () =>{
        if(editInput.value.length >= 3){
            if(isUnique(editInput.value)){
                task = task.map(item =>{
                    if(item.id == editSaveBtn.dataset.id){
                        return {...item,taskName: editInput.value}
                    }
                    else{ 
                        return item
                    }
                })
            }
            else {
                editError.style.display = 'block'
                editError.innerText = "Измененное слово должно быть уникальным!"
            }
        }
        else{
            editError.style.display = 'block'
            editError.innerText = "Измененное слово должно состоять минимум из 3 символов!"
        }

        fillTaskList()
    })


    Array.from(removeBtn).forEach((item) => {
        item.addEventListener('click', () =>{
            task = task.filter((el) =>{
                return el.id != item.dataset.id
            })
            fillTaskList()
        })
    })
    

    Array.from(allImportantBtn).forEach((item) => {
        item.addEventListener('click', () =>{
            task = task.map((el) =>{
                if (el.id == item.dataset.id){
                    return {...el, isImportant: !el.isImportant}
                }
                return el
            })
            fillTaskList()
        })
    })

    Array.from(allDoneStatus).forEach((item) =>{     
        item.addEventListener('click', () => {
            task = task.map((el) =>{
                if (el.id == item.dataset.id){
                    return {...el, isDone: !el.isDone}
                }
                else {
                    return el
                }
            })
            fillTaskList()
        })
    })
}
 

addInput.addEventListener("change", () => {
    if (addInput.value.length >= 3){
        submit.setAttribute("data-bs-dismiss", "nodal")
        submit.setAttribute('aria-label', 'close')
    }
    else{
        submit.removeAttribute('data-bs-dismiss')
        submit.removeAttribute('aria-label')
    }
})

submit.addEventListener("click", () => {
    

    if (addInput.value.length >= 3 ){
        if (isUnique(addInput.value)){
            const newTask = {
                id: task.length ? task.at(-1).id + 1 : 1,
                taskName: addInput.value,
                isImportant: checkbox.checked,
                isDone: false
            }
            task = [...task, newTask]
            modalError.style.display = 'none'
            addInput.value = ''
            checkbox.checked = false
            fillTaskList()
        }
        else {
            modalError.style.display = 'block'
            modalError.innerHTML = 'Заметка должна быть уникальной'
        }
         
    }
    else {
        modalError.style.display = 'block'
        modalError.innerHTML = 'Минимальное кол-во символов должно быть 3'
    }
    
    
})

const isUnique = (taskName) =>{
    return !task.find(todo=>todo.taskName==taskName)
}



fillTaskList()