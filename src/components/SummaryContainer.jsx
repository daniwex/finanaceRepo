import Summary from "./Summary";

export default function SummaryContainer({budgetData, s}) {
    console.log(data)
  return (
    <div>
      {
        data?.map(el => <Summary category={el.budget} bill={el.spending}/>)
      }
    </div>
  )
}
