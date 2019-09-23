export interface IBook {
    id:string;
    _id:string;
    title:string,
    imgSrc:string,
    description:string,
    rating:number,
    author:string,
    isInReadingList:boolean,
    addedToListTimes: number
}
