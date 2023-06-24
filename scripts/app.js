class App {
    constructor(){
        this._locationUrl = window.location
        this._idUrl = this._locationUrl.search.split("=")
        this._indexContainerQuery = document.querySelector('.photographer_section')
        this._photographerContainerQuery = document.querySelector('.photograph-header')
        this._mediaContainerQuery = document.querySelector(".media-container")
        this._counterQuery = document.querySelector(".likes-container")
        this._photographers = new PhotographerApi("/data/photographers.json")
        this._medium = new MediumApi("/data/photographers.json")
    }
    
    async main(){

        //Nettoyage du session storage pour éviter tout effet de bord. //TODO temp et gérer les likes quand on part/revient sur la page
        window.addEventListener('beforeunload', function() {
            sessionStorage.clear();
        });
        
        //Récupération des informations présent dans le fichier JSON
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()
        
        //construction d'un tableau contenant tous les photographes et un tableau de tous les médium
        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))
        
        // Mise en place de la carte de chage photographe et de leur profil sur leur page respective
        photographers.forEach(photograph => {
            const template = new PhotographCard(photograph)
            if(this._locationUrl.pathname === "/index.html"){
                this._indexContainerQuery.appendChild(template.createCard())
            }
            if(photograph._id === parseInt(this._idUrl[1])){
                template.createProfile(this._photographerContainerQuery)
                this._counterQuery.append(`${photograph.price}€/jour`)
            }            
        });
        
        // Mise en place de l'appercu des photos du photographe
        let likesArray = []
        let carouselCard = []
        medium.forEach(element => {
            const template = new MediumCard(element)
            if(element.photographerId === parseInt(this._idUrl[1])){
                this._mediaContainerQuery.appendChild(template.createCard())
                let likeObject = {"photoID": element.id, "numOfLike": element.likes} 
                likesArray.push(likeObject)
                carouselCard.push(template.carouselCard())
            }
        });
        

        // Mise en place de la gestion des likes
        const likesManagement = new Likes(likesArray)
        let sum = likesManagement.sumOfLikes()
        if(this._counterQuery){
            this._counterQuery.prepend(likesManagement.createLikeNode(sum))
        }
        
        const likeIconQuery = document.querySelectorAll(".fa-heart")
        
        //Event listener gerant l'ajout ou le retrait de like sur une photo
        likeIconQuery.forEach(elem => {
            elem.addEventListener("click", async (e) => {
                e.preventDefault();
                
                const selectedPhotoId = parseInt(elem.id);
                const sessionElem = sessionStorage.getItem(elem.id);
                
                let newLikes;
                
                if (sessionElem == null) {
                    
                    mediumData.forEach(mediumElem => {
                        newLikes = mediumElem.likes;
                        
                        if (mediumElem.id === selectedPhotoId) {
                            newLikes++;                         
                            
                            const likesArrayIndex = likesArray.indexOf(likesArray.find(elem => parseInt(elem.photoID) == selectedPhotoId))
                            likesArray[likesArrayIndex].numOfLike++
                            medium.forEach(elem => {
                                if (elem.id === selectedPhotoId) {
                                    elem.addLikes = newLikes;
                                    likesManagement.addLike(elem);
                                }
                            });
                        }
                    });
                    
                    sum = likesManagement.sumOfLikes()
                    likesManagement.updateLikeNode(sum)
                    elem.classList.add("liked");
                } else {
                    mediumData.forEach(mediumElem => {
                        newLikes = mediumElem.likes;
                        
                        if (mediumElem.id === selectedPhotoId) {
                            
                            const likesArrayIndex = likesArray.indexOf(likesArray.find(elem => parseInt(elem.photoID) == selectedPhotoId))
                            likesArray[likesArrayIndex].numOfLike--
                            medium.forEach(elem => {
                                if (elem.id === selectedPhotoId) {
                                    elem.addLikes = newLikes;
                                    likesManagement.substractLike(elem);
                                }
                            });
                        }
                    });
                    
                    sum = likesManagement.sumOfLikes()
                    likesManagement.updateLikeNode(sum)
                    elem.classList.remove("liked");
                }
            });
        });

        const sendingContactButton = document.querySelector(".contact_modal")

        if(sendingContactButton){
            sendingContactButton.addEventListener("click", (e)=>{
                if(e.target.matches(".contact_send")){
                    e.preventDefault()
                    sendContact()
                }
            })
        }

        const yeswecan = document.querySelectorAll('.media-content')
        const closeCarousel = document.querySelector('.carousel-container button')
        const nextCarousel = document.querySelector('.next-previous')
        
        const carouselModal = new Carousel(carouselCard)
        yeswecan.forEach(elem => {
            
            elem.addEventListener("click", e =>{
                e.preventDefault()

                if(e.target.tagName !== 'I'){
                    carouselModal.displayModal()
                    carouselModal.createCarousel(elem.dataset.id)
                }
            })
        })

        nextCarousel.addEventListener("click", e =>{
            e.preventDefault()
            
            
            if(e.target.classList.contains('fa-chevron-right')){    
                carouselModal.nextMedia()
            }
            if(e.target.classList.contains('fa-chevron-left')){
                carouselModal.previousMedia()
            }

        })

        closeCarousel.addEventListener("click", e => {
            e.preventDefault()
            
            carouselModal.closeModal()
        })

    }
}

const app = new App()
app.main()