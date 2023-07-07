/**
 *
 *
 * @class Photographer
 */
class Photographer {
    /**
     * Creates an instance of Photographer.
     * @param {*} data
     * @memberof Photographer
     */
    constructor(data) {
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait.split('.')
        this._portraitPath = `./assets/photographers/${this._id}/portrait`
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get name() {
        return this._name
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get id() {
        return this._id
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get city() {
        return this._city
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get country() {
        return this._country
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get tagline() {
        return this._tagline
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get price() {
        return this._price
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get portrait() {
        return `${this._portraitPath}/${this._portrait[0]}.jpg`
    }

    /**
     *
     *
     * @readonly
     * @memberof Photographer
     */
    get thumbnail() {
        return `${this._portraitPath}/${this._portrait[0]}_thumbnail.jpg`
    }
}
