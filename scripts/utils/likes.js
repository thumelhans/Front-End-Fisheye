/**
 * Class gérant les likes
 *
 * @class Likes
 */
class Likes {
    /**
     * Creates an instance of Likes.
     * @param {*} arrayOfLikes Tableau de la liste des likes selon les photos
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
     * Fonction gérant la somme des like
     *
     * @return {*} La somme des likes
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
     * Fonction gérant la présentation de la somme des likes sur la page du photographe
     *
     * @param {*} sumOfLikes Résultat de la fonction sumOfLikes
     * @return {*} L'élément HTML
     * @memberof Likes
     */
    createLikeNode(sumOfLikes) {
        const likeNode = document.createElement('div')
        likeNode.classList.add('sum-of-likes')

        const photographLikes = `<h2 role="heading" aria-level="2">
            ${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></h2>`

        likeNode.innerHTML= photographLikes

        return likeNode
    }

    /**
     *  Fonction gérant la mise à jour des likes dans le module en bas de la page du photographe
     *
     * @param {*} sumOfLikes Résultat de la fonction sumOfLikes
     * @return {*} L'élément HTML
     * @memberof Likes
     */
    updateLikeNode(sumOfLikes) {
        const likeNode = document.querySelector('.sum-of-likes')

        const photographLikes = `<p>${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></p>`

        likeNode.innerHTML= photographLikes

        return likeNode
    }

    /**
     * Fonction gérant l'ajout d'un like
     *
     * @param {*} photo Identifie sur quel photo a été ajouter le like
     * @return {*} Le mise à jour de l'ajout du like
     * @memberof Likes
     */
    addLike(photo) {
        sessionStorage.setItem(`${photo.id}`, true)
        const likeAddNode = document.querySelector(`.likes-number-${photo.id}`)
        likeAddNode.textContent = photo.likes

        return likeAddNode
    }

    /**
     *  Fonction gérant le retrait d'un like
     *
     * @param {*} photo Identifie sur quel photo a été retirer le like
     * @return {*} La mise à jour du retrait du like
     * @memberof Likes
     */
    substractLike(photo) {
        sessionStorage.removeItem(`${photo.id}`)
        const likeSubNode = document.querySelector(`.likes-number-${photo.id}`)
        likeSubNode.textContent = photo.likes

        return likeSubNode
    }
}
