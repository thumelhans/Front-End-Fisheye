/**
*
*
* @class MediumCard
*/
class MediumCard {
    /**
     * Creates an instance of MediumCard.
     * @param {*} photo
     * @memberof MediumCard
     */
    constructor(photo) {
        this._photo = photo
        this._photographerId = photo.photographerId
        this._photoType = photo.image.type
    }
    /**
    *
    *
    * @return {*}
    * @memberof MediumCard
    */
    createCard() {
        const container = document.createElement('article')
        container.classList.add('media-content')
        Object.assign(container, {
            role: 'article',
            ariaLabel: this._photo.title,
        })
        container.dataset.likes = `${this._photo.likes}`
        container.dataset.date = `${this._photo.date}`
        container.dataset.title = `${this._photo.title}`
        container.dataset.id = `${this._photo.id}`
        container.dataset.type = this._photo.video ? 'video' : 'photo'

        const mediaCard = `
            <div class="medium-container" aria-label="Représente la ${this._photoType ===
                'video' ? 'vidéo' : 'photo'} ${this._photo.title}">
                ${this._photoType ===
                    'video' ? '<i class="fa-solid fa-video"></i>' : ''}
                <img src="${this._photo.thumbnail}" alt="${this._photo.title}" tabindex="0">
            </div>
            <div class="media-info">
                <p>${this._photo.title}</p>
                <div class="media-likes" role="group" aria-label="Informations de la ${this._photoType ===
                    'video' ? 'vidéo' : 'photo'}">
                    <p class="likes-number-${this._photo.id}" aria-live="polite" aria-atomic="true">
                        ${this._photo.likes}
                    </p>
                    <p>
                        <i class="fa-solid fa-heart" id="${this._photo.id}" aria-label="Ajouter un j'aime"></i>
                    </p>
                </div>
            </div>
        `

        container.innerHTML = mediaCard
        return container
    }

    /**
    *
    *
    * @return {*}
    * @memberof MediumCard
    */
    carouselCard() {
        const container = document.createElement('article')
        container.classList.add('carousel-media')
        Object.assign(container, {
            role: 'article',
            ariaLabel: this._photo.title,
        })
        container.dataset.title = `${this._photo.title}`
        container.dataset.id = `${this._photo.id}`

        let mediaContent
        if (this._photo.image.type === 'video') {
            mediaContent = `
                <video src=" ${this._photo.image.path}" controls aria-label="${this._photo.title}"></video>`
        } else {
            mediaContent = `<img src=" ${this._photo.image.path}" alt="${this._photo.title}">`
        }

        const carouselCard = `
        ${mediaContent}
        <div class="media-info" role="presentation">
            <h2 role="heading" aria-level="2">${this._photo.title}</h2>
        </div>
        `

        container.innerHTML = carouselCard
        return container
    }
}
