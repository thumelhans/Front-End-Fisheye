/**
 *
 *
 * @class Likes
 */
class Likes {
    /**
     * Creates an instance of Likes.
     * @param {*} arrayOfLikes
     * @memberof Likes
     */
    constructor(arrayOfLikes) {
        this._arrayOfLikes = arrayOfLikes
    }

    /**
     *
     *
     * @readonly
     * @memberof Likes
     */
    get arrayOfLikes() {
        return this._arrayOfLikes
    }

    /**
     *
     *
     * @return {*}
     * @memberof Likes
     */
    sumOfLikes() {
        let sumOfLikes = 0
        this._arrayOfLikes.forEach((element) => {
            sumOfLikes += element.numOfLike
        })
        return sumOfLikes
    }

    /**
     *
     *
     * @param {*} sumOfLikes
     * @return {*} 
     * @memberof Likes
     */
    createLikeNode(sumOfLikes) {
        const likeNode = document.createElement('div')
        likeNode.classList.add('sum-of-likes')

        const photographLikes = `<p>${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></p>`;

        likeNode.innerHTML= photographLikes

        return likeNode
    }

    /**
     *
     *
     * @param {*} sumOfLikes
     * @return {*} 
     * @memberof Likes
     */
    updateLikeNode(sumOfLikes) {
        const likeNode = document.querySelector('.sum-of-likes')

        const photographLikes = `<p>${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></p>`

        likeNode.innerHTML= photographLikes

        return likeNode
    }

    /**
     *
     *
     * @param {*} photo
     * @return {*} 
     * @memberof Likes
     */
    addLike(photo) {
        sessionStorage.setItem(`${photo.id}`, true)
        const likeAddNode = document.querySelector(`.likes-number-${photo.id}`)
        likeAddNode.textContent = photo.likes

        return likeAddNode
    }

    /**
     *
     *
     * @param {*} photo
     * @return {*} 
     * @memberof Likes
     */
    substractLike(photo) {
        sessionStorage.removeItem(`${photo.id}`)
        const likeSubNode = document.querySelector(`.likes-number-${photo.id}`)
        likeSubNode.textContent = photo.likes

        return likeSubNode
    }
}
