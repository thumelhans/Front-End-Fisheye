class App {
    constructor(){
        this._locationUrl = window.location
        this._idUrl = this._locationUrl.search.split("=")
        this._indexContainerQuery = document.querySelector('.photographer_section')
        this._photographerContainerQuery = document.querySelector('.photograph-header')
        this._mediaContainerQuery = document.querySelector(".media-container")
        this._photographers = new PhotographerApi("/data/photographers.json")
        this._medium = new MediumApi("/data/photographers.json")
    }

    async main(){
        const photographerData = await this._photographers.getPhotographer()
        const mediumData = await this._medium.getMedium()

        const photographers = photographerData.map(photograph => new PhotographFactory(photograph, 'photographers'))
        const medium = mediumData.map(media => new PhotographFactory(media, 'media'))

        photographers.forEach(photograph => {
            const template = new PhotographCard(photograph)
            if(this._locationUrl.pathname === "/index.html"){
                this._indexContainerQuery.appendChild(template.createCard())
            }
            if(photograph._id === Number(this._idUrl[1])){
                template.createProfile(this._photographerContainerQuery)
            }
        });

        let totalLikes = 0
        medium.forEach(element => {
            const template = new MediumCard(element)
            if(element.photographerId === Number(this._idUrl[1])){
                this._mediaContainerQuery.appendChild(template.createCard())
                totalLikes += element.likes
            }
        });
    }
}

const app = new App()
app.main()