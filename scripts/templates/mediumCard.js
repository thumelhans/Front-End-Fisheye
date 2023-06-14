class MediumCard{
    constructor(photo){
        this._photo = photo
        this._photographerId = photo.photographerId
    }


    createCard(){
        const container = document.createElement('article') 
        container.classList.add("media-content", this._photo.id)

        const mediaCard = `
            <img src="${this._photo.thumbnail}" alt="">
            <div class="media-info">
                <p>${this._photo.title}</p>
                <div class="media-likes">
                    <p class="likes-number-${this._photo.id}">${this._photo.likes}</p><p><i class="fa-solid fa-heart" id="${this._photo.id}"></i></p>
                </div>
            </div>
        `

        container.innerHTML = mediaCard
        return container
    }
}