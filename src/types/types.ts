interface IContent{
   year: string,
   text: string
}
interface ICard{
   name: string,
   content: IContent[]
}
export default interface IProps{
   data:ICard[]
}