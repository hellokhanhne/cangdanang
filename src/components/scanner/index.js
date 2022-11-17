import { Select } from "antd";
import { memo, useEffect, useState } from "react";
import QrReader from "react-qr-scanner";

function Scanner({ onScan }) {
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((dvs) => {
      const videoinput = dvs.filter((d) => d.kind === "videoinput");
      setDevices(videoinput);
      if (videoinput[0]?.deviceId) {
        setDevice(videoinput[0]);
      }
    });
  };

  const handleScan = (data) => {
    if (!data) return;
    onScan && onScan(data.text);
  };

  const handleError = (err) => {
    console.log(err);
  };

  return (
    <div className="d-flex flex-column w-100 h-100">
      {/* <Col span={24}> */}
      <Select
        className="w-100"
        style={
          {
            // height: "5vh",
          }
        }
        value={device?.deviceId || ""}
        onChange={(value) =>
          setDevice(devices.find((d) => d.deviceId === value))
        }
      >
        {devices.map((item, index) => (
          <Select.Option key={item.deviceId} value={item.deviceId}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      {/* </Col> */}
      {device && (
        // <Col span={24}>
        <QrReader
          className="scanner"
          constraints={{
            video: { deviceId: device.deviceId },
          }}
          delay={100}
          onError={handleError}
          onScan={handleScan}
          onLoad={(value) => console.log("load", value)}
        />
        // </Col>
      )}
    </div>
  );
}

export default memo(Scanner);
