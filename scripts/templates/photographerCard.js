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
        const container = document.createElement('article')
        container.classList.add('photographer', this._photograph.id)
        Object.assign(container, {
            role: 'article',
            ariaLabel: this._photograph.name,
        })

        const photographCard = `
            <a href="photographer.html?id=${this._photograph.id}" role="link" 
                    aria-label="Lien vers la page de ${this._photograph.name}">
                <img src="${this._photograph.thumbnail}" alt="${this._photograph.name}">
                <h2 class="photographer-name" role="heading" aria-level="2">
                    ${this._photograph.name}
                </h2>
                <p class="photographer-place" aria-label="Lieu: ${this._photograph.city}, ${this._photograph.country}">
                    ${this._photograph.city}, ${this._photograph.country}</p>
                <p class="photographer-tagline" aria-label="Citation: ${this._photograph.tagline}">
                    ${this._photograph.tagline}</p>
                <p class="photographer-price" aria-label="Prix: ${this._photograph.price}">
                    ${this._photograph.price}€/jour</p>
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
        Object.assign(infoContainer, {
            role: 'article',
            ariaLabel: `Informations sur ${this._photograph.name}`,
        })
        const photoContainer = document.createElement('article')
        Object.assign(photoContainer, {
            role: 'article',
            ariaLabel: this._photograph.name,
        })

        const photographInfoHTML = `
            <h2 class="profile-name" role="heading" aria-level="2" arial-label="${this ._photograph.name}">
               ${this ._photograph.name}
            </h2>
            <p class="profile-place" aria-label="${this._photograph.city}, ${this._photograph.country}">
                ${this._photograph.city}, ${this._photograph.country}</p>
            <p class="profile-tagline" aria-label="Citation: ${this._photograph.tagline}">
                ${this._photograph.tagline}</p>
        `
        const photographProfileImageHTML = `
            <img src="${this._photograph.thumbnail}" alt="${this._photograph.name}">
        `

        infoContainer.innerHTML = photographInfoHTML
        photoContainer.innerHTML = photographProfileImageHTML

        querry.append(photoContainer)
        querry.prepend(infoContainer)
    }
}
