import { useMemo, useRef, useState, useEffect } from "react"
import gsap from "gsap"
import HistoryDate from "./components/HistoryDate/HistoryDate"
import Slider from "./components/Slider/Slider"
import Year from "./components/Year/Year"
import type IProps from "./types/types"

const Timeline = ({data}:IProps) => {
   const circleRef = useRef<HTMLDivElement | null>(null)
   const dotRefs = useRef<(HTMLDivElement | null)[]>([]) // массив ссылок на точки
   const [activeIndex, setActiveIndex] = useState(0)
   const rotationRef = useRef(0) // хранит текущий угол поворота круга

   const radius = 265
   const center = { x: 265, y: 265 }
   const offsetAngle = (30 * Math.PI) / -180

   // Предвычисляем координаты точек
   const dots = useMemo(() => {
      return data.map((_, i) => {
         const angle = (i / data.length) * Math.PI * 2 + offsetAngle
         return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
         }
      })
   }, [data.length])

   // Обработка клика по точке
   const handleCircleClick = (index: number) => {
      if (!circleRef.current || index === activeIndex) return

      // кратчайший путь
      const totalPoints = 360 / data.length
      let delta = (index - activeIndex) * totalPoints
      if (delta > 180) delta -= 360
      if (delta < -180) delta += 360
      rotationRef.current -= delta

      // вращаем круг
      const tl = gsap.timeline()
      tl.to(circleRef.current, {
         rotation: rotationRef.current,
         duration: 1,
         ease: "power3.inOut",
         onUpdate: () => {
            const dot = dotRefs.current[index]
            dot && gsap.set(dot, { rotation: -rotationRef.current })
         },
      })
         .fromTo(`.dot-${index}`,
            { scale: 1, opacity: .7 },
            { scale: 1.2, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            "0"
         )

      setActiveIndex(index)
   }

   // активный контент (диапазон лет)
   const activeContent = data[activeIndex].content
   const yearStart = activeContent[0].year
   const yearEnd = activeContent[activeContent.length - 1].year

   //
   const [isMobile, setIsMobile] = useState(window.matchMedia("(max-height: 800px)").matches)
   // Для реального приожения этот слушатель не нужен
   useEffect(() => { 
      const mediaQuery = window.matchMedia("(max-height: 800px)")

      const handleMediaQueryChange = (event: MediaQueryList | MediaQueryListEvent) => setIsMobile(event.matches)

      mediaQuery.addEventListener('change', handleMediaQueryChange)

      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
   }, [])
 
return (
<div className="Timeline">
   { !isMobile &&
   <div className="bg">
      <div className="grid">
         <div className="first"></div>
         <div className="second"></div>
         <div className="third"></div>
         <div className="fourth"></div>
      </div>

      <div className="circle" ref={circleRef}>
         {dots.map((pos, i) => {
            const isActive = i === activeIndex
            return (
               <div 
                  key={i} 
                  ref={el => { dotRefs.current[i] = el }}
                  className={`dot dot-${i} ${isActive ? "active" : ""}`} 
                  style={{ left: `${pos.x}px`,top: `${pos.y}px`,}} 
                  onClick={() => handleCircleClick(i)}
               >
                  {isActive && (
                  <div className="dot-info">
                     <div className="dot-num">{i+1}</div>
                     <div className="dot-name">{data[i].name}</div>
                  </div>
                  )}
               </div>
            )
         })}
      </div>

   </div>
   }
   <HistoryDate/>
   <Year year_start={yearStart} year_end={yearEnd}/>
   {isMobile && <hr/>}
   <Slider data={data} activeIndex={activeIndex} handleCircleClick={handleCircleClick}/>
</div>
)}
export default Timeline