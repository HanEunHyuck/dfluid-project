// react hooks
import { useEffect, useMemo, useState } from "react";

// library
import { Swiper, SwiperSlide } from "swiper/react";

// components
import ProfileCard from "../../components/ProfileCard";
import InputItem from "../../components/InputItem";
import CardItem, { Card } from "../../components/CardItem";
import InputRange from "../../components/InputRange";
import TabList from "../../components/TabList";

// data
import profileData from "./../../data/profile.json";
import cardData from "./../../data/card.json";

// store
import { useFilterStore } from "../../store/filterStore";

// tab 값
const tab = [
  { txt: "All", selected: true },
  { txt: "Asia", selected: false },
  { txt: "Europe", selected: false },
  { txt: "America", selected: false },
  { txt: "Oceania", selected: false },
];

// steps 값
const steps = [1000, 1300, 1700, 2000];

function HomePage() {
  const { activeTab, activeRange } = useFilterStore();

  const [filteredCardData, setFilteredCardData] = useState<Card[]>([]);

  // email 값
  const [email, setEmail] = useState("");

  // 2번째 섹션 배경이미지
  const [img, setImg] = useState("");

  // 1번째 섹션 순서 무작위 함수
  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  // 컴포넌트가 처음 마운트 될 때 한 번만 실행되고 그 값을 유지하기 위해 useMemo 사용
  const randomProfile = useMemo(() => shuffle(profileData), []);

  // 컴포넌트 렌더링 이후 실행 될 항목들
  useEffect(() => {
    const filtered = cardData.filter((item) => {
      const matchesTab = activeTab === "All" || item.country === activeTab;
      const matchesRange = item.year <= activeRange;
      return matchesTab && matchesRange;
    });

    setFilteredCardData(filtered);
  }, [activeTab, activeRange]);

  useEffect(() => {
    const fetchImg = async () => {
      // localStorage에 있는 bg-img 값 가져오기
      const localImg = localStorage.getItem("bg_img");

      // localStorage에 값이 있다면
      if (localImg) {
        // localstorage 값으로 img를 할당하고 반환
        setImg(localImg);
        return;
      }

      // localStorage에 값이 없다면
      try {
        // 비동기 API 호출
        const response = await fetch(
          "https://api.unsplash.com/photos/random?client_id=RfZSbn_rdvEPrnhslq8HRwmCwyayZg3DBo_LDcXXaTM",
        );
        // 데이터 객체화
        const data = await response.json();

        // API 호출이 정상적으로 호출 되었다면
        if (response.ok) {
          // localstorage에 값 저장
          localStorage.setItem("bg_img", data.urls.full);
          // 동시에 img 값 재할당
          setImg(data.urls.full);
        }
      } catch (error) {
        // error 발생 시
        console.error(error);
      }
    };

    fetchImg();
  }, []);

  // 이미지 호출 동안 loading 처리
  if (!img || randomProfile.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* first section */}
      <section className="content-area pb-[110px]">
        <h2 className="section-title">
          Snap photos and share like <br />
          never before
        </h2>
        <ProfileCard profileList={randomProfile} />
      </section>

      {/* second section */}
      <section
        className="content-area py-[152px]! text-center"
        style={{ background: `url(${img}) no-repeat center/cover` }}
      >
        <h2 className="mb-6 text-2xl/[36px] font-bold tracking-[-0.36px] text-white">
          Sed ut perspiciatis unde omnis
        </h2>
        <p className="text-lg/[30px] tracking-[-0.27px] text-[#ffffffcc]">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary.
        </p>
        <hr className="my-8 border-[#ffffff80]" />
        <p className="text-sm/[22px] tracking-[-0.21px] text-[#ffffff99]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore.
        </p>
        <p className="mt-26 mb-4 text-[16px] font-bold tracking-[-0.24px] text-white">
          Subscribe to our newsletter
        </p>
        <InputItem
          label="이메일 입력"
          hideLabel
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
        <div className="mt-15 flex gap-5">
          <TabList tab={tab} />
          <InputRange steps={steps} />
        </div>

        {filteredCardData.length === 0 ? (
          <p className="mt-[68px] text-4xl">No Result!</p>
        ) : (
          <Swiper
            spaceBetween={40}
            slidesPerView={3.8}
            slidesOffsetBefore={80}
            slidesOffsetAfter={80}
            className="-mx-20! mt-[68px]"
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
