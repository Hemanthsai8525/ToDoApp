let tasks=[
    {completed:false,task:'Breakfast',time:'08:30'},
    {completed:false,task:'java',time:'09:00'},
];

function display(){
    let returnVal = tasks.reduce(function(acc,val,ind){
        let tr=`
        <tr class="text-center">
        <td><input type="checkbox" ${val.completed?"checked":""} onclick="checkbox(${ind})"></td>
        <td style="text-decoration: ${val.completed ? 'line-through' : 'none'};">${val.task}</td>
        <td>${val.time}</td>
        <td><button onclick="delete_task(${ind})" class="btn btn-outline-danger"><i class="bi bi-trash3"></i></button>
        <td><button onclick="edit_task(${ind})" class="btn btn-outline-warning"><i class="bi bi-pencil-square"></i></button>
        </tr>
        `
        acc=acc+tr;
        return acc
    },"")

    let table=`
    <tr class="text-center">
         <th>Status</th>
         <th>Task</th>
         <th>Time</th>
         <th colspan="2" class="align-middle">Action</th>
    </tr>
    ${returnVal}
    `
    document.getElementById("display").innerHTML=table
    document.getElementById("newedit").style.display="none"
    document.getElementById("newTask").style.display="block"
    taskupdates()
    
}
display()
taskupdates()

function newTask(){
    let netask=document.getElementById("taskinput").value;
    let netime=document.getElementById('tasktime').value;
    let objtask={
        task:netask,
        time:netime,
        completed:false
    }
    tasks.push(objtask);
    display();
    taskupdates()
    console.log(objtask);
}

function edit_task(id){
    let task=document.getElementById("taskinput");
    let time=document.getElementById("tasktime");
    let taskobj = tasks.find(function(val,ind){
        if(ind==id){
            return val
        }
    })
    task.value=taskobj.task;
    time.value=taskobj.time;
    document.getElementById("newTask").style.display="none"
    document.getElementById("newedit").style.display="block"
    document.getElementById("newedit").onclick=(()=>{
        newedit(id)});
}

function newedit(id){
    console.log(id)
    let Netask=document.getElementById("taskinput")
    let Netime=document.getElementById("tasktime")
    let task=Netask.value;
    let time=Netime.value;
    let objtask = { task, time, completed: tasks[id].completed };
    tasks[id]=objtask
    display()
    
}

function delete_task(id){
    tasks.splice(id,1)
    display();
}

function clearall(){
    tasks=[]
    display()
}

function checkbox(id){
    tasks[id].completed=!tasks[id].completed;
    console.log(tasks[id])
    display()
}

function taskupdates(){
    let completedtasks=tasks.filter(tasks=> tasks.completed).length;
    let totaltasks= tasks.length

    document.getElementById('number').innerHTML=`${completedtasks}/${totaltasks}`
    
    if (tasks.length && completedtasks === totaltasks){
        completed();
    }

}

function completed(){
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.1 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.1 },
    })
  );
}, 250);
}