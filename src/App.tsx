import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMute, setIsMute] = useState(true)

  useEffect(() => {
    if (!videoRef.current) return

    const hls = new Hls({ debug: true })

    if (Hls.isSupported()) {
      hls.loadSource('http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8')
      hls.attachMedia(videoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current?.play()
      })
    }
  }, [activeIndex])

  return (
    <>
      <Swiper
        direction={'vertical'}
        className="mySwiper"
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => setIsMute(!isMute)}
              style={{ position: 'absolute', top: 100, zIndex: 10 }}
            >{`음소거: ${isMute}`}</button>
            {activeIndex === index && (
              <video ref={videoRef} controls muted={isMute} autoPlay playsInline />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default App
