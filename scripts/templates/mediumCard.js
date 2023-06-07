class MediumCard{
    constructor(photo){
        this._photo = photo
    }

    createCard(){
        const container = document.createElement('article') 
        container.classList.add("media-content", this._photo.id)

        const mediaCard = `
            <img src="${this._photo.image}" alt="">
            <div class="media-info">
                <p>${this._photo.title}</p>
                <p>${this._photo.likes} <i class="fa-solid fa-heart"></i></p>
            </div>
        `

        container.innerHTML = mediaCard
        return container
    }

    likeCounter(nmbOfLike){
        /*TODO Faire le module du calcul du nombre de like et le TJM*/
    }
}