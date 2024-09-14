import React from "react";
import ProgressBar from "./ProgressBar";
import { calculateProgress, calculateSpent } from "@/utility/utils";

export default function Budget({ budget }) {
  const progressPercentage = calculateProgress(budget[1], budget.slice(3));
  const spentValue = calculateSpent(budget.slice(3));
  console.log(budget);
  return (
    <div className="bg-white h-fit p-10">
      {
        <div className="flex justify-between items-center">
          <div className="relative flex items-center">
            <span
              style={{ backgroundColor: budget[2] }}
              className={`left-0 h-4 w-4 rounded-full mr-2`}
            ></span>{" "}
            <b>{budget[0][0].toUpperCase() + budget[0].slice(1)}</b>
          </div>
          <div>
            <button>
              <img src="/assets/images/icon-ellipsis.svg" />
            </button>
          </div>
        </div>
      }
      <div className="my-5 text-sm text-LabelColor">
        Minimum of ${budget[1]}{" "}
      </div>
      {budget.length > 3 ? (
        <div>
          <ProgressBar bgColor={budget[2]} progress={progressPercentage} />
          <div className="flex justify-between my-4 text-sm">
            <div className="flex w-1/2">
              <span
                style={{ backgroundColor: budget[2] }}
                className="relative left-0 mr-2 h-full w-1"
              ></span>
              <div className="text-LabelColor flex flex-col">
                <span>Spent</span>
                <span className="text-black">${spentValue}</span>
              </div>
            </div>
            <div className="flex w-1/2">
              <span className="relative left-0 mr-2 h-full w-1 bg-beige_100"></span>
              <div className="text-LabelColor flex flex-col">
                <span>Remaining</span>
                <span className="text-black">${budget[1] - spentValue}</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-beige_100">
            <div className="mb-2">
              <b> Latest Spending</b>
            </div>
            {budget.slice(3).map((el) => (
              <div className="flex justify-between mb-3 border-b pb-1">
                <div>
                  <b className="text-sm">{el[1]} </b>
                </div>
                <div>
                  <div className="flex flex-col text-sm">
                    <span className="font-bold">-${el[0]}</span>
                    <span className="text-xs text-LabelColor">{el[2]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
