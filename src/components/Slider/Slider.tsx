import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import gsap from "gsap"

import { useState, useRef } from "react"
import Card from "./Card/Card"
import SliderArrow from "./SliderArrow/SliderArrow"
import s from "./Slider.module.sass"
import type IProps from "../../types/types"

interface INewProps extends IProps{ 
   activeIndex: number
}
const Slider = ({activeIndex,data}:INewProps) => {

   const SwiperWrapRef = useRef<HTMLDivElement | null>(null) // анимация скрытия
   const swiperRef = useRef<SwiperType | null>(null) // управление Swiper`ом
   const backCards = () => swiperRef.current?.slidePrev()
   const nextCards = () => swiperRef.current?.slideNext()
   // для кнопок переключения карточек
   const [isAtStart, setIsAtStart] = useState(true)
   const [isAtEnd, setIsAtEnd] = useState(false)
   
   const [slide_num, setSlide_num] = useState(activeIndex) // текущий слайд
   const [displaySlide, setDisplaySlide] = useState(0) // что показываем
   const nextSlide = () => changeSlide(slide_num + 1)
   const backSlide = () => changeSlide(slide_num - 1)


   const changeSlide = (newIndex: number) => {
      if (!SwiperWrapRef.current) return

      const tl = gsap.timeline({
         onStart: () => {
            setSlide_num(newIndex) // обновляем счётчик после анимации
         },
      })

      tl.to(SwiperWrapRef.current, {
         opacity: 0,
         y: 20,
         duration: 0.3,
         ease: "power1.inOut",
      })
      .set(SwiperWrapRef.current, { y: -20 })
      .to(SwiperWrapRef.current, {
         opacity: 1,
         y: 0,
         duration: 0.3,
         ease: "power1.inOut",
         onStart: () => setDisplaySlide(newIndex), // новые карточки
      })
   }
   
return (
<div className={s.Slider}>
   <SliderArrow 
      slide_num={slide_num+1 > 9 ? `${slide_num+1}` : `0${slide_num+1}`} 
      slide_len={data.length > 9 ? `${data.length}` : `0${data.length}`}
      nextSlide={nextSlide}
      backSlide={backSlide}
   />
   <div className={s.SwiperWrap} ref={SwiperWrapRef}>   

      <div className={`${s.arrow} ${s.left} ${isAtStart ? s.unactive : ""}`} onClick={backCards}></div>

      <Swiper
         onSwiper={swiper => (swiperRef.current = swiper)}
         onSlideChange={(swiper) => {
            setIsAtStart(swiper.isBeginning)
            setIsAtEnd(swiper.isEnd)
         }}
         modules={[Pagination]}
         pagination={{ clickable: true }} // включаем точки
         spaceBetween={20} // расстояние между слайдами
         slidesPerView={3} // сколько карточек видно одновременно
         grabCursor={true} // курсор "рука" для перетаскивания
         // style={{ width: "80%" }}
      >
         {data[displaySlide].content.map(el => (
            <SwiperSlide key={el.year}>
               <Card year={el.year} text={el.text}/>
            </SwiperSlide>
         ))}
      </Swiper>

      <div className={`${s.arrow} ${s.right} ${isAtEnd ? s.unactive : ""}`} onClick={nextCards}></div>

   </div>
</div>
)}
export default Slider