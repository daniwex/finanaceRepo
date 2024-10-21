import React from "react";

export default function ModalTransaction({
  closeBtn,
  onsubmit,
  transactionName,
  onchangeTransactionName,
  transactionCategory,
  onchangeTransactionCategory,
  transactionDate,
  onchangeTransactionDate,
  amount,
  onchangeAmount,
  recurring,
  onchangeRecurring,
}) {
  return (
    <div className="absolute top-0 w-full z-20 left-0 bg-[#1b1818a6] h-full flex sm:justify-end pt-20 sm:px-2 sm:py-2">
      <div className="sm:h-full w-full sm:w-2/6 bg-white text-black rounded-t-2xl sm:rounded-lg py-10 px-5 sm:p-5">
        <div className="flex justify-between">
          <span>Add New Transaction</span>
          <button onClick={closeBtn}>
            <img src="/assets/images/icon-close-modal.svg" alt="close" />
          </button>
        </div>
        <div className="text-LabelColor mt-5">
          <p className="text-xs leading-5 text-black">
            Record a transaction, you can fill in the details below{" "}
          </p>
        </div>
        <form onSubmit={(e) => onsubmit(e)} className="mt-5">
          <span>Transaction Details</span>
          <p className="text-xs text-LabelColor mt-5 leading-5">
            Please use an appropriate name for this label{" "}
          </p>
          <div className="text-xs mt-5">
            <label className="text-LabelColor">Transaction name</label>
            <input
              type="text"
              className="border mt-2 w-full py-2 px-2 border-grey_500"
              value={transactionName}
              onChange={(e) => onchangeTransactionName(e)}
            />
          </div>
          <div className="text-xs mt-5">
            <label className="text-LabelColor">Transaction category</label>
            <select
              value={transactionCategory}
              className="w-full mt-3 border border-grey_500 py-3 px-3"
              onChange={(e) => onchangeTransactionCategory(e)}
            >
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="groceries">Groceries</option>
              <option value="dining">Dining Out</option>
              <option value="transportation">Transportation</option>
              <option value="personal">Personal Care</option>
              <option value="education">Education</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="shopping">Shopping</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="text-xs mt-5">
            <label className="text-LabelColor">Transaction date</label>
            <input
              type="date"
              className="border mt-2 w-full py-2 px-2 border-grey_500"
              value={transactionDate}
              onChange={(e) => onchangeTransactionDate(e)}
            />
          </div>
          <div className="grid grid-cols-2 text-xs mt-5">
            <div className="flex flex-col">
              <label className="text-LabelColor">Amount</label>
              <input
                className="border border-grey_500 mt-2 py-2 px-2"
                type="number"
                value={amount}
                onChange={(e) => onchangeAmount(e)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-LabelColor">Recurring</label>
              <input
                type="checkbox"
                className="mt-2"
                checked={recurring}
                onChange={(e) => onchangeRecurring(e)}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="w-full mt-7 text-xs text-white bg-grey_500 py-3 rounded-lg cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}
