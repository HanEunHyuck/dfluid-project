export type Tab = {
  txt: string;
  selected: boolean;
};

type TabItemProps = {
  item: Tab;
  onClick: (txt: string) => void;
};

const TabItem = ({ item, onClick }: TabItemProps) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={item.selected}
      className={`min-w-[64px] cursor-pointer px-4 py-2 ${
        item.selected ? "rounded-[25px] bg-black text-white" : ""
      }`}
      onClick={() => onClick(item.txt)}
    >
      <span className="tracking-[-0.24px]">{item.txt}</span>
    </button>
  );
};

export default TabItem;
