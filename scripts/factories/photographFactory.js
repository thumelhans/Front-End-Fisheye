/**
 * Classe construisant les datas selon si c'est une requête pour les médium ou les photographes en s'appuyant sur l'API
 *
 * @class PhotographFactory
 */
class PhotographFactory {
    /**
     * Creates an instance of PhotographFactory.
     * @param {*} data Correspond au getPhotographer ou au getMedium d'api.js
     * @param {*} type Permet de faire le choix entre les data Medium et Photographe
     * @memberof PhotographFactory
     */
    constructor(data, type) {
        if (type === 'photographers') {
            return new Photographer(data)
        } else if (type === 'media') {
            return new Photo(data)
        } else {
            throw new Error('Unknown type of data')
        }
    }
}
