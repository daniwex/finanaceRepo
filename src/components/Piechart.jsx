import React, { useEffect, useRef, useState } from "react";

const PieChart = ({ data, colors }) => {
  const canvasRef = useRef(null);
  const size = 250;
  const canvasSize = size 
  const elementsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const drawChart = (context, hoverIndex = null) => {
    const total = data?.budget?.reduce(
      (cumulativeValue, initialValue) => (cumulativeValue += initialValue[2]),
      0
    );
    let startAngle = 0;
    context.clearRect(0, 0, canvasSize, canvasSize);
    elementsRef.current = [];

    if (data.budget) {
      data.budget.forEach((slice, index) => {
        const sliceAngle = (slice[2] / total) * 2 * Math.PI;
        const isHovered = index === hoverIndex;
        const radius = isHovered ? (size / 2 ) + 2 : size / 2;

        context.beginPath();
        context.moveTo(size / 2, size / 2);
        context.arc(
          size / 2,
          size / 2,
          radius,
          startAngle,
          startAngle + sliceAngle
        );
        context.closePath();
        context.fillStyle = slice[1];
        context.fill();

        elementsRef.current.push({
          radius: size / 2,
          startAngle,
          endAngle: startAngle + sliceAngle,
        });
        startAngle += sliceAngle;
      });

      // Draw inner circles and text
      context.beginPath();
      context.moveTo(size / 2, size / 2);
      context.arc(size / 2, size / 2, 80, 0, 2 * Math.PI, true);
      context.fillStyle = "white";
      context.fill();
      context.closePath();

      context.beginPath();
      context.moveTo(size / 2, size / 2);
      context.arc(size / 2, size / 2, 95, 0, 2 * Math.PI, true);
      context.fillStyle = "rgba(196, 193, 193, 0.212)";
      context.fill();
      context.closePath();

      context.fillStyle = "black";
      context.font = "bold 2.3rem serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(`$${total}`, size / 2, size / 2);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    drawChart(context);

    const handleMouseMove = (event) => {
      const { offsetX, offsetY } = event;
      const x = offsetX - size / 2;
      const y = offsetY - size / 2;
      const angle = Math.atan2(y, x);
      const distance = Math.sqrt(x * x + y * y);

      let currentHoveredIndex = null;
      elementsRef.current.forEach((element, index) => {
        const { startAngle, endAngle, radius } = element;
        const adjustedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
        if (
          distance <= radius &&
          adjustedAngle >= startAngle &&
          adjustedAngle <= endAngle
        ) {
          currentHoveredIndex = index;
        }
      });

      if (currentHoveredIndex !== hoveredIndex) {
        setHoveredIndex(currentHoveredIndex);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data, hoveredIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    drawChart(context, hoveredIndex);
  }, [hoveredIndex]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={size}
    />
  );
};

export default PieChart;
