function createPieChart({ budget }, c) {
  const ctx = c?.getContext("2d");
  let startAngle = 0;
  const total = budget?.reduce(
    (cummulativeSum, initialValue) => (cummulativeSum += initialValue[2]),
    0
  );
  for (let i = 0; i < budget?.length; i++) {
    const sliceAngle = (budget[2] / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle='red';
    ctx.fill();
    startAngle += sliceAngle;
  }
}

export default createPieChart;
