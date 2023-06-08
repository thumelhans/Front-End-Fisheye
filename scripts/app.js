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
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()

        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))
        
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
        
        let likesArray = []
        medium.forEach(element => {
            const template = new MediumCard(element)
            if(element.photographerId === parseInt(this._idUrl[1])){
                this._mediaContainerQuery.appendChild(template.createCard())
                let likeObject = {"photoID": element.id, "numOfLike": element.likes} 
                likesArray.push(likeObject)
            }
        });
        
        const likesManagement = new Likes(likesArray)
        const sum = likesManagement.sumOfLikes()
        this._counterQuery.prepend(likesManagement.createLikeNode(sum))
        
        const likeIconQuery = document.querySelectorAll(".fa-heart")
        
        likeIconQuery.forEach(elem =>{
            elem.addEventListener("click", (e)=>{
                
                e.preventDefault()
                
                const selectedPhotoId = parseInt(elem.id)
                const sessionElem = sessionStorage.getItem(elem.id)
                const test = document.querySelector(`#elem.id`)
                
                let newLikes
                if(sessionElem == null){
                    console.log('elem', elem)
                    mediumData.forEach(async elem => {
                        newLikes = elem.likes
                        if(elem.id === selectedPhotoId){
                            newLikes++
                            medium.forEach(elem => {
                                if(elem.id === selectedPhotoId){
                                    elem.addLikes = newLikes
                                    likesManagement.addLike(elem)
                                }
                            })
                        }
                    })
                    elem.classList.add("liked")
                }else{
                    mediumData.forEach(async elem => {
                        newLikes = elem.likes
                        if(elem.id === selectedPhotoId){
                            
                            medium.forEach(elem => {
                                if(elem.id === selectedPhotoId){
                                    elem.addLikes = newLikes
                                    likesManagement.substractLike(elem)
                                }
                            })
                        }
                    })
                    elem.classList.remove("liked")
                }
            })
        })
    }
}

const app = new App()
app.main()