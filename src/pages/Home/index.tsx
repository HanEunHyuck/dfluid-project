import { useEffect, useMemo, useRef, useState } from "react";

// library
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// components
import ProfileCardItem from "../../components/ProfileCardItem";
import InputItem from "../../components/InputItem";
import CardItem, { Card } from "../../components/CardItem";
import FilterSteps from "../../components/FilterSteps";
import TabList from "../../components/TabList";

// store
import { useFilterStore } from "../../store/filterStore";

// data
import profileData from "./../../data/profile.json";
import cardData from "./../../data/card.json";

// utils
import shuffle from "../../utils/shuffle";

// const
// tabs 값
const TABS = [
  { txt: "All", selected: true },
  { txt: "Asia", selected: false },
  { txt: "Europe", selected: false },
  { txt: "America", selected: false },
  { txt: "Oceania", selected: false },
];

// steps 값
const STEPS = [1000, 1300, 1700, 2000];

function HomePage() {
  // store
  const { activeTab, activeRange } = useFilterStore();

  // state
  const [filteredCardData, setFilteredCardData] = useState<Card[]>([]);
  const [email, setEmail] = useState("");
  const [bgImg, setBgImg] = useState("");

  // Ref
  const swiperRef = useRef<SwiperCore | null>(null);

  // 프로필 순서 섞기
  const randomProfile = useMemo(() => shuffle(profileData), []);

  // useEffect
  // 배경 이미지
  useEffect(() => {
    const fetchImg = async () => {
      // localStorage에 있는 bg_img 값 가져오기
      const localImg = localStorage.getItem("bg_img");

      // localStorage에 값이 있다면
      if (localImg) {
        // localstorage 값으로 bgImg 적용
        setBgImg(localImg);
        return;
      }

      // localStorage에 값이 없다면
      try {
        // API에서 랜덤 사진을 비동기로 가져오기
        const response = await fetch(
          "https://api.unsplash.com/photos/random?client_id=RfZSbn_rdvEPrnhslq8HRwmCwyayZg3DBo_LDcXXaTM",
        );
        // 응답 데이터를 JSON 형식으로 파싱
        const data = await response.json();

        // API 호출이 정상적으로 호출 되었다면
        if (response.ok) {
          // localstorage에 값 저장
          localStorage.setItem("bg_img", data.urls.full);
          // 동시에 img 값 재할당
          setBgImg(data.urls.full);
        }
      } catch (error) {
        // error 발생 시
        console.error(error);
      }
    };

    fetchImg();
  }, []);

  // 필터링
  useEffect(() => {
    const filteredData = cardData.filter((item) => {
      // activeTab 이 All이면 다 통과, All이 아니라면 item.country가 activeTab과 같으면 통과
      const matchesTab = activeTab === "All" || item.country === activeTab;
      // item.year가 actvieRange 이하인 것만 통과
      const matchesRange = item.year <= activeRange;
      return matchesTab && matchesRange;
    });

    setFilteredCardData(filteredData);

    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [activeTab, activeRange]);

  // 배경 이미지 호출, profile이미지 shuffle 되는 동안 loading 처리
  if (!bgImg || randomProfile.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* first section */}
      <section className="content-area pb-[110px]!">
        <h2 className="section-title">
          Snap photos and share like <br />
          never before
        </h2>
        <ul className="mt-[70px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {randomProfile.map((item, index) => (
            <li key={index}>
              <ProfileCardItem profile={item} />
            </li>
          ))}
        </ul>
      </section>

      {/* second section */}
      <section
        className="content-area py-[152px]! text-center"
        style={{ background: `url(${bgImg}) no-repeat center/cover` }}
      >
        <h2 className="mb-[23px] font-['Montserrat'] text-2xl/[36px] font-bold tracking-[-0.36px] text-white">
          Sed ut perspiciatis unde omnis
        </h2>
        <p className="font-['Montserrat'] text-lg/[30px] tracking-[-0.27px] text-[#ffffffcc]">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary.
        </p>
        <hr className="my-8 border-[#ffffff80]" />
        <p className="mb-27 font-['Montserrat'] text-sm/[22px] tracking-[-0.21px] text-[#ffffff99]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore.
        </p>
        <InputItem
          label="Subscribe to our newsletter"
          type="email"
          inputId="userEmail"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></InputItem>
      </section>

      {/* third section */}
      <section className="content-area">
        <h2 className="section-title">
          Duis tincidunt ut ligula vitae mollis.
        </h2>
        <div className="mt-15 flex gap-5 max-[1024px]:mt-8 max-[1024px]:flex-col">
          <TabList tab={TABS} />
          <FilterSteps steps={STEPS} />
        </div>

        {filteredCardData.length === 0 ? (
          <p className="mt-[68px] text-4xl">No Result!</p>
        ) : (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={24}
            slidesPerView={1.4}
            slidesOffsetBefore={40}
            slidesOffsetAfter={40}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesOffsetBefore: 64,
                slidesOffsetAfter: 64,
              },
              1024: {
                slidesPerView: 3.8,
                spaceBetween: 40,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
              },
            }}
            className="-mx-20! mt-[68px] max-[1024px]:-mx-16! max-[1024px]:mt-10 max-[768px]:-mx-10!"
          >
            {filteredCardData.map((item, index) => (
              <SwiperSlide key={index}>
                <CardItem card={item}></CardItem>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}

export default HomePage;
