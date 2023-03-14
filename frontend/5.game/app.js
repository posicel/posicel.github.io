const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#F5B041', '#EC7063', '#BA4A00', '#F9E79F', '#A3E4D7', '#AF7AC5']

let time = 0
let score = 0

startButton.addEventListener('click', event => 
{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>
{
    if(event.target.classList.contains('time-btn'))
    {
        time = parseInt(event.target.getAttribute('data-time'))
        console.log(time)
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event =>
{
    if (event.target.classList.contains('circle'))
    {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() 
{
    setTime(time)
    createRandomCircle()
    setInterval(decreaseTime, 1000)
}

function decreaseTime()
{
    if (time === 0)
    {
        finishGame()
    }
    else
    {
        let current = --time
        if (current < 10)
        {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value)
{
    timeEl.innerHTML = `00:${value}` 
}

function finishGame()
{
    timeEl.parentNode.classList.add('hide') 
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle()
{
   const circle = document.createElement("div") 
   circle.classList.add("circle")
   board.append(circle)

   const {width, height} = board.getBoundingClientRect()

   const size = getRandomNumber(10, 30)
   const x = getRandomNumber(0, width-size)
   const y = getRandomNumber(0, height-size)
   
   circle.style.width = `${size}px`
   circle.style.height = `${size}px`
   circle.style.top = `${y}px`
   circle.style.left = `${x}px`
   circle.style.background = `${getRandomColor()}`
}

function getRandomNumber(min, max)
{
    return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor() 
{
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
