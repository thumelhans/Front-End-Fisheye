class PhotographCard{
    constructor(photograph){
        this._photograph = photograph
    }

    createCard(){
        const container = document.createElement('article') 
        container.classList.add("photographer", this._photograph.id)

        const photographCard = `
            <a href=#>
                <img src="/assets/photographers/photographers_profil_picture/${this._photograph.portrait}" alt="">
                <h2 class="photographer-name">
                    ${this._photograph.name}
                </h2>
                <p class="photographer-place">${this._photograph.city}, ${this._photograph.country}</p>
                <p class="photographer-tagline">${this._photograph.tagline}</p>
                <p class="photographer-price">${this._photograph.price}€/jour</p>
            </a>
        `

        container.innerHTML = photographCard
        return container
    }
}