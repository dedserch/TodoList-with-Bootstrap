

let task = [
    {
        id:1,
        taskName: "Пойти гулять",
        isImportant:false,
        isDone:false
    }
]

const submit = document.querySelector(".addSubmit")
const checkbox = document.querySelector(".addCheckBox")
const addInput = document.querySelector(".addInput")
const modal = document.querySelector("#exampleModal")
const modalError = document.querySelector(".modalError")

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
        <td>Edit</td>
        <td>Remove</td>
      </tr>`

      
    } )
    const allDoneStatus = document.querySelectorAll('.taskDoneStatus')
    const allImportantBtn = document.querySelectorAll('.taskImportantBtn')
    

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
 console.log(modal);   

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