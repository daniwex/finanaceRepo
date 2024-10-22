"use client";

import React from "react";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { calculateProgress, calculateSpent } from "@/utility/utils";
import BudgetOptions from "./BudgetOptions";

export default function Budget({ budget, handleDeleteBudget }) {
  const progressPercentage = calculateProgress(budget[2], budget.slice(4));
  const spentValue = calculateSpent(budget.slice(4));
  const [openOptions, setOpenOptions] = useState(false)

  return (
    <div className="bg-white h-fit p-10 rounded-lg">
      {
        <div className="flex justify-between items-center">
          <div className="relative flex items-center">
            <span
              style={{ backgroundColor: budget[3] }}
              className={`left-0 h-4 w-4 rounded-full mr-2`}
            ></span>{" "}
            <b>{budget[0][0].toUpperCase() + budget[0].slice(1)}</b>
          </div>
          <div className="relative">
            <button
              onClick={() => setOpenOptions(!openOptions)}
            >
              <img src="/assets/images/icon-ellipsis.svg" />
            </button>
            {openOptions ? (
              <BudgetOptions
                deleteBudget={() => handleDeleteBudget(budget[1])}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      }
      <div className="my-5 text-sm text-LabelColor">
        Maximum of ${budget[2]}{" "}
      </div>
      {budget.length > 3 ? (
        <div>
          <ProgressBar bgColor={budget[3]} progress={progressPercentage} />
          <div className="flex justify-between my-4 text-sm">
            <div className="flex w-1/2">
              <span
                style={{ backgroundColor: budget[3] }}
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
                <span className="text-black">${budget[2] - spentValue}</span>
              </div>
            </div>
          </div>
          <div className="p-5 bg-beige_100 rounded-lg">
            <div className="mb-2">
              <b> Latest Spending</b>
            </div>
            {budget.slice(4).map((el, index) => (
              <div className={`flex justify-between mb-3  ${index != budget.slice(4).length - 1 ? 'border-b' : '' } pb-1`}>
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
