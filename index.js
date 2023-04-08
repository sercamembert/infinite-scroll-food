document.addEventListener('DOMContentLoaded',()=>{
const main = document.querySelector('.main')
const img = document.querySelector('.main__img')
const text = document.querySelector('.text')
const icon = document.querySelector('i')

icon.addEventListener('click',()=>debounce(getPost, 500))
document.addEventListener('keydown',(event)=>{
    if(event.keyCode == "38"){
        return listenScroll(null,-1);
    }
    else if(event.keyCode == "40"){
        return listenScroll(null,1);
    }
})
window.addEventListener('wheel', listenScroll)

function listenScroll(event,direction1){
    let direction;
    if (direction1 === -1) {
      direction = direction1;
    }else if(direction1 === 1){
        direction = 1
    }else {
      direction = event.wheelDelta < 0 ? 1 : -1;
    }
    const currentSection = document.querySelector('.main.active');
    if(currentSection){
        if(direction === 1){
            const nextSection = currentSection.nextElementSibling;
            if(nextSection){
                nextSection.scrollIntoView({behavior: "smooth", block: "center"});
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
            }else{
                debounce(getPost,500) 
            }

        }else if(direction === -1){
            const prevSection = currentSection.previousElementSibling;
            if(prevSection){
                prevSection.scrollIntoView({behavior: "smooth", block: "center"});
                currentSection.classList.remove('active');
                prevSection.classList.add('active');
            }
        }
    }
}
function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId= setTimeout(function(){
        method();
    }, delay);
}


function getPost(){
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=8254073087c6480f847235b68ef432d3&number=1';
    fetch(url)
    .then(response=>{return response.json()})
    .then(json => changeDom(json))
    .then(random =>scrollIntoView(random))
    .catch(err=>console.log(err))
}

function changeDom(data){
    const randomInt = Math.floor(Math.random() * 1000) + 1
    const sections = document.querySelectorAll('.main')
    const createContainer = document.createElement('section');
    createContainer.setAttribute("class","main")
    createContainer.setAttribute("id",randomInt)

    const createImage = document.createElement('img')
    createImage.setAttribute("src", `${data.recipes[0].image}`)
    createImage.setAttribute("class", 'main__img')

    const createText = document.createElement('p')
    createText.textContent = data.recipes[0].title
    createText.setAttribute("class","text")

    const createButton = document.createElement('button')
    createButton.textContent = "Check recipe"
    createButton.setAttribute("class","btn")

    const createLink = document.createElement('a')
    createLink.setAttribute('href',`${data.recipes[0].spoonacularSourceUrl}`)
    createLink.appendChild(createButton)

    const createIconContainer = document.createElement('div')
    createIconContainer.setAttribute('class','icon')
    createIconContainer.innerHTML = '<i class="fa-solid fa-chevron-down"></i>'

    createIconContainer.addEventListener('click', () => {
        listenScroll(null,1)
    });

    const createIconUpContainer = document.createElement('div')
    createIconUpContainer.setAttribute('class','icon-up')
    createIconUpContainer.innerHTML = '<i class="fa-solid fa-chevron-up"></i>'

    createIconUpContainer.addEventListener('click', () => {
        listenScroll(null,-1)
    });

    createContainer.appendChild(createImage)
    createContainer.appendChild(createText)
    createContainer.appendChild(createLink)
    createContainer.appendChild(createIconContainer)
    createContainer.appendChild(createIconUpContainer)

    sections.forEach(element => {
        if(element.classList.contains('active')){
            element.classList.remove('active')
        }
    })
    createContainer.classList.add('active')
    document.body.appendChild(createContainer);
    return randomInt;
}

function scrollIntoView(id){

    const sections = document.querySelectorAll('.main')
    document.getElementById(id).scrollIntoView({
        behavior: "smooth",block : "center"
        });
}  
})



