class Photographer {
    constructor(data){
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait.split(".") //TODO Pourquoi le split fonctionne ici et pas dans photo.js?
        this._portraitPath = `/assets/photographers/${this._id}/portrait`
    }

    get name(){
        return this._name
    }
    get id(){
        return this._id
    }
    get city(){
        return this._city
    }
    get country(){
        return this._country
    }
    get tagline(){
        return this._tagline
    }
    get price(){
        return this._price
    }
    get portrait(){
        return `${this._portraitPath}/${this._portrait[0]}.jpg`
    }
    get thumbnail(){
        return `${this._portraitPath}/${this._portrait[0]}_thumbnail.jpg`
    }
}