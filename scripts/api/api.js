/**
 * Class récupérant les données dans le fichier ./data/photographers.json
 *
 * @class Api
 */
class Api {
    /**
     * Creates an instance of Api.
     * @param {*} url destination du fichier JSON
     * @memberof Api
     */
    constructor(url) {
        this._url = url
    }

    /**
     * Récupère la promesses des datas
     *
     * @return {*}
     * @memberof Api
     */
    async get() {
        return fetch(this._url)
            .then((res) => res.json())
            .catch((err) => console.log('An error occured', err))
    }
}

/**
 * Traîte les données des photographes
 *
 * @class PhotographerApi
 * @extends {Api}
 */
class PhotographerApi extends Api {
    /**
     * Creates an instance of PhotographerApi.
     * @param {*} url
     * @memberof PhotographerApi
     */
    constructor(url) {
        super(url)
    }

    /**
     * Récupère les datas des photographes
     *
     * @return {*}
     * @memberof PhotographerApi
     */
    async getPhotographer() {
        return await this.get().then((res) => res.photographers)
    }
}

/**
 * Traîte les données des médium (photos et vidéos)
 *
 * @class MediumApi
 * @extends {Api}
 */
class MediumApi extends Api {
    /**
     * Creates an instance of MediumApi.
     * @param {*} url
     * @memberof MediumApi
     */
    constructor(url) {
        super(url)
    }

    /**
     * Récupère les datas photos et vidéos
     *
     * @return {*}
     * @memberof MediumApi
     */
    async getMedium() {
        return await this.get().then((res) => res.media)
    }
}
