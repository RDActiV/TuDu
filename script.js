var  list = document.getElementById("myList");
var chList = document.getElementById("completed");
var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("addItem").click();
    }
});

function addToList(){
    var input = document.getElementById("myInput").value;
    if(isEmpty(input)=== true){
        var li = document.createElement("li");

        addCheckBtn(li);
        addEditBtn(li);
        addDelBtn(li);

        var text = document.createTextNode(input);
        addText(li, text);

        list.insertBefore(li,list.children[0]);
        promptShow("Task Created Successfully.")
        document.getElementById("myInput").value = "";
    }   
}

function addCheckBtn(li){
    var check = document.createElement("I");
    var txt = document.createTextNode("check");
    check.className = "material-icons check";
    check.appendChild(txt);

    check.setAttribute("onclick","moveToCompleted(this.parentElement)");
    li.appendChild(check);
}

let executed = false;

function addEditBtn(li){
    var edit = document.createElement("I");
    var txt = document.createTextNode("edit");
    edit.className = "material-icons edit";
    edit.appendChild(txt);

    edit.setAttribute("onclick","editTask(this.parentElement,executed)");
    li.appendChild(edit);
}

function addDelBtn(li){
    var del = document.createElement("I");
    var txt = document.createTextNode("close");
    del.className = "material-icons close";
    del.appendChild(txt);

    del.setAttribute("onclick","removeTask(this.parentElement)");
    li.appendChild(del);
}

function addText(li, text){
    var span = document.createElement("span");

    span.appendChild(text);
    li.appendChild(span);
}

function moveToCompleted(node){
    chList.insertBefore(node,chList.children[0])
    node.setAttribute("class","done");
    promptShow("Task marked Done.")
}



function editTask(node,executed){
    
    if(!executed){
        executed = true;
        node.getElementsByTagName("I")[0].style.visibility = "hidden";
        node.setAttribute("class","editMode");
        var initial = node.getElementsByTagName("SPAN")[0].innerText;
        node.getElementsByTagName("SPAN")[0].innerText = "";

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "editedInput");
        input.setAttribute("placeholder", initial);
        input.setAttribute("class", "editedIP");
        node.appendChild(input);

        var check = document.createElement("I");
        var txt = document.createTextNode("check");
        check.className = "material-icons check";
        check.appendChild(txt);
        check.setAttribute("onclick","replaceTask(this.parentElement)")
        node.appendChild(check);
    }else{
        
        node.getElementsByTagName("I")[1].setAttribute("onclick","alert(\"Already Editing the highlighted task!!!\")");
        
    }
}
function replaceTask(node){
    executed = false;
    var newTxt = node.getElementsByTagName("INPUT");
    var buttons = node.getElementsByTagName("I");
    if(isEmpty(newTxt[0].value) === true){
        node.getElementsByTagName("SPAN")[0].innerText = newTxt[0].value;
        promptShow("Task edited successfully.")
        newTxt[0].remove();;
        node.setAttribute("class","");
        buttons[0].style.visibility = "visible";
        buttons[3].remove();
        buttons[1].setAttribute("onclick","editTask(this.parentElement)");
    }
    
    
}
function removeTask(node){
    let user = confirm("Selected task will be deleted!!\n Press OK to Delete.");
    if(user === true){
        node.remove();
        promptShow("Task deleted Successfully.")
    }    
}

function promptShow(text){
    document.getElementById("prompts").innerHTML = text;

}

function isEmpty(tsk){
    if(tsk.length <= 2){
        alert("Task must be at least 3 characters long!")
        return false;
    }else{
        return true;
    }

}