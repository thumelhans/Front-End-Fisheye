/**
 *
 *
 * @class Api
 */
class Api {
    /**
     * Creates an instance of Api.
     * @param {*} url
     * @memberof Api
     */
    constructor(url) {
        this._url = url
    }

    /**
     *
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
 *
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
     *
     *
     * @return {*}
     * @memberof PhotographerApi
     */
    async getPhotographer() {
        return await this.get().then((res) => res.photographers)
    }
}

/**
 *
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
     *
     *
     * @return {*}
     * @memberof MediumApi
     */
    async getMedium() {
        return await this.get().then((res) => res.media)
    }
}
