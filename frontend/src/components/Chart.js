import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function Chart() {
  const chartContainer = useRef(null);
  const chart = useRef(null);
  const lineSeries = useRef(null);

  useEffect(() => {
    chart.current = createChart(chartContainer.current, {
      width: chartContainer.current.clientWidth,
      height: 400,
      layout: { backgroundColor: "#FFFFFF", textColor: "#000000" },
      grid: { vertLines: { color: "#f0f0f0" }, horzLines: { color: "#f0f0f0" } },
      crosshair: { mode: 0 },
      priceScale: { borderColor: "#000000" },
      timeScale: { borderColor: "#000000" },
    });

    lineSeries.current = chart.current.addLineSeries({ color: "green" });

    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chart");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      lineSeries.current.update(data);
    };

    return () => {
      ws.close();
      chart.current.remove();
    };
  }, []);

  return <div ref={chartContainer} style={{ position: "relative", width: "100%" }} />;
}
