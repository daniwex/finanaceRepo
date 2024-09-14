'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
  return (
    <nav className="bg-grey_500 text-white fixed sm:h-screen sm:w-[15%] rounded-t-lg sm:rounded-tl-none sm:rounded-r-lg bottom-0 w-full z-10 h-fit">
      <h3 className="hidden sm:block sm:px-5 sm:pb-10 sm:pt-5">finance</h3>
      <ul className="grid sm:grid-cols-1 sm:gap-1 text-sm text-LabelColor sm:w-5/6 grid-cols-5 px-5 sm:px-0 align-center pt-2 sm:pt-0">
        <Link 
            href="/dashboard"
            className={`flex justify-center sm:justify-start py-4 sm:py-3  sm:px-5 ${pathname == "/dashboard" ?  'bg-white rounded-t-xl sm:rounded-tl-none sm:rounded-r-xl font-bold' : '' } `}
            >
             <img src="/assets/images/icon-nav-overview.svg" className="sm:pr-4" />
             <span className="hidden sm:block">Overview</span>
        </Link>
        <Link 
            href="/dashboard/transaction"
            className={`flex justify-center sm:justify-start sm:px-5 py-4 sm:py-3 ${pathname == "/dashboard/transaction" ?  'bg-white sm:rounded-tl-none rounded-t-xl sm:rounded-r-xl font-bold' : '' }`}
            >
             <img src="/assets/images/icon-nav-transactions.svg" className="sm:pr-4" />
             <span className="hidden sm:block">Transactions</span>
        </Link>
        <Link 
            href="/dashboard/budgets"
            className={`flex justify-center sm:justify-start py-4 sm:py-3 sm:px-5 ${pathname == "/dashboard/budgets" ?  'bg-white sm:rounded-tl-none rounded-t-xl sm:rounded-r-xl font-bold' : '' }`}
            >
             <img src="/assets/images/icon-nav-budgets.svg" className="sm:pr-4" />
             <span className="hidden sm:block">Budgets</span>
        </Link>
        <Link 
            href="/dashboard/pots"
            className={`flex justify-center sm:justify-start py-4 sm:py-3 sm:px-5 ${pathname == "/dashboard/pots" ?  'bg-white sm:rounded-tl-none rounded-t-xl sm:rounded-r-xl font-bold' : '' }`}
            >
             <img src="/assets/images/icon-nav-pots.svg" className="sm:pr-4" />
             <span className="hidden sm:block">Pots</span>
        </Link>
        <Link 
            href="/dashboard/bills"
            className={`flex justify-center sm:justify-start py-4 sm:py-3 sm:px-5 ${pathname == "/dashboard/bills" ?  'bg-white sm:rounded-tl-none rounded-t-xl sm:rounded-r-xl font-bold' : '' }`}
            >
             <img src="/assets/images/icon-nav-recurring-bills.svg" className="sm:pr-4" />
             <span className="hidden sm:block">Recurring bills</span>
        </Link>
      </ul>
    </nav>
  );
}
