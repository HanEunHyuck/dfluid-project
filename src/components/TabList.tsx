import { useEffect } from "react";

// component
import TabItem, { Tab } from "./TabItem";

// store
import { useFilterStore } from "../store/filterStore";

const TabList = ({ tab }: { tab: Tab[] }) => {
  const { activeTab, setActiveTab } = useFilterStore();

  // props로 받아온 tab의 첫번째 요소의 txt로 기본 값 지정
  useEffect(() => {
    setActiveTab(tab[0].txt);
  }, []);

  return (
    <div
      role="tablist"
      className="grid grid-cols-5 gap-[5px] rounded-[25px] border border-[#00000080] p-[5px] max-[1024px]:grid-cols-3"
    >
      {tab.map((item, index) => (
        <TabItem
          key={index}
          item={{ ...item, selected: item.txt === activeTab }}
          onClick={setActiveTab}
        />
      ))}
    </div>
  );
};

export default TabList;
