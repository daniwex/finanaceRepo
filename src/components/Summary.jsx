import { calculateSpent } from "@/utility/utils";
import React from "react";

export default function Summary({ data }) {
 // const spent = calculateSpent()
  return (
    <div className="my-2">
      {data ? (
        Object.keys(data).map((el, index) => (
          <div key={index} className={`sm:flex sm:justify-between py-2 my-3 text-sm ${index != data.length - 2 ? 'border-b' : ''}`}>
            <div className="relative">
              <span style={{backgroundColor: data[el][0]}} className={`absolute left-0 h-full w-1`}></span>
              <span className="ml-3">{el[0].toUpperCase() + el.slice(1)}</span>
            </div>
            <div>
              {data[el][2] ? (
                <div>
                  <span className="font-bold">{`$${data[el][2]}`} </span>{" "}
                  <span>of {`$${data[el][1]}`}</span>
                </div>
              ) : (
                <span>{`0 of $${data[el][1]}`}</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
