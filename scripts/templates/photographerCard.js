/**
 *
 *
 * @class PhotographCard
 */
class PhotographCard {
    /**
     * Creates an instance of PhotographCard.
     * @param {*} photograph
     * @memberof PhotographCard
     */
    constructor(photograph) {
        this._photograph = photograph
    }

    /**
     *
     *
     * @return {*}
     * @memberof PhotographCard
     */
    createCard() {
        console.log('createCard est bien appelé: ', this._photograph)

        const container = document.createElement('article')
        container.classList.add('photographer', this._photograph.id)

        const photographCard = `
            <a href="photographer.html?id=${this._photograph.id}">
                <img src="${this._photograph.thumbnail}" alt="">
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

    /**
     *
     *
     * @param {*} querry
     * @memberof PhotographCard
     */
    createProfile(querry) {
        const infoContainer = document.createElement('article')
        const photoContainer = document.createElement('article')

        const photographInfoHTML = `
            <h2 class="profile-name">
               ${this ._photograph.name}
            </h2>
            <p class="profile-place">${this._photograph.city}, ${this._photograph.country}</p>
            <p class="profile-tagline">${this._photograph.tagline}</p>
        `
        const photographProfileImageHTML = `
            <img src="${this._photograph.thumbnail}" alt="">
        `

        infoContainer.innerHTML = photographInfoHTML
        photoContainer.innerHTML = photographProfileImageHTML

        querry.append(photoContainer)
        querry.prepend(infoContainer)
    }
}
