const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const slidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const slides = mainSlide.querySelectorAll('div')
slidesCount = slides.length
const container = document.querySelector('.container')
const height = container.clientHeight
console.log(height)


let activeSlideIndex = 0
let direction = ''

slidebar.style.top = `-${(slidesCount-1) * 100}vh`

upBtn.addEventListener('click', () => 
{
    changeSlide('up')
    console.log('up')
})

downBtn.addEventListener('click', () => 
{
    changeSlide('down')
    console.log('down')
})

function changeSlide(direction)
{
    if (direction === 'up')
    {
        activeSlideIndex ++
        if (activeSlideIndex === slidesCount)
        {
            activeSlideIndex = 0
        }       
    }
    else if (direction === 'down')
    {
        activeSlideIndex --
        if (activeSlideIndex < 0) 
        {
            activeSlideIndex = slidesCount - 1
        }       
    }

    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
    
    slidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}