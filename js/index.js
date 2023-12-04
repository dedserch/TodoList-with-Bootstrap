

const task = [
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

submit.addEventListener("click", () => {
    
    console.log(addInput.value)
    console.log(checkbox.checked);
    if (addInput.value && checkbox.checked == 0){
        
    }
})