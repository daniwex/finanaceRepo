"use client";

export default function MoneyPotModal({
  modalName,
  onsubmit,
  amount,
  value,
  onValueChange,
  closeBtn,
  btnName,
  labelName
}) {
  return (
    <div className="absolute top-0 w-full left-0 bg-[#1b1818a6] h-screen overflow-y-hidden flex place-content-center z-20 place-items-center px-5 sm:px-0">
      <div className="bg-white h-fit sm:w-1/3 px-7 py-4 rounded-md">
        <div className="flex justify-between">
          <h2>{modalName}</h2>
          <button onClick={closeBtn}>
            <img src="/assets/images/icon-close-modal.svg" />
          </button>
        </div>
        <p className="text-xs text-LabelColor mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          dolor at! Quibusdam velit, dignissimos doloremque nam esse ducimus
          quod numquam.
        </p>
        <form
          onSubmit={(e) => {
            onsubmit();
            e.preventDefault();
          }}
          className="mt-5"
        >
          <div className="text-xs mb-5 flex justify-between items-center">
            <span className="text-sm text-LabelColor">New Amount</span>
            <span className="font-bold text-lg">${amount}</span>
          </div>
          <div className="text-xs mb-5">
            <label className="block">{labelName}</label>
            <input
              type="Number"
              className="border px-3 mt-3 py-3 w-full"
              value={value}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <button
            className="w-full text-xs text-white bg-grey_500 py-3 rounded-lg cursor-pointer"
            type="submit"
          >
            {btnName}
          </button>
        </form>
      </div>
    </div>
  );
}
