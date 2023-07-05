/**
*
*
* @class App
*/
class App {
    /**
    * Creates an instance of App.
    * @memberof App
    */
    constructor() {
        this._locationUrl = window.location
        this._deployedProject = '/Front-End-Fisheye'
        this._idUrl = this._locationUrl.search.split('=')
        this._indexContainerQuery = document.querySelector('.photographer_section')
        this._photographerContainerQuery = document.querySelector('.photograph-header')
        this._mediaContainerQuery = document.querySelector('.media-container')
        this._counterQuery = document.querySelector('.likes-container')
        this._photographers = new PhotographerApi('./data/photographers.json')
        this._ghpPhotographers = new PhotographerApi(`./${this._deployedProject}/photographers.json`)
        this._medium = new MediumApi('./data/photographers.json')
        this._ghpMedium = new MediumApi(`./${this._deployedProject}/photographers.json`)
    }

    /**
    *
    *
    * @memberof App
    */
    async main() {
        // Récupération des informations présent dans le fichier JSON
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()

        console.log(photographerData)
        console.log(mediumData)
        console.log(this._locationUrl)
        console.log(this._locationUrl.pathname)
        console.log(this._idUrl)

        // construction du tableau des photographes et des médium
        const photographers = photographerData.map((photograph) => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map((media) => new PhotographFactory(media, 'media'))

        console.log(photographers)
        console.log(medium)

        // Mise en place de la carte de chage photographe et de leur profil sur leur page respective
        if (
            this._locationUrl.pathname === `/` ||
            this._locationUrl.pathname === '/index.html' ||
            this._locationUrl.pathname === `${this._deployedProject}/` ||
            this._locationUrl.pathname === `${this._deployedProject}/index.html`) {
            photographers.forEach((photograph) => {
                console.log(photograph)
                const template = new PhotographCard(photograph)
                console.log(template)
                this._indexContainerQuery.appendChild(template.createCard())
            })
        } else {
            photographers.forEach((photograph) => {
                const template = new PhotographCard(photograph)
                if (photograph._id === parseInt(this._idUrl[1])) {
                    template.createProfile(this._photographerContainerQuery)
                    this._counterQuery.append(`${photograph.price}€/jour`)
                }
            })
        }

        // Mise en place de l'appercu des photos du photographe
        const likesArray = []
        const carouselCard = []
        medium.forEach((element) => {
            const template = new MediumCard(element)
            if (element.photographerId === parseInt(this._idUrl[1])) {
                this._mediaContainerQuery.appendChild(template.createCard())
                const likeObject = {'photoID': element.id, 'numOfLike': element.likes}
                likesArray.push(likeObject)
                carouselCard.push(template.carouselCard())
            }
        })

        // Mise en place de la gestion des likes
        const likesManagement = new Likes(likesArray)
        let sum = likesManagement.sumOfLikes()
        if (this._counterQuery) {
            this._counterQuery.prepend(likesManagement.createLikeNode(sum))
        }

        const likeIconQuery = document.querySelectorAll('.fa-heart')

        // Event listener gerant l'ajout ou le retrait de like sur une photo
        likeIconQuery.forEach((elem) => {
            elem.addEventListener('click', async (e) => {
                e.preventDefault()

                const selectedPhotoId = parseInt(elem.id)
                const sessionElem = sessionStorage.getItem(elem.id)
                let newLikes

                if (sessionElem == null) {
                    mediumData.forEach((mediumElem) => {
                        newLikes = mediumElem.likes

                        if (mediumElem.id === selectedPhotoId) {
                            newLikes++

                            const likesArrayIndex =
                                likesArray.indexOf(likesArray.find((elem) => parseInt(elem.photoID) == selectedPhotoId))
                            likesArray[likesArrayIndex].numOfLike++
                            medium.forEach((elem) => {
                                if (elem.id === selectedPhotoId) {
                                    elem.addLikes = newLikes
                                    likesManagement.addLike(elem)
                                }
                            })
                        }
                    })

                    sum = likesManagement.sumOfLikes()
                    likesManagement.updateLikeNode(sum)
                } else {
                    mediumData.forEach((mediumElem) => {
                        newLikes = mediumElem.likes

                        if (mediumElem.id === selectedPhotoId) {
                            const likesArrayIndex =
                                likesArray.indexOf(likesArray.find((elem) => parseInt(elem.photoID) == selectedPhotoId))
                            likesArray[likesArrayIndex].numOfLike--
                            medium.forEach((elem) => {
                                if (elem.id === selectedPhotoId) {
                                    elem.addLikes = newLikes
                                    likesManagement.substractLike(elem)
                                }
                            })
                        }
                    })

                    sum = likesManagement.sumOfLikes()
                    likesManagement.updateLikeNode(sum)
                }

                elem.classList.toggle('clicked')
            })
        })

        // Gestion du bouton d'envoie du formulaire
        const sendingContactButton = document.querySelector('.contact_modal')

        if (sendingContactButton) {
            sendingContactButton.addEventListener('click', (e)=>{
                if (e.target.matches('.contact_send')) {
                    e.preventDefault()
                    sendContact()
                }
            })
        }

        // Gestion de la lightbox affichant les photos une par une.
        if (this._idUrl.length > 1) {
            const mediumContentQuery = document.querySelectorAll('.media-content')

            const carouselModal = new Carousel(carouselCard)
            mediumContentQuery.forEach((elem) => {
                elem.addEventListener('click', (e) =>{
                    e.preventDefault()

                    if (e.target.tagName !== 'I') {
                        carouselModal.displayModal()
                        carouselModal.createCarousel(elem.dataset.id)
                    }
                })
            })

            const closeCarousel = document.querySelector('.carousel-container button')
            const nextPreviousCarousel = document.querySelector('.next-previous')

            /**
             *
            *
            * @param {*} e
            */
            function nextPrevious(e) {
                e.preventDefault()

                if (e.target.classList.contains('fa-chevron-right')) {
                    carouselModal.nextMedia()
                }
                if (e.target.classList.contains('fa-chevron-left')) {
                    carouselModal.previousMedia()
                }
            }

            document.addEventListener('keydown', (e) => {
                console.log(e.key)
                if (e.key === 'ArrowRight') {
                    console.log(e.key)
                    carouselModal.nextMedia()
                } else if (e.key === 'ArrowLeft') {
                    console.log(e.key)
                    carouselModal.previousMedia()
                } else if (e.key === 'Escape') {
                    carouselModal.closeModal()
                }
            })

            nextPreviousCarousel.addEventListener('click', nextPrevious)

            closeCarousel.addEventListener('click', (e) => {
                e.preventDefault()

                carouselModal.closeModal()
            })
        }
    }
}

const app = new App()
app.main()
