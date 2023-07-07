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
 *
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
 *
 *
 * @param {*} event
 */
function handleClick(event) {
    event.preventDefault()

    const target = event.target
    const targetParentNode = target.parentNode
    console.log(target)
    console.log(targetParentNode)

    targetParentNode.prepend(target)
    newLiQuery = document.querySelectorAll('.sorting-ul li')

    console.log(newLiQuery)

    target.classList.add('firstElem')

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

sortContainer.addEventListener('click', (e) => {
    e.preventDefault()

    const clickTarget = e.target

    if (sortContainer.classList.contains('open') && clickTarget.classList.contains('sorting-ul')) {
        return
    }

    if (sortContainer.classList.contains('open') && clickTarget.classList.contains('fa-chevron-down')) {
        sortQuery.forEach((elem, index) => {
            if (index > 0) {
                elem.classList.toggle('hidden')
            } else {
                elem.classList.toggle('firstElem')
            }
        })
        sortContainer.classList.toggle('open')
        iconQuery.classList.toggle('icon-rotate')

        return
    }

    if (newLiQuery === undefined) {
        sortQuery.forEach((elem) => {
            if (elem.classList.contains('firstElem')) {
                elem.classList.remove('firstElem')
            } else {
                elem.classList.toggle('hidden')
            }
        })
    } else {
        if (!sortContainer.classList.contains('open')) {
            newLiQuery.forEach((elem) => {
                if (elem.classList.contains('firstElem')) {
                    elem.classList.remove('firstElem')
                } else {
                    elem.classList.toggle('hidden')
                }
            })
        } else {
            newLiQuery.forEach((elem) => {
                if (!elem.classList.contains('firstElem')) {
                    elem.classList.toggle('hidden')
                }
            })
        }
    }

    sortContainer.classList.toggle('open')

    iconQuery.classList.toggle('icon-rotate')
    if (sortContainer.classList.contains('open')) {
        sortQuery.forEach((sort) => {
            sort.removeEventListener('click', handleClick)
            sort.addEventListener('click', handleClick)
        })
    }

    document.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        const newLiOrder = document.querySelectorAll('.sorting-ul li')

        if (sortContainer.classList.contains('open') && !sortContainer.contains(target)) {
            if (sortQuery === newLiOrder) {
                sortQuery.forEach((elem, index) => {
                    if (index > 0) {
                        elem.classList.toggle('hidden')
                    } else {
                        elem.classList.toggle('firstElem')
                    }
                })
            } else {
                newLiOrder.forEach((elem, index) => {
                    if (index > 0) {
                        elem.classList.toggle('hidden')
                    } else {
                        elem.classList.toggle('firstElem')
                    }
                })
            }

            sortContainer.classList.remove('open')
            iconQuery.classList.remove('icon-rotate')
        }
    })
})

sortContainer.addEventListener('keydown', (e)=> {
    // e.preventDefault()

    if (e.key === 'Enter') {
        if (newLiQuery === undefined) {
            sortQuery.forEach((elem) => {
                if (elem.classList.contains('firstElem')) {
                    elem.classList.remove('firstElem')
                } else {
                    elem.classList.toggle('hidden')
                }
            })
        } else {
            if (!sortContainer.classList.contains('open')) {
                newLiQuery.forEach((elem) => {
                    if (elem.classList.contains('firstElem')) {
                        elem.classList.remove('firstElem')
                    } else {
                        elem.classList.toggle('hidden')
                    }
                })
            } else {
                newLiQuery.forEach((elem) => {
                    if (!elem.classList.contains('firstElem')) {
                        elem.classList.toggle('hidden')
                    }
                })
            }
        }

        sortContainer.classList.toggle('open')

        if (sortContainer.classList.contains('open')) {
            const firstOption = sortContainer.querySelector('.sorting-ul li:first-child')
            if (firstOption) {
                firstOption.focus()
                firstOption.classList.add('focused')
            }
        }

        iconQuery.classList.toggle('icon-rotate')
        if (sortContainer.classList.contains('open')) {
            sortQuery.forEach((sort) => {
                sort.removeEventListener('keydown', handleClick)
                sort.addEventListener('keydown', (e) =>{
                    if (e.key === 'Enter') {
                        handleClick(e)
                    }
                })
            })
        }
    } else if (e.key === 'ArrowUp' && sortContainer.classList.contains('open')) {
        const currentOption = sortContainer.querySelector('.sorting-ul li[aria-selected="true"]')
        const previousOption = currentOption.previousElementSibling
        if (previousOption) {
            currentOption.setAttribute('aria-selected', 'false')
            previousOption.setAttribute('aria-selected', 'true')
            previousOption.classList.add('focused')
            currentOption.classList.remove('focused')
            previousOption.focus()
        }
    } else if (e.key === 'ArrowDown' && sortContainer.classList.contains('open')) {
        const currentOption = sortContainer.querySelector('.sorting-ul li[aria-selected="true"]')
        const nextOption = currentOption.nextElementSibling
        if (nextOption) {
            currentOption.setAttribute('aria-selected', 'false')
            nextOption.setAttribute('aria-selected', 'true')
            nextOption.classList.add('focused')
            currentOption.classList.remove('focused')
            nextOption.focus()
        }
    }
})
/**
 *
 *
 * @param {*} target
 * @param {*} values
 */
const hiddenToggle = (target, values) => {
    values.forEach((value) => target.classList.toggle(value))
}
