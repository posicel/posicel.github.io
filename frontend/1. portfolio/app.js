const slides = document.querySelectorAll("div.slide");
console.log(slides);

for (const slide of slides) 
    {
        slide.addEventListener
        (
            'click', function()
            { 
                clearactiveClasses();
                slide.classList.add('active');
            }
        )  
    }; 

function clearactiveClasses()
{
    for (const slide of slides) 
    {
        slide.classList.remove('active');
    }   
}
