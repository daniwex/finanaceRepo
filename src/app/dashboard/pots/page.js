"use client";
import MoneyPotModal from "@/components/MoneyPotModal";
import ModalPot from "@/components/ModalPot";
import PotContainer from "@/components/PotContainer";
import { useMemo, useEffect, useState } from "react";

export default function page() {
  const [openModal, setOpenModal] = useState(false);
  const [pots, setPots] = useState();
  const [potTitle, setPotTitle] = useState("");
  const [potAmount, setPotAmount] = useState(0);
  const [potTheme, setPotTheme] = useState("Green");
  const [loadBudgets, setLoadBudgets] = useState(false);
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);
  const [openWithdrawMoneyModal, setOpenWithdrawMoneyModal] = useState(false);

  const [potAddTitle, setAddPotTitle] = useState("");
  const [potAddAmount, setAddPotAmount] = useState(0);
  const [potAddTheme, setAddPotTheme] = useState("Green");
  const [value, setValue] = useState(0);
  const [id, setId] = useState();

  

  let amount = useMemo(
    () => Number(value) + Number(potAddAmount),
    [value, potAddAmount]
  );

  let a = useMemo(
    () => Number(potAddAmount) - Number(value),
    [value, potAddAmount]
  );

  async function updatePot(potId) {
    const data = {
      potId,
      potSavings: amount != null ? amount : a,
    };
    try {
      const req = await fetch("/api/pot", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        setOpenAddMoneyModal(false);
        setOpenWithdrawMoneyModal(false)
        setLoadBudgets(true);
      }
    } catch (error) {}
  }

  async function submitPot() {
    if (potAmount == "" || potTheme == "" || potTheme == "") {
      return;
    }
    const data = {
      potTitle,
      potAmount,
      potTheme,
    };
    try {
      const req = await fetch("/api/pot", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        setOpenModal(false);
        setLoadBudgets(true);
      }
    } catch (error) {}
  }

  async function getPots() {
    try {
      const req = await fetch("/api/pot");
      if (req.ok) {
        const response = await req.json();
        console.log(response);
        setPots(response);
        setLoadBudgets(false);
      }
    } catch (error) {}
  }

  useEffect(() => getPots, [loadBudgets]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-xl">Pots</h2>
        <button
          className="text-xs h-fit w-fit px-2 py-2 bg-grey_500 text-white"
          onClick={() => setOpenModal(true)}
        >
          Add New Pot
        </button>
      </div>
      {pots ? (
        <div>
          <PotContainer
            pots={pots}
            onAddMoney={(data) => {
              setOpenAddMoneyModal(true);
              setAddPotTitle(data.potTitle);
              setId(data.potId);
              setAddPotAmount(data.potSavings);
              setValue(0);
            }}
            onWithDraw={(data) => {
              setOpenWithdrawMoneyModal(true);
              setAddPotTitle(data.potTitle);
              setId(data.potId);
              setAddPotAmount(data.potSavings);
              setValue(0);
            }}
          />
        </div>
      ) : (
        <div className="mt-10 w-full h-[70vh] flex justify-center items-center">
          <img
            src="/assets/images/illustrations/empty-illustration.jpg"
            className="w-1/3"
          />
        </div>
      )}
      {openModal ? (
        <ModalPot
          closeBtn={() => setOpenModal(false)}
          btnName="Add Pot"
          targetValue={potAmount}
          onchangeTarget={(e) => setPotAmount(e.target.value)}
          potTitle={potTitle}
          onChangePotTitle={(e) => setPotTitle(e.target.value)}
          themeValue={potTheme}
          onchangeTheme={(e) => setPotTheme(e.target.value)}
          onsubmit={submitPot}
          
        />
      ) : (
        <></>
      )}

      {openAddMoneyModal ? (
        <MoneyPotModal
          modalName={`Add to '${potAddTitle}'`}
          closeBtn={() => setOpenAddMoneyModal(false)}
          btnName="Confirm Addition"
          amount={amount}
          value={value}
          onValueChange={(e) => setValue(e.target.value)}
          onsubmit={() => updatePot(id)}
          labelName = "Amount to Add"
        />
      ) : (
        <></>
      )}
      {openWithdrawMoneyModal ? (
        <MoneyPotModal
          modalName={`Withdraw from '${potAddTitle}'`}
          closeBtn={() => setOpenWithdrawMoneyModal(false)}
          btnName="Confirm Withdrawal"
          amount={a}
          value={value}
          onValueChange={(e) => setValue(e.target.value)}
          onsubmit={() => updatePot(id)}
          labelName = "Amount to Withdraw"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
