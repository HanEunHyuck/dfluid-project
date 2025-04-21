import { useEffect, useState } from "react";

// store
import { useFilterStore } from "../store/filterStore";

const FilterSteps = ({ steps }: { steps: number[] }) => {
  const { setActiveRange } = useFilterStore();
  const [rangeIndex, setRangeIndex] = useState(steps.length - 1);

  /**
   * props로 받아온 steps의 마지막 요소를 기본 값으로 설정
   * 초기에 리스트의 모든 값을 보여주기 위함
   */
  useEffect(() => {
    setActiveRange(steps[rangeIndex]);
  }, []);

  // 현재 step과 활성화된 step과 비교
  const getStepStatus = (step: number) => {
    return step <= steps[rangeIndex];
  };

  // 숫자 버튼 클릭 이벤트
  const handleButtonClick = (index: number) => {
    setRangeIndex(index);
    setActiveRange(steps[index]);
  };

  return (
    <div className="relative rounded-full border border-[#00000080] p-[5px]">
      <div className="flex items-center justify-between gap-20 max-[1024px]:gap-0">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`z-1 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full text-sm text-white ${
              getStepStatus(step) ? "bg-black" : "bg-[#999999]"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {step}
          </button>
        ))}
      </div>

      {/* 배경 bar */}
      <div className="absolute top-1/2 left-[6px] h-[10px] w-[calc(100%-12px)] -translate-y-1/2 rounded-full bg-[#999999]">
        <div
          className="h-[10px] bg-black"
          style={{
            width: `${(rangeIndex / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default FilterSteps;
