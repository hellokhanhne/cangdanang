import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import OverlayWrapper from "./OverlayWrapper";

import "./styles/quayso.css";

const QuaySoTab = () => {
  const [listPrize, setListPrize] = useState({});
  const [dataRadom, setDataRandom] = useState([]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

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

  useEffect(() => {
    const q = query(collection(db, "checkIns_test_5"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const arr = querySnapshot.docs.map((d) => d.data());
      let setUnitArr = Array.from(new Set(arr.map((e) => e.qrcode))).map(
        (code) => arr.find((u) => u.qrcode === code)
      );
      let dsTrungGiaiSnap = await getDocs(collection(db, "dstrunggiai"));
      setUnitArr = setUnitArr.filter((u) => {
        return (
          !dsTrungGiaiSnap.docs.find((d) => d.data().qrcode === u.qrcode) &&
          u.somayman &&
          u.somayman != ""
        );
      });
      setDataRandom(setUnitArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleQuayGiai = (key, value) => {
    setIsLoadingRandom(true);
    const winUser = randomFunc();
    dataRadom.filter((d) => d.qrcode !== winUser.qrcode);
  };

  const randomFunc = () => {
    return dataRadom[Math.floor(Math.random() * dataRadom.length)];
  };

  return (
    <div
      className="w-100 "
      style={{
        maxHeight: "55vh",
        overflowY: "auto",
        marginTop: "5vh",
      }}
    >
      {isLoadingRandom && <OverlayWrapper></OverlayWrapper>}
      <div className="h-100 d-flex justify-content-center ">
        <div className="random">
          {Object.entries(listPrize)
            .sort(
              ([_k1, v1], [_k2, v2]) =>
                Number(v2.quanlity) - Number(v1.quanlity)
            )

            .map(([key, value]) => {
              return (
                <div className="ticket" key={key}>
                  <div className="check">
                    <div className="big">{value.name}</div>
                  </div>
                  <div className="stub">
                    <button
                      className="quay-ngay-button"
                      onClick={() => handleQuayGiai(key, value)}
                    >
                      Quay
                    </button>
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
