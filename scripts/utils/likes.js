class Likes {
    constructor(arrayOfLikes){
        this._arrayOfLikes = arrayOfLikes
    }

    get arrayOfLikes() {
        return this._arrayOfLikes
    }

    sumOfLikes(){
        let sumOfLikes = 0
        this._arrayOfLikes.forEach(element => {
            sumOfLikes += element.numOfLike
        });
        return sumOfLikes
    }

    createLikeNode(sumOfLikes){
        const likeNode = document.createElement('div')
        likeNode.classList.add('sum-of-likes')

        const photographLikes = `<p>${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></p>`;

        likeNode.innerHTML= photographLikes
        
        return likeNode
    }
    
    updateLikeNode(sumOfLikes){
        const likeNode = document.querySelector('.sum-of-likes')
        
        const photographLikes = `<p>${sumOfLikes} <i class="fa-solid fa-heart" id="sum-of-like"></i></p>`;

        likeNode.innerHTML= photographLikes
        
        return likeNode
    }

    addLike(photo){
        
        sessionStorage.setItem(`${photo.id}`, true)
        const likeAddNode = document.querySelector(`.likes-number-${photo.id}`)
        likeAddNode.textContent = photo.likes
      
        return likeAddNode
    }
    
    substractLike(photo){
        sessionStorage.removeItem(`${photo.id}`)
        const likeSubNode = document.querySelector(`.likes-number-${photo.id}`)
        likeSubNode.textContent = photo.likes
      
        return likeSubNode
    }
}