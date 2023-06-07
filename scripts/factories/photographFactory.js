class PhotographFactory {
    constructor(data, type){
        if(type === "photographers"){
            return new Photographer(data);
        }else if(type === "media"){
            return new Photo(data);
        }else{
            throw new Error('Unknown type of data');
        }
    }
}