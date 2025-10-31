import s from "./Card.module.sass"
interface Iprops{
   year:string,
   text:string
}
const Card = ({year,text}:Iprops) => {
return (
<div className={s.Card}>
   <div className={s.year}>{year}</div>
   <div className={s.text}>{text}</div>
</div>
)}
export default Card