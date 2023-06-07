class App {
    constructor(){
        this._photographers = new PhotographerApi("/data/photographers.json")
        this._medium = new MediumApi("/data/photographers.json")
    }

    async main(){
        const photographerData = await this._photographers.getPhotographer()
        console.log(photographerData)
        const mediumData = await this._medium.getMedium()
        console.log(mediumData)

        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        console.log(photographers)
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))
        console.log(medium)

        photographers.forEach(element => {
            console.log('test', element._id)
        });
        medium.forEach(element => {
            console.log('test', element._photographerId)
        });
    }

}

const app = new App()
app.main()