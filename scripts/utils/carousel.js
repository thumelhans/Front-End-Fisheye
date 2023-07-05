/**
 *
 *
 * @class Carousel
 */
class Carousel {
    /**
     * Creates an instance of Carousel.
     * @param {*} contentArray
     * @memberof Carousel
     */
    constructor(contentArray) {
        this._modalQuery = document.querySelector('.carousel_modal')
        this._modalContainer = document.querySelector('.carousel-container')
        this._modalContent = contentArray
        this._mediaIndex = null
    }

    /**
     *
     *
     * @memberof Carousel
     */
    displayModal() {
        this._modalContainer.classList.add('modal-display')
        this._modalQuery.classList.add('modal-display')
    }

    /**
     *
    *
    * @memberof Carousel
    */
    closeModal() {
        this._modalContainer.classList.remove('modal-display')
        this._modalQuery.classList.remove('modal-display')
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
}
