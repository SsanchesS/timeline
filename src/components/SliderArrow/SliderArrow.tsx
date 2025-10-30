import s from "./SliderArrow.module.sass"
interface Iprops{
   slide_num: string,
   slide_len: string
}
const SliderArrow = ({slide_num, slide_len}:Iprops) => {
return (
<div className={s.SliderArrow}>
   <div className={s.counter}>{slide_num}/{slide_len}</div>
   <div className={s.arrows}>
      <div className={`${s.arrow} ${s.left}`}></div>
      <div className={`${s.arrow} ${s.right} ${s.unactive}`}></div>
   </div>
</div>
)}
export default SliderArrow