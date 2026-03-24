let addBtn=document.getElementById("addBtn")
addBtn.addEventListener("click",dotask)

let inpBox=document.getElementById("inpBox")
let prio=document.getElementById("prio")
let tbody=document.getElementById("tbody")

let taskArr=[]

function dotask(){
    let inpVal=inpBox.value
    let selectVal=prio.value

    let obj={
        id:Date.now(),
        task:inpVal,
        priority:selectVal,
        status:false
    }

    taskArr.push(obj)

    appendData(taskArr)

    inpBox.value=""
    prio.value="none"
}

function appendData(arr)
{
    tbody.innerHTML=""

    arr.forEach(function(el,ind,arr)
    {
        let tr=document.createElement("tr")

        let sr=document.createElement("td")
        sr.innerText=ind+1

        let task=document.createElement("td")
        task.innerText=el.task
        task.style.color = el.status ? "green" : "red"

        let prio=document.createElement("td")
        prio.innerText=el.priority
        
        let status=document.createElement("td")
        status.innerText = el.status ? "Task Completed" : "Task Incomplete"

        let changeStatus=document.createElement("td")
        let statusBtn=document.createElement("button")
        statusBtn.innerText="Toggle Button"
        statusBtn.value=el.id
        statusBtn.style.backgroundColor="rgb(171, 61, 169)"
        statusBtn.addEventListener("click",toggleStatus)
        changeStatus.append(statusBtn)

        let taskDelete=document.createElement("td")
        let deleteBtn=document.createElement("button")
        deleteBtn.innerText="Delete"
        deleteBtn.style.backgroundColor="red"
        deleteBtn.value=el.id
        deleteBtn.addEventListener("click",deleteTask)
        taskDelete.append(deleteBtn)

        tr.append(sr,task,prio,status,changeStatus,taskDelete)
        tbody.append(tr)
    })
}

function toggleStatus(event)
{
    let btnVal=event.target.value

    taskArr = taskArr.map(function(el,i,arr)
    {
        if(btnVal==el.id)
        {
            let obj={
                id:el.id,
                task:el.task,
                priority:el.priority,
                status:el.status ? false : true
            }
            return obj
        }
        else{
            return el
        }
    })

    appendData(taskArr)
}


function deleteTask(event)
{
    let delBtnVal=event.target.value

    taskArr = taskArr.filter(function(el,i,arr)
    {
        return el.id != delBtnVal
    })

    appendData(taskArr)
}