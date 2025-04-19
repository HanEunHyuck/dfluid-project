import { useEffect } from "react";
import TabItem, { Tab } from "./TabItem";
import { useFilterStore } from "../store/filterStore";

const TabList = ({ tab }: { tab: Tab[] }) => {
  const { activeTab, setActiveTab } = useFilterStore();

  useEffect(() => {
    if (!activeTab) {
      setActiveTab(tab[0].txt);
    }
  }, []);

  return (
    <div
      role="tablist"
      className="inline-block rounded-[25px] border border-[#00000080] p-[5px]"
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
