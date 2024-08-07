import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './../blogscarusel/Blogcarusel.css';
import nodata from './../icons/no-data-rafiki.svg'
import { FreeMode } from 'swiper/modules';





function Blogcarusel({ data, inputtxt }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filteredData = data.filter(item =>
        item.header.toLowerCase().includes(inputtxt.toLowerCase()) ||
        item.text.toLowerCase().includes(inputtxt.toLowerCase())
    );

    return (
        <Swiper
            slidesPerView={(screenWidth>1248)? 3: (screenWidth>670)? 2 :1}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
        >
            {filteredData.length === 0 ? (
                <div className="no-results">
                    <img src={nodata} alt="" />
                     <span>No results found{/*  <img src={sadface} alt="" />*/}</span> 

                </div>
            ) : (
                filteredData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="up">
                            <div className="imgwrap">
                                <img src={item.img} alt="" />
                            </div>
                        </div>
                        <div className="down">
                            <div className="profile">
                                <div className="ppwrap">
                                    <img src={item.ppimg} alt="profile" />
                                </div>
                            </div>
                            <div className="info">
                                <h2>{item.header}</h2>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    );
}

export default Blogcarusel;