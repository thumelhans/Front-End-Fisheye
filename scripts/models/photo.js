class Photo {
    constructor(data){
        this._photographerId = data.photographerId
        this._id = data.id
        this._title = data.title
        this._image = data.image
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
        return this._image
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
}