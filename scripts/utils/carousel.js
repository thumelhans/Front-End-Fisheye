class Carousel {
    constructor(contentArray){
        this._modalQuery = document.querySelector('.carousel_modal')
        this._modalContainer = document.querySelector('.carousel-container')
        this._modalContent = contentArray
        this._mediaIndex = null
    }

    displayModal() {
        this._modalQuery.classList.add('modal-display')
    }
    
    closeModal() {
        this._modalQuery.classList.remove('modal-display')
        const carouselMediaQuery = document.querySelector('.carousel-media')
        carouselMediaQuery.remove()
    }

    createCarousel(photoId){

        this._modalContent.forEach(element => {
            if(photoId === element.dataset.id){
                this._modalContainer.append(element)
                this._mediaIndex = this._modalContent.indexOf(element)
            }
        });
    }

    nextMedia(){
        this._modalContent[this._mediaIndex].remove()
        this._mediaIndex++

        if(this._mediaIndex >= this._modalContent.length){
            this._mediaIndex = 0
        }

        this._modalContainer.append(this._modalContent[this._mediaIndex])
    }
    
    previousMedia(){
        this._modalContent[this._mediaIndex].remove()
        this._mediaIndex--

        if(this._mediaIndex < 0){
            this._mediaIndex = this._modalContent.length-1
        }

        this._modalContainer.append(this._modalContent[this._mediaIndex])
    }

}