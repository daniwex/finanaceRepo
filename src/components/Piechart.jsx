import React, { useEffect, useRef } from "react";

const PieChart = ({ data, colors }) => {
  const canvasRef = useRef(null);
  const size = 250

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const total = data?.budget?.reduce(
      (cummulativeValue, initialValue) => (cummulativeValue += initialValue[2]),
      0
    );
    let startAngle = 0;
    const dpr = window.devicePixelRatio || 1;
    if (data.budget) {
      data.budget.forEach((slice, index) => {
        const sliceAngle = (slice[2] / total) * 2 * Math.PI;
        context.beginPath();
        context.moveTo(size/2, size/2); 
        context.arc(size/2, size/2, size/2, startAngle, startAngle + sliceAngle);
        context.closePath();
        context.fillStyle = slice[1];
        context.fill();
        startAngle += sliceAngle;
      });

      context.beginPath();
      context.moveTo(size/2, size/2);
      context.arc(size/2, size/2, 80, 0, 2 * Math.PI, true);
      context.fillStyle = "white";
      context.fill();
      context.closePath();

      context.beginPath();
      context.moveTo(size/2, size/2);
      context.arc(size/2, size/2, 95, 0, 2 * Math.PI, true);
      context.fillStyle = "rgba(196, 193, 193, 0.212)";
      context.fill();
      context.closePath();

      context.fillStyle = "black";
      context.font = "2.3rem serif";
      context.fontWeight = "bold"
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(`$${total}`, size/2, size/2);
    }
  }, [data]);

  return <canvas ref={canvasRef} width={size} height={size} style={{color:"black"}} />;
};

export default PieChart;
