import React from "react";

export default function Item({ sender, category, date, amount }) {
  return (
    <tr className="text-xs border-b h-10 sm:text-sm">
      <td>{sender}</td>
      <td className="text-LabelColor">{category[0].toUpperCase() + category.slice(1)}</td>
      <td className="text-LabelColor">{date}</td>
      <td>{amount}</td>
    </tr>
  );
}
