import s from "./Year.module.sass"

interface Iprops{
   year_start: string,
   year_end: string
}
const Year = ({year_start,year_end}:Iprops) => {
return (
<div className={s.Year}>
   <div className={s.start}>{year_start}</div>
   <div className={s.end}>{year_end}</div>
</div>
)}
export default Year