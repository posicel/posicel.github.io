const board = document.querySelector('#board');
const SQUARE_NUMBER = 1000;
const colors = ["GreenYellow", 'green', 'LightSeaGreen', 'Lime', 'OliveDrab', 'SpringGreen', 'DarkOliveGreen', 'ForestGreen', 'PaleGreen', 'DarkCyan', 'Olive']

for (let i = 0; i < SQUARE_NUMBER; i++) 
{
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener("mouseover", () => 
    {
      setColor(square) 
    })

    square.addEventListener("mouseleave", () => 
    {
      removeColor(square) 
    })

    board.append(square)
}

function setColor(element)
{
    color = getRandomColor()
    element.style.backgroundColor = color;
    element.style.boxshadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element)
{
    element.style.backgroundColor = '#1d1d1d';
}

function getRandomColor() 
{
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}