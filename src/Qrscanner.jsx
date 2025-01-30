import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrScanner
        delay={300}
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
      {scanResult && (
        <div>
          <h4>Scanned Result:</h4>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
