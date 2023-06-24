const sortContainer = document.querySelector(".sorting-list")
const sortQuery = document.querySelectorAll(".sorting-ul li")
const iconQuery = document.querySelector(".fa-chevron-down")
let newLiQuery
const mediumContainer = document.querySelector('.media-container')
const letTry = mediumContainer.children

//TODO corriger le bug du toggle hidden quand on appuye ailleurs que sur le li lorsque c'est OPEN

const sortFunctions = {
    like: (a, b) => b.dataset.likes - a.dataset.likes,
    title: (a, b) => a.dataset.title.localeCompare(b.dataset.title),
    date: (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
}

function reorderFlexboxElements(container, sortFunction) {
    const elements = Array.from(container.children);
    const sortedElements = elements.sort(sortFunction);
    
    sortedElements.forEach(element => {
        container.appendChild(element);
    });
}

function handleClick (event) {
    event.preventDefault()
    
    const target = event.target
    const targetParentNode = target.parentNode
    
    targetParentNode.prepend(target)
    newLiQuery = document.querySelectorAll(".sorting-ul li")

    console.log(target.textContent)

    target.classList.add('firstElem')

    if(target.textContent === "Date"){
        reorderFlexboxElements(mediumContainer, sortFunctions.date)
    }

    if(target.textContent === "Popularité"){
        reorderFlexboxElements(mediumContainer, sortFunctions.like)
    }

    if(target.textContent === "Titre"){
        reorderFlexboxElements(mediumContainer, sortFunctions.title)
    }

}

console.log('Before Event', newLiQuery)
sortContainer.addEventListener("click", e => {
    e.preventDefault()
    
    if(newLiQuery === undefined){
        sortQuery.forEach(elem => {
            if(elem.classList.contains('firstElem')){
                elem.classList.remove('firstElem')
            }else{
                elem.classList.toggle('hidden')
            }
        })
    }else{
        if(!sortContainer.classList.contains('open')){
            newLiQuery.forEach(elem => {
                if(elem.classList.contains('firstElem')){
                    elem.classList.remove('firstElem')
                }else{
                    elem.classList.toggle('hidden')
                }
            })
        }else{
            newLiQuery.forEach(elem => {
                if(!elem.classList.contains('firstElem')){
                    elem.classList.toggle('hidden')
                }
            })
        }
    }
    
    sortContainer.classList.toggle('open')

    iconQuery.classList.toggle('icon-rotate')
    if(sortContainer.classList.contains('open')){
        sortQuery.forEach(sort => {
            sort.removeEventListener("click", handleClick)
            sort.addEventListener("click", handleClick)
        })
    }
    
})

const hiddenToggle = (target, values) => {
    values.forEach(value => target.classList.toggle(value))
}