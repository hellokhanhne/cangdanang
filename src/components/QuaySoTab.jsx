import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

import "./styles/quayso.css";

const QuaySoTab = () => {
  const [listPrize, setListPrize] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "dsgiaithuong", "cocaugiaithuong"),
      (doc) => {
        setListPrize(doc.data());
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleQuayGiai = () => {};

  return (
    <div
      className="w-100 "
      style={{
        maxHeight: "55vh",
        overflowY: "auto",
        marginTop: "5vh",
      }}
    >
      <div className="h-100 d-flex justify-content-center ">
        <div className="random">
          {Object.entries(listPrize)
            .sort(
              ([_k1, v1], [_k2, v2]) =>
                Number(v1.quanlity) - Number(v2.quanlity)
            )

            .map(([key, value]) => {
              return (
                <div className="ticket" key={key}>
                  <div className="check">
                    <div className="big">{value.name}</div>
                  </div>
                  <div className="stub">
                    <button className="quay-ngay-button">Quay</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default QuaySoTab;
