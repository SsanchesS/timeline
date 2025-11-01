import { useRef, useState } from "react"
import gsap from "gsap"
import HistoryDate from "./components/HistoryDate/HistoryDate"
import Slider from "./components/Slider/Slider"
import Year from "./components/Year/Year"
import type IProps from "./types/types"

const Timeline = ({data}:IProps) => {
   const circleRef = useRef<HTMLDivElement | null>(null)
   const [activeIndex, setActiveIndex] = useState(0)
   const rotationRef = useRef(0) // хранит текущий угол поворота круга

   const points = Array.from({ length: data.length }) // создаем точки

   // Активный элемент
   const activeContent = data[activeIndex].content
   const yearStart = activeContent[0].year
   const yearEnd = activeContent[activeContent.length - 1].year

   // Обработка клика по точке
   const handleCircleClick = (index: number) => {
      if (!circleRef.current || index === activeIndex) return

      const totalPoints = 360 / points.length
      const targetPoint = (index - activeIndex) * totalPoints
      rotationRef.current -= targetPoint

      // вращаем круг
      gsap.to(circleRef.current, {
         rotation: rotationRef.current,
         duration: 1,
         ease: "power3.inOut",
      })

      // лёгкая пульсация активной точки
      gsap.fromTo(
         `.dot-${index}`,
         { scale: 1, opacity: 0.7 },
         { scale: 1.3, opacity: 1, duration: 0.5, ease: "back.out(2)" }
      )

      setActiveIndex(index)
   }

   // создаём точки по окружности
   const radius = 265
   const center = { x: 265, y: 265 }

return (
<div className="Timeline">
   <div className="bg">
      <div className="grid">
         <div className="first"></div>
         <div className="second"></div>
         <div className="third"></div>
         <div className="fourth"></div>
      </div>

      <div className="circle" ref={circleRef}>
         {points.map((_, i) => {
         const offsetAngle = (30 * Math.PI) / -180 // 30 градусов в радианах
         const angle = (i / points.length) * Math.PI * 2 + offsetAngle
         const x = center.x + radius * Math.cos(angle)
         const y = center.y + radius * Math.sin(angle)

         const isActive = i === activeIndex

         return (
            <div key={i} className={`dot dot-${i} ${isActive ? "active" : ""}`} style={{ left: `${x}px`,top: `${y}px`,}} onClick={() => handleCircleClick(i)}>
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
   <HistoryDate/>
   <Year year_start={yearStart} year_end={yearEnd}/>
   <Slider data={data} activeIndex={activeIndex} handleCircleClick={handleCircleClick}/>
</div>
)}
export default Timeline