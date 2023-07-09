const sortContainer = document.querySelector('.sorting-list')
const sortQuery = document.querySelectorAll('.sorting-ul li')
const iconQuery = document.querySelector('.fa-chevron-down')
let newLiQuery
const mediumContainer = document.querySelector('.media-container')

const sortFunctions = {
    like: (a, b) => b.dataset.likes - a.dataset.likes,
    title: (a, b) => a.dataset.title.localeCompare(b.dataset.title),
    date: (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date),
}

/**
 * Fonction gérant le changement d'ordre des photos
 *
 * @param {*} container
 * @param {*} sortFunction
 */
function reorderFlexboxElements(container, sortFunction) {
    const elements = Array.from(container.children)
    const sortedElements = elements.sort(sortFunction)

    sortedElements.forEach((element) => {
        container.appendChild(element)
    })
}

/**
 * Fonction gérant l'orientation du tri
 *
 * @param {*} target
 */
function sort(target) {
    target.parentNode.prepend(target)
    newLiQuery = document.querySelectorAll('.sorting-ul li')

    if (target.textContent === 'Date') {
        reorderFlexboxElements(mediumContainer, sortFunctions.date)
    }

    if (target.textContent === 'Popularité') {
        reorderFlexboxElements(mediumContainer, sortFunctions.like)
    }

    if (target.textContent === 'Titre') {
        reorderFlexboxElements(mediumContainer, sortFunctions.title)
    }
}

// Gestion du tri avec la souris

sortContainer.addEventListener('click', (e) => {
    openCloseSortMenu(e)
})

sortContainer.addEventListener('keydown', (e) => {
    const firstOption = sortContainer.querySelector('.sorting-ul li:first-child')
    if (e.key === 'Enter') {
        openCloseSortMenu(e)
        sort(e.target)
        if (firstOption) {
            firstOption.focus()
            firstOption.classList.add('focused')
        }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        navigateOptions(e)
    }
})

/**
 * Fonction gérant l'ouverture et la fermeture du menu
 *
 * @param {*} event
 */
function openCloseSortMenu(event) {
    if (sortContainer.classList.contains('open')) {
        console.log('Ceci est l event', event)
        sort(event.target)
        newLiQuery.forEach((sortElem, index) => {
            if (index > 0) {
                sortElem.classList.toggle('hidden')
            } else {
                sortElem.classList.toggle('firstElem')
            }
        })
    } else {
        if (newLiQuery !==undefined) {
            newLiQuery.forEach((sortElem, index) => {
                if (index > 0) {
                    sortElem.classList.toggle('hidden')
                } else {
                    sortElem.classList.toggle('firstElem')
                }
            })
        } else {
            sortQuery.forEach((sortElem, index) => {
                if (index > 0) {
                    sortElem.classList.toggle('hidden')
                } else {
                    sortElem.classList.toggle('firstElem')
                }
            })
        }
    }

    iconQuery.classList.toggle('icon-rotate')
    sortContainer.classList.toggle('open')

    if (event.key === 'Enter' && !sortContainer.classList.contains('open')) {
        console.log('C est la touche Entrer')
        const sortingUl = document.querySelector('.sorting-ul')
        sortingUl.focus()
        newLiQuery.forEach((elem) => {
            elem.classList.remove('focused')
        })
    }
}

// Event listener gérant la fermeture du menu de tri quand on clique en dehors de ce menu
document.addEventListener('click', (e) => {
    if (!sortContainer.contains(e.target) && sortContainer.classList.contains('open')) {
        const tempLiQuery = document.querySelectorAll('.sorting-ul li')

        tempLiQuery.forEach((sortElem, index) => {
            if (index > 0) {
                sortElem.classList.toggle('hidden')
            } else {
                sortElem.classList.toggle('firstElem')
            }
        })
    }
})

/**
* Fonction de navigation avec le clavier entre les options du menu
*
* @param {*} event
*/
function navigateOptions(event) {
    const currentOption = sortContainer.querySelector('.sorting-ul li.focused')
    const firstOption = sortContainer.querySelector('.sorting-ul li:first-child')
    const lastOption = sortContainer.querySelector('.sorting-ul li:last-child')

    if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (currentOption === firstOption) {
            lastOption.focus()
            lastOption.classList.add('focused')
            currentOption.classList.remove('focused')
        } else {
            const previousOption = currentOption.previousElementSibling
            previousOption.focus()
            previousOption.classList.add('focused')
            currentOption.classList.remove('focused')
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (currentOption === lastOption) {
            firstOption.focus()
            firstOption.classList.add('focused')
            currentOption.classList.remove('focused')
        } else {
            const nextOption = currentOption.nextElementSibling
            nextOption.focus()
            nextOption.classList.add('focused')
            currentOption.classList.remove('focused')
        }
    }
}
