class Photo {
    constructor(data){
        this._photographerId = data.photographerId
        this._id = data.id
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._mediaPath = `/assets/photographers/${this._photographerId}`
        this._likes = data.likes
        this._price = data.price
        this._date = data.date
    }

    get photographerId(){
        return this._photographerId
    }

    get id(){
        return this._id
    }

    get title(){
        return this._title
    }

    get image(){
        if(this._video){
            return{
                type: "video",
                path: `${this._mediaPath}/${this._video}`
            } 
        }else{
            return {
                type: "image",
                path: `${this._mediaPath}/${this._image}`
            }
            
        }
    }
    
    get thumbnail(){
        if(this._video){
            this.videoThumbnail = this._video.replace("mp4", "jpg");
            return `${this._mediaPath}/thumbnail/thumb_${this.videoThumbnail}`;
        }else{
            return `${this._mediaPath}/thumbnail/thumb_${this._image}`
        }
    }
    
    get likes(){
        return this._likes
    }
    
    get price(){
        return this._price
    }
    
    get date(){
        return this._date
    }

    set addLikes(elem) {
          this._likes = elem
      }
}