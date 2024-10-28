"use client";

export default function ModalBudget({
  closeBtn,
  onsubmit,
  categoryValue,
  onchangeCategory,
  spendValue,
  onchangeSpend,
  themeValue,
  onchangeTheme,
  modalName = "Add New Budget",
  btnName,
}) {
  return (
    <div className="absolute top-0 w-full left-0 bg-[#1b1818a6] h-screen overflow-y-hidden flex place-content-center z-20 place-items-center px-5 sm:px-0">
      <div className="bg-white h-fit w-fit px-7 py-4">
        <div className="flex justify-between">
          <h2>{modalName}</h2>
          <button onClick={closeBtn}>
            <img src="/assets/images/icon-close-modal.svg" />
          </button>
        </div>
        <p className="text-xs text-LabelColor mt-5">
          Choose a category to set a spending budget, These categories can help
          you monitor spending
        </p>
        <form
          onSubmit={(e) => {
            onsubmit();
            e.preventDefault();
          }}
          className="mt-5"
        >
          <div className="text-xs mb-5">
            <label className="block">Budget Category</label>
            <select
              value={categoryValue}
              className="w-full mt-3 border py-3 px-3"
              onChange={(e) => onchangeCategory(e)}
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
          <div className="text-xs mb-5">
            <label className="block">Minimum Spend</label>
            <input
              placeholder="e.g. 2000"
              className="border px-3 mt-3 py-3 w-full"
              value={spendValue}
              onChange={(e) => onchangeSpend(e)}
            />
          </div>
          <div className="text-xs mb-5">
            <label className="block">Theme</label>
            <select
              value={themeValue}
              className="w-full mt-3 border py-3 px-3"
              onChange={(e) => onchangeTheme(e)}
            >
              <option value="green">
                <span></span>Green
              </option>
              <option value="yellow">Yellow</option>
              <option value="cyan">Cyan</option>
              <option value="navy">Navy</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="turquoise">Turquoise</option>
              <option value="magenta">Magenta</option>
            </select>
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
