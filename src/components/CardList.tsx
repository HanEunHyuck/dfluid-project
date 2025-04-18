import { Swiper, SwiperSlide } from "swiper/react";
import CardItem, { Card } from "./CardItem";

const CardList = ({ cardList }: { cardList: Card[] }) => {
  return (
    <Swiper
      spaceBetween={40}
      slidesPerView={3.8}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {cardList.map((item, index) => (
        <SwiperSlide key={index}>
          <CardItem card={item}></CardItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardList;
