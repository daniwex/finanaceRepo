import React from "react";
import Item from "./Item";

export default function Items({ items }) {
  console.log(items);
  return (
    <table className="mt-10 w-full text-left">
      <thead className="h-10 border-b">
        <tr className="text-xs sm:text-sm text-LabelColor">
          <th>Recipient / Sender</th>
          <th>Category</th>
          <th>Transaction Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items ? (
          items.map((el, index) => (
            <Item
              sender={el.transactionName}
              category={el.transactionCategory}
              date={el.transactionDate}
              amount={el.transactionAmount}
              key={index}
            />
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}
