// src/components/Chart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function Chart() {
  const chartContainer = useRef(null);

  useEffect(() => {
    // Create the chart instance
    const chart = createChart(chartContainer.current, {
      width: chartContainer.current.clientWidth,
      height: chartContainer.current.clientHeight,
      layout: {
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#f0f0f0',
        },
        horzLines: {
          color: '#f0f0f0',
        },
      },
      crosshair: {
        vertLine: {
          color: '#0000FF',
        },
        horzLine: {
          color: '#0000FF',
        },
      },
      priceScale: {
        borderColor: '#000000',
      },
      timeScale: {
        borderColor: '#000000',
      },
    });

    // Example data for a candlestick chart
    const lineSeries = chart.addLineSeries({
      color: 'green',
    });

    lineSeries.setData([
      { time: 1617280000, value: 1.1215 },
      { time: 1617283600, value: 1.1230 },
      { time: 1617287200, value: 1.1220 },
      { time: 1617290800, value: 1.1245 },
      { time: 1617294400, value: 1.1260 },
    ]);

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={chartContainer} style={{ position: 'relative', width: '100%', height: '400px' }} />;
}

export default Chart;
