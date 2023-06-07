class App {
    constructor(){
        this._containerQuerry = document.querySelector('.photographer_section')
        this._photographers = new PhotographerApi("/data/photographers.json")
        this._medium = new MediumApi("/data/photographers.json")
    }

    async main(){
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()

        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))

        photographers.forEach(photograph => {
            //Tu me présente sa card
            const template = new PhotographCard(photograph)
            this._containerQuerry.appendChild(template.createCard())
        });
        medium.forEach(element => {
        });
    }

}

const app = new App()
app.main()