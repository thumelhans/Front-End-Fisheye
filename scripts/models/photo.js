/**
 *
 *
 * @class Photo
 */
class Photo {
    /**
     * Creates an instance of Photo.
     * @param {*} data
     * @memberof Photo
     */
    constructor(data) {
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

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get photographerId() {
        return this._photographerId
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get id() {
        return this._id
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get title() {
        return this._title
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get image() {
        if (this._video) {
            return {
                type: 'video',
                path: `${this._mediaPath}/${this._video}`,
            }
        } else {
            return {
                type: 'image',
                path: `${this._mediaPath}/${this._image}`,
            }
        }
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get thumbnail() {
        if (this._video) {
            this.videoThumbnail = this._video.replace('mp4', 'jpg')
            return `${this._mediaPath}/thumbnail/thumb_${this.videoThumbnail}`
        } else {
            return `${this._mediaPath}/thumbnail/thumb_${this._image}`
        }
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get likes() {
        return this._likes
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get price() {
        return this._price
    }

    /**
     *
     *
     * @readonly
     * @memberof Photo
     */
    get date() {
        return this._date
    }

    /**
    *
    * @param {*} elem
    * @memberof Photo
    */
    set addLikes(elem) {
        this._likes = elem
    }
}
