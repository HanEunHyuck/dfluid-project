import { useEffect } from "react";
import { useFilterStore } from "../store/filterStore";

const InputRange = ({ steps }: { steps: number[] }) => {
  const { activeRange, setActiveRange } = useFilterStore();

  useEffect(() => {
    setActiveRange(steps[steps.length - 1]);
  }, []);

  const getStepStatus = (step: number) => {
    if (step <= activeRange) return "active";
    return "inactive";
  };

  return (
    <div className="rounded-full border border-[#00000080] p-[5px]">
      <div className="relative flex items-center justify-between gap-20">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`z-1 flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full text-sm text-white ${getStepStatus(step) === "active" ? "bg-black" : "bg-[#999999]"}`}
            onClick={() => setActiveRange(step)}
          >
            {step}
          </button>
        ))}

        <div className="absolute top-1/2 left-[1px] h-[10px] w-[calc(100%-2px)] -translate-y-1/2 rounded-full bg-[#999999]">
          <div
            className="h-[10px] bg-black"
            style={{
              width: `${(steps.indexOf(activeRange) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputRange;
