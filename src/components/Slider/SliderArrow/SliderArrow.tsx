import s from "./SliderArrow.module.sass"
interface Iprops{
   slide_num: string,
   slide_len: string,
   nextSlide: ()=>void,
   backSlide: ()=>void
}
const SliderArrow = ({slide_num, slide_len,nextSlide,backSlide}:Iprops) => {
return (
<div className={s.SliderArrow}>
   <div className={s.counter}>{slide_num}/{slide_len}</div>
   <div className={s.arrows}>
      <div className={`${s.arrow} ${s.left} ${slide_num=="01" ? s.unactive : ""}`} onClick={backSlide}></div>
      <div className={`${s.arrow} ${s.right} ${slide_len==slide_num ? s.unactive : ""}`} onClick={nextSlide}></div>
   </div>
</div>
)}
export default SliderArrow