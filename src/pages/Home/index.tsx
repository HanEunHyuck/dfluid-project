import { useEffect, useMemo, useState } from "react";

import ProfileCard from "../../components/ProfileCard";
import InputItem from "../../components/InputItem";
import CardList from "../../components/CardList";

// 기존 프로필 리스트
const profileList = [
  {
    thumb: "./profile1.png",
    info: "프로필1",
    title: "Sed ut perspiciatis",
    txt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
  },
  {
    thumb: "./profile2.png",
    info: "프로필2",
    title: "Lorem ipsum dolor",
    txt: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
  },
  {
    thumb: "./profile3.png",
    info: "프로필3",
    title: "Nemo enim ipsam",
    txt: "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.",
  },
];

// 카드 리스트
const cardList = [
  {
    title: "Italy, Pica",
    year: 1173,
    thumb: "./cardImg1.png",
    txt: "The Leaning Tower of Pisa, or simply the Tower of Pisa (torre di Pisa), is the campanile, or freestanding bell tower, of Pisa Cathedral. It is known for its nearly four-degree lean, the result of an unstable foundation. The tower is one of three structures in the Pisa's Cathedral Square (Piazza del Duomo), which includes the cathedral and Pisa Baptistry.",
  },
  {
    title: "Spain, Sagrada Família",
    year: 1882,
    thumb: "./cardImg2.png",
    txt: 'The Basílica i Temple Expiatori de la Sagrada Família, otherwise known as Sagrada Família, is a church under construction in the Eixample district of Barcelona, Catalonia, Spain. It is the largest unfinished Catholic church in the world. Designed by Catalan architect Antoni Gaudí (1852–1926), in 2005 his work on Sagrada Família was added to an existing (1984) UNESCO World Heritage Site, "Works of Antoni Gaudí". On 7 November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica.',
  },
  {
    title: "US, Fallingwater",
    year: 1935,
    thumb: "./cardImg3.png",
    txt: "Fallingwater is a house designed by the architect Frank Lloyd Wright in 1935. Situated in the Mill Run section of Stewart township, in the Laurel Highlands of southwest Pennsylvania, about 70 miles (110 km) southeast of Pittsburgh in the United States, it is built partly over a waterfall on the Bear Run river. The house was designed to serve as a weekend retreat for Liliane and Edgar J. Kaufmann, the owner of Pittsburgh's Kaufmann's Department Store.",
  },
];

function HomePage() {
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
  const randomProfile = useMemo(() => shuffle(profileList), []);

  // 컴포넌트 렌더링 이후 실행 될 항목들
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
  if (!img) {
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
        <CardList cardList={cardList} />
      </section>
    </>
  );
}

export default HomePage;
