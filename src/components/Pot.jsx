"use client";
import ProgressBar from "./ProgressBar";

export default function Pot({ potTitle, potAmount, potTheme, potSavings, onAddMoney, potId, onWithDraw }) {
  const percentage =  (potSavings / potAmount) * 100
  const data = {
    potId,
    potTitle,
    potAmount,
    potSavings,
    potTheme
  }
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between w-full">
        <div className="relative flex items-center">
          <span
            style={{ backgroundColor: potTheme }}
            className={`left-0 h-4 w-4 rounded-full mr-2`}
          ></span>{" "}
          <b>{potTitle}</b>
        </div>
        <div className="relative">
          <button>
            <img src="/assets/images/icon-ellipsis.svg" />
          </button>
          {/* {openOptions ? (
            <BudgetOptions
              deleteBudget={() => handleDeleteBudget(budget[1])}
              editBudget={() => showModal(data)}
            />
          ) : (
            <></>
          )} */}
        </div>
      </div>
      <div className="flex justify-between sm:pt-10 items-center">
        <span className="text-LabelColor font-light text-sm">Total Saved</span>
        <span className="font-bold text-lg">${potSavings}.00</span>
      </div>

      <div className="py-3">
        <ProgressBar progressHeight="h-2"bgColor={potTheme} progress={`${percentage}%`} />
      </div>
      <div className="flex justify-between text-sm">
        <span>{percentage.toFixed(2)}%</span>
        <span className="text-LabelColor">Target of ${potAmount}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-10">
        <button className="bg-[#F8F4F0] text-sm p-2" onClick={() => onAddMoney(data)} >Add Money</button>
        <button className="bg-[#F8F4F0] text-sm p-2" onClick={() => onWithDraw(data)}>Withdraw</button>
      </div>
    </div>
  );
}
