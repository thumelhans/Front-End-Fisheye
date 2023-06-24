class MediumCard{
    constructor(photo){
        this._photo = photo
        this._photographerId = photo.photographerId
        this._photoType = photo.image.type
    }
    
    createCard(){
        const container = document.createElement('article') 
        container.classList.add("media-content")
        container.dataset.likes = `${this._photo.likes}`
        container.dataset.date = `${this._photo.date}`
        container.dataset.title = `${this._photo.title}`
        container.dataset.id = `${this._photo.id}`
        container.dataset.type = this._photo.video ? 'video' : 'photo'

        const mediaCard = `
            ${this._photoType === 'video' ? '<i class="fa-solid fa-video"></i>' : ''}
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

    //TODO dois-je passer par le constructor Medium Card, alors que j'ai tous les éléments nécessaire?

    carouselCard() {
        const container = document.createElement('article');
        container.classList.add("carousel-media")
        container.dataset.title = `${this._photo.title}`
        container.dataset.id = `${this._photo.id}`

        let mediaContent      
        if(this._photo.image.type === "video"){
            mediaContent = `<video src="${this._photo.image.path}" controls></video>`
        }else{
            mediaContent = `<img src="${this._photo.image.path}" alt="">`;
        }
      
        const carouselCard = `
          ${mediaContent}
          <div class="media-info">
            <p>${this._photo.title}</p>
          </div>
        `;
      
        container.innerHTML = carouselCard;
        return container;
      }


}