const items = document.querySelectorAll(".item")
const item1 = document.querySelector(".item.first")
const placeholders = document.querySelectorAll(".placeholder")
const placeholders1 = document.querySelectorAll(".placeholder.first")

item1.addEventListener('dragstart', dragstart1)

for (var placeholder of placeholders1)
{
   placeholder.addEventListener('dragover', dragover1)
   placeholder.addEventListener('dragenter', dragenter1)
   placeholder.addEventListener('dragleave', dragleave1)
   placeholder.addEventListener('drop', dragdrop1)
}

function dragstart1(event)
{
    event.target.classList.add('hold')
    setTimeout(() => event.target.classList.add('hide'), 0)  
}

function dragend1(event)
{
    console.log("dragend")
    event.target.classList.remove('hold', 'hide')
}

function dragover1(event)
{
    event.preventDefault()
}

function dragenter1(event)
{
    event.target.classList.add('hovered')   
}

function dragleave1(event)
{
    event.target.classList.remove('hovered')    
}

function dragdrop1(event)
{
    event.target.append(item1)
    event.target.classList.remove('hovered')     
}


/*
for (var item of items)
{
    item.addEventListener('dragstart', dragstart)
    item.addEventListener('dragend', dragend)
}


for (var placeholder of placeholders)
{
   placeholder.addEventListener('dragover', dragover)
   placeholder.addEventListener('dragenter', dragenter)
   placeholder.addEventListener('dragleave', dragleave)
   placeholder.addEventListener('drop', dragdrop)
}

function dragstart(event)
{
    event.target.classList.add('hold')
    setTimeout(() => event.target.classList.add('hide'), 0)  
}

function dragend(event)
{
    console.log("dragend")
    event.target.classList.remove('hold', 'hide')
}

function dragover(event)
{
    event.preventDefault()
}

function dragenter(event)
{
    event.target.classList.add('hovered')   
}

function dragleave(event)
{
    event.target.classList.remove('hovered')    
}

function dragdrop(event)
{
    event.target.append(item)
    event.target.classList.remove('hovered')     
}
*/
