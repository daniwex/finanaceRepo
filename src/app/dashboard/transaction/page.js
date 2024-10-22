"use client";

import Items from "@/components/Items";
import ModalTransaction from "@/components/ModalTransaction";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export default function Page() {
  const [showModel, setShowModel] = useState(false);
  const [transactionName, setTransactionName] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("entertainment");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionRecurring, setTransactionRecurring] = useState(false);
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!transactionDate || !transactionAmount || !transactionName) {
      return;
    }
    const data = {
      transactionName,
      transactionCategory,
      transactionDate,
      transactionAmount,
      transactionRecurring: transactionRecurring === "on",
    };
    try {
      const req = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        const res = await req.json();
        setMessage(res.message);
        setShowModel(false);
        setTransactionName("");
        setTransactionCategory("entertainment");
        setTransactionDate("");
        setTransactionAmount("");
        setTransactionRecurring(false);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const req = await fetch("/api/transactions");
        if (req.ok) {
          const res = await req.json();
          setTransactions(res);
          setFilteredTransactions(res); 
          setRefresh(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [refresh]);

  const filterTransactions = useCallback(
    debounce((term) => {
      if (!term) {
        setFilteredTransactions(transactions); 
      } else {
        setFilteredTransactions(
          transactions.filter((transaction) =>
            transaction.transactionName.toLowerCase().includes(term.toLowerCase())
          )
        );
      }
    }, 300),
    [transactions]
  );

  useEffect(() => {
    filterTransactions(searchTerm);
  }, [searchTerm, transactions, filterTransactions]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-xl">Transactions</h2>
        <button
          className="text-xs h-fit w-fit px-2 py-2 bg-grey_500 text-white"
          onClick={() => setShowModel(true)}
        >
          Add New Transaction
        </button>
      </div>
      <div className="my-10 bg-white w-full py-7 rounded-lg px-7">
        <div className="sm:flex sm:justify-between">
          <input
            type="search"
            className="block sm:inline w-full border text-sm placeholder:text-xs px-2 py-2 sm:w-1/4 rounded-md"
            placeholder="Search transaction"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex my-4 sm:my-0 justify-evenly">
            <div className="text-xs sm:text-sm">
              <label>Sort by</label>
              <select className="border border-grey_500 px-2 py-1 mx-1 sm:mx-3 rounded-md">
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="text-xs sm:text-sm">
              <label>Category</label>
              <select className="border border-grey_500 px-2 py-1 mx-1 sm:mx-3 rounded-md">
                <option>All transactions</option>
                <option>Entertainment</option>
                <option>Groceries</option>
                <option>Utilities</option>
              </select>
            </div>
          </div>
        </div>
        {filteredTransactions.length > 0 ? (
          <Items items={filteredTransactions} />
        ) : (
          <p>No transactions available.</p>
        )}
      </div>
      {showModel && (
        <ModalTransaction
          closeBtn={() => setShowModel(false)}
          onsubmit={(e) => submit(e)}
          onchangeTransactionName={(e) => setTransactionName(e.target.value)}
          onchangeTransactionCategory={(e) => setTransactionCategory(e.target.value)}
          onchangeTransactionDate={(e) => setTransactionDate(e.target.value)}
          onchangeAmount={(e) => setTransactionAmount(e.target.value)}
          onchangeRecurring={(e) => setTransactionRecurring(e.target.checked)}
        />
      )}
    </div>
  );
}
