"use client";

export default function ModalPot({
  closeBtn,
  onsubmit,
  targetValue,
  onchangeTarget,
  potTitle,
  onChangePotTitle,
  themeValue,
  onchangeTheme,
  modalName = "Add Pot",
  btnName,
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
          Create a pot to set saving tergets. These can help keep you on track
          as you save for special purchases
        </p>
        <form
          onSubmit={(e) => {
            onsubmit();
            e.preventDefault();
          }}
          className="mt-5"
        >
          <div className="text-xs mb-5">
            <label className="block">Pot Name</label>
            <input
              type="text"
              className="border px-3 mt-3 py-3 w-full"
              placeholder="e.g. Rainy Days"
              value={potTitle}
              onChange={(e) => onChangePotTitle(e)}
            />
          </div>
          <div className="text-xs mb-5">
            <label className="block">Target</label>
            <input
              placeholder="e.g. 2000"
              type="Number"
              className="border px-3 mt-3 py-3 w-full"
              value={targetValue}
              onChange={(e) => onchangeTarget(e)}
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
              <option value="blue">Blue</option>
              <option value="pink">Pink</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
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
