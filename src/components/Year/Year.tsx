import { useEffect, useRef } from "react"
import gsap from "gsap"
import s from "./Year.module.sass"

interface IProps {
   year_start: string
   year_end: string
}

const Year = ({ year_start, year_end }: IProps) => {
   
   const startRef = useRef<HTMLDivElement | null>(null)
   const endRef = useRef<HTMLDivElement | null>(null)

   const startValue = useRef({ num: Number(year_start) })
   const endValue = useRef({ num: Number(year_end) })


   useEffect(() => {
      gsap.to(startValue.current, {
         num: Number(year_start),
         duration: 1.2,
         ease: "power2.out",
         onUpdate: () => {
         if (startRef.current)
            startRef.current.textContent = Math.round(startValue.current.num).toString()
         },
      })

      gsap.to(endValue.current, {
         num: Number(year_end),
         duration: 1.2,
         ease: "power2.out",
         onUpdate: () => {
         if (endRef.current)
            endRef.current.textContent = Math.round(endValue.current.num).toString()
         },
      })
   }, [year_start, year_end])

return (
<div className={s.Year}>
   <div ref={startRef} className={s.start}>{year_start}</div>
   <div ref={endRef} className={s.end}>{year_end}</div>
</div>
)}
export default Year