import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol = "OANDA:EURUSD" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => createWidget();
      document.head.appendChild(script);
    } else {
      createWidget();
    }

    function createWidget() {
      if (containerRef.current && typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "1",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          container_id: containerRef.current.id,
        });
      }
    }
  }, [symbol]);

  return (
    <div style={{ height: "500px" }}>
      <div id="tradingview_widget" ref={containerRef} style={{ height: "100%" }} />
    </div>
  );
};

export default TradingViewChart;
