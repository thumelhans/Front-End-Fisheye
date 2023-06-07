class App {
    constructor(){
        this._locationUrl = window.location
        this._idUrl = this._locationUrl.search.split("=")
        this._indexContainerQuerry = document.querySelector('.photographer_section')
        this._photographerContainerQuerry = document.querySelector('.photograph-header')
        this._photographers = new PhotographerApi("/data/photographers.json")
        this._medium = new MediumApi("/data/photographers.json")
    }

    async main(){
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()

        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))

        console.log(this._idUrl)

        photographers.forEach(photograph => {
            const template = new PhotographCard(photograph)
            if(this._locationUrl.pathname === "/index.html"){
                this._indexContainerQuerry.appendChild(template.createCard())
            }
            if(photograph._id === Number(this._idUrl[1])){
                console.log("success")
                console.log(photograph)
                template.createProfile(this._photographerContainerQuerry)
            }
        });

        medium.forEach(element => {
        });
        console.log(this._locationUrl)

    }

}

const app = new App()
app.main()