/**
 * Classe gérant la création et la manipulation du carousel
 *
 * @class Carousel
 */
class Carousel {
    /**
     * Creates an instance of Carousel.
     * @param {*} contentArray Tableau des photos/vidéo
     * @memberof Carousel
     */
    constructor(contentArray) {
        this._modalQuery = document.querySelector('.carousel_modal')
        this._modalContainer = document.querySelector('.carousel-container')
        this._modalContent = contentArray
        this._mediaIndex = null
        this._modalVisible = false
    }

    /**
     *
     *
     * @memberof Carousel
     */
    displayModal() {
        this._modalContainer.classList.add('modal-display')
        this._modalQuery.classList.add('modal-display')
        this._modalVisible = true
    }

    /**
     *
    *
    * @memberof Carousel
    */
    closeModal() {
        this._modalContainer.classList.remove('modal-display')
        this._modalQuery.classList.remove('modal-display')
        this._modalVisible = false
        const carouselMediaQuery = document.querySelector('.carousel-media')
        carouselMediaQuery.remove()
    }

    /**
     *
     *
     * @param {*} photoId
     * @memberof Carousel
     */
    createCarousel(photoId) {
        this._modalContent.forEach((element) => {
            if (photoId === element.dataset.id) {
                this._modalContainer.append(element)
                this._mediaIndex = this._modalContent.indexOf(element)
            }
        })
    }

    /**
     *
     *
     * @memberof Carousel
     */
    nextMedia() {
        this._modalContent[this._mediaIndex].remove()
        this._mediaIndex++

        if (this._mediaIndex >= this._modalContent.length) {
            this._mediaIndex = 0
        }

        this._modalContainer.append(this._modalContent[this._mediaIndex])
    }

    /**
     *
     *
     * @memberof Carousel
     */
    previousMedia() {
        this._modalContent[this._mediaIndex].remove()
        this._mediaIndex--

        if (this._mediaIndex < 0) {
            this._mediaIndex = this._modalContent.length-1
        }

        this._modalContainer.append(this._modalContent[this._mediaIndex])
    }

    /**
     *
     *
     * @return {_modalVisible} State of Visibility
     * @memberof Carousel
     */
    isModalVisible() {
        return this._modalVisible
    }
}
