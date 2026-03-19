'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SlideOne from '../components/slider/SlideOne';
import SlideTwo from '../components/slider/SlideTwo';
import SlideThree from '../components/slider/SlideThree';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { schedules, foods } from '../lib/data';
import { recommendFoods, nextFoodTruck } from "@/app/lib/utils";

export default function SliderPage() {
    const nextTrucks = nextFoodTruck(schedules);
    const hotItems = recommendFoods(foods);

    return (
        <div className="swiper relative mb-8 max-w-[375px] md:max-w-5xl px-0 mt-[157px] md:mt-[189px]">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                speed={400}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 10000, disableOnInteraction: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide><SlideOne nextTrucks={nextTrucks} /></SwiperSlide>
                <SwiperSlide><SlideTwo hotItems={hotItems} /></SwiperSlide>
                <SwiperSlide><SlideThree /></SwiperSlide>
            </Swiper>
        </div>
    );

}