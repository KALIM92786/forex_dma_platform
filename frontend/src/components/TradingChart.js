// src/components/TradingChart.js
import React from "react";

export default function TradingChart() {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Live Trading Chart</h2>
      <iframe
        title="TradingView Chart"
        src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=OANDA:EURUSD&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&theme=light"
        width="100%"
        height="400"
        frameBorder="0"
        allowTransparency="true"
        scrolling="no"
      ></iframe>
    </div>
  );
}
