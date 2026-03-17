'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SlideOne from "../components/slider/SlideOne";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { schedules } from '../lib/data';
import { nextFoodTruck } from '@/app/lib/utils';



export default function SliderPage() {
    const nextTrucks = nextFoodTruck(schedules);
    return (
        <div className="swiper relative mt-[150px] md:mt-[210px] mb-8 md:mb-2 max-w-sm md:max-w-5xl px-0">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                speed={800}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                /* autoplay={{ delay: 5000, disableOnInteraction: false }} */
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide><SlideOne nextTrucks={nextTrucks} /></SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    );

}