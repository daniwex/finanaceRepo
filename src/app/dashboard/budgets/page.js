"use client";
import BudgetsContainer from "@/components/BudgetsContainer";
import ModalBudget from "@/components/ModalBudget";
import Piechart from "@/components/Piechart";
import Summary from "@/components/Summary";
import { aggregateTable, budgetInfo } from "@/utility/utils";
import { useState, useEffect, useRef } from "react";

export default function page() {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("entertainment");
  const [spend, setSpend] = useState("");
  const [theme, setTheme] = useState("green");
  const [message, setMessage] = useState("");
  const [budgets, setBudgets] = useState();
  const [transactions, setTransactions] = useState();
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState();
  const [loadBudgets, setLoadBudgets] = useState(false);
  const [data, setData] = useState([]);

  async function submit(e) {
    e.preventDefault();
    if (category == "" || spend == "" || theme == "") {
      return;
    }
    const data = {
      category,
      spend,
      theme,
    };
    try {
      const req = await fetch("/api/budget", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        const res = await req.json();
        setMessage(res.message);
        setOpenModal(false);
        setTheme("green");
        setSpend("");
        setCategory("entertainment");
        setLoadBudgets(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteBudget(budgetId){
    const data = JSON.stringify (budgetId)
      try {
        const req = await fetch("/api/budget", {
          method: "DELETE",
          body: data
        })
        setLoadBudgets(true);
      } catch (error) {
        
      }
  }

  useEffect(() => {
    async function getData() {
      try {
        const req = await fetch("/api/budget");
        if (req.ok) {
          const res = await req.json();
          // console.log(res)
          setBudgets(res.budgets);
          setTransactions(res.transaction);
          const d = [
            res.transaction.map((el) => [
              el.transactionCategory,
              el.transactionAmount,
              el.transactionName,
              el.transactionDate,
            ]),
          ];
          const data = {
            budget: res.budgets.map((el, _) => [
              el.category,
              el.theme,
              el.spend,
              el._id,
            ]),
            spending: d,
          };
          const m = aggregateTable(data);
          const j = budgetInfo(data);
          setChartData(data);
          setSummary(m);
          setLoadBudgets(false);
          setData(j);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [loadBudgets]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-xl">Budgets</h2>
        <button
          className="text-xs h-fit w-fit px-2 py-2 bg-grey_500 text-white"
          onClick={() => setOpenModal(true)}
        >
          Add New Budget
        </button>
      </div>
      {!chartData || !summary ? (
        <div className="w-full h-screen flex justify-center items-center text-2xl">Loading</div>
      ) : (
        <div className="block sm:flex mt-10">
          <div className="h-fit py-10 px-5 bg-white grid grid-col-1 sm:w-2/4 sm:mr-5">
            <div className="flex justify-center w-full">
              <Piechart data={chartData} />
            </div>
            <div className="text-left mt-14">
              <h2 className="font-bold text-lg">Spending Summary</h2>
              <Summary data={summary} />
            </div>
          </div>
          <div className="sm:w-2/4">
            {data ? <BudgetsContainer data={data} handleDeleteBudget={handleDeleteBudget} /> : <></>}
          </div>
        </div>
      )}

      {openModal ? (
        <ModalBudget
          closeBtn={() => setOpenModal(false)}
          onchangeCategory={(e) => setCategory(e.target.value)}
          onchangeSpend={(e) => setSpend(e.target.value)}
          onchangeTheme={(e) => setTheme(e.target.value)}
          onsubmit={(e) => submit(e)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
