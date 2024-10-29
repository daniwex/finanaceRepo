import React from "react";
import Pot from "./Pot";

export default function PotContainer({ pots, onAddMoney, onWithDraw }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
      {pots.map((pot, index) => (
        <Pot
          key={index}
          potId={pot._id}
          potTitle={pot.potTitle}
          potAmount={pot.potAmount}
          potTheme={pot.potTheme}
          potSavings={pot.potSavings}
          onAddMoney={onAddMoney}
          onWithDraw={onWithDraw}
        />
      ))}
    </div>
  );
}
