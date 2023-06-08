class Api{
    constructor(url){
        this._url = url
    }

    async get(){

        return fetch(this._url)
            .then(res => res.json())
            .catch(err => console.log('An error occured', err))
    }
    
}

class PhotographerApi extends Api{
    constructor(url){
        super(url)
    }

    async getPhotographer(){
        return await this.get().then(res => res.photographers)
    }
}

class MediumApi extends Api{
    constructor(url){
        super(url)
    }

    async getMedium(){
        return await this.get().then(res => res.media)
    }
}