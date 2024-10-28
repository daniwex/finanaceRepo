import React from "react";
import Budget from "./Budget";

export default function BudgetsContainer({
  data,
  handleDeleteBudget,
  showModal
}) {
  return (
    <div className="grid mt-4 sm:mt-0 grid-cols-1 gap-y-4">
      {Object.keys(data[0]).map((el, index) => (
        <Budget
          handleDeleteBudget={handleDeleteBudget}
          key={index}
          budget={data[0][el]}
          showModal={showModal}
        />
      ))}
    </div>
  );
}
