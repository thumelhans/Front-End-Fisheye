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
        medium.forEach(element => {
            const template = new MediumCard(element)
            if(element.photographerId === parseInt(this._idUrl[1])){
                this._mediaContainerQuery.appendChild(template.createCard())
                let likeObject = {"photoID": element.id, "numOfLike": element.likes} 
                likesArray.push(likeObject)
            }
        });
        
        // Mise en place de la gestion des likes
        const likesManagement = new Likes(likesArray)
        let sum = likesManagement.sumOfLikes()
        this._counterQuery.prepend(likesManagement.createLikeNode(sum))
        
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

        sendingContactButton.addEventListener("click", (e)=>{
            if(e.target.matches(".contact_send")){
                e.preventDefault()
                sendContact()
            }
        })
    }
}

const app = new App()
app.main()