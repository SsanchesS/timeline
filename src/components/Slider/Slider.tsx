import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { useState } from "react"
import Card from "./Card/Card"
import SliderArrow from "./SliderArrow/SliderArrow"
import s from "./Slider.module.sass"
interface IContent{
   year: string,
   text: string
}
interface ICard{
   name: string,
   content: IContent[]
}
interface IProps{
   data:ICard[]
}
const Slider = ({data}:IProps) => {
   const [slide_num, setSlide_num] = useState(0) // слайд тем
   const nextSlide = () =>setSlide_num(prev=>prev+1)
   const backSlide = () =>setSlide_num(prev=>prev-1)
return (
<div className={s.Slider}>
   <SliderArrow 
      slide_num={slide_num+1 > 9 ? `${slide_num+1}` : `0${slide_num+1}`} 
      slide_len={data.length > 9 ? `${data.length}` : `0${data.length}`}
      nextSlide={nextSlide}
      backSlide={backSlide}
   />
   <div className={s.SliderCard}>   
      <Swiper
         modules={[Navigation, Pagination]}
         navigation={true} // стрелки
         pagination={{ clickable: true }} // включаем точки
         spaceBetween={20} // расстояние между слайдами
         slidesPerView={3} // сколько карточек видно одновременно
         centeredSlides={true}
         grabCursor={true} // курсор "рука" для перетаскивания
      >
         {data[slide_num].content.map(el => (
            <SwiperSlide key={el.year}>
               <Card year={el.year} text={el.text}/>
            </SwiperSlide>
         ))}
      </Swiper>
   </div>
</div>
)}
export default Slider