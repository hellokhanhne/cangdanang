import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import closeImage from "../assets/close.png";
import congra from "../assets/congra.gif";
import { db } from "../firebase";
import CongratulationOverlay from "./CongratulationOverlay";
import OverlayV2 from "./Overlayv2";
import OverlayWrapper from "./OverlayWrapper";

import "./styles/quayso.css";

const QuaySoTab = () => {
  const [listPrize, setListPrize] = useState({});
  const [dataRadom, setDataRandom] = useState([]);
  const [winer, setWiner] = useState(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const [giai, setGiai] = useState("");

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
    setGiai(value.name);
    setIsLoadingRandom(true);
    const winUser = randomFunc();
    window.startRadmonLuckyNumber(winUser?.somayman);
    setTimeout(() => {
      setIsLoadingRandom(false);
      dataRadom.filter((d) => d.qrcode !== winUser.qrcode);
      setWiner((w) => ({
        ...winUser,
        tengiaithuong: value?.name,
      }));
    }, 16000);
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
      <OverlayV2 visiable={isLoadingRandom}>
        <div
          className="w-100 h-100"
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              background: "#fff",
              padding: "1.3vw",
              borderRadius: ".5vw",
              display: "flex",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "5vh",
            }}
          >
            <h2
              className="font-large text-center border-text-white text-orange m-auto"
              style={{
                textTransform: "uppercase",
                fontSize: "2.25vw",
                lineHeight: 1.35,
                fontWeight: 900,
              }}
            >
              <span className="text-red cyen">ĐANG QUAY {giai}</span>
            </h2>
          </div>
          <div
            id="lotteryMachine"
            className="d-flex justify-content-center align-items-center h-100 flex-column"
            style={{
              paddingTop: "10vh",
            }}
          ></div>
        </div>
      </OverlayV2>

      {winer && (
        <OverlayWrapper>
          <div
            className="w-100 h-100 d-flex"
            style={{
              position: "relative",
            }}
          >
            <CongratulationOverlay>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="modal-chuc-mung-giai"
                  style={{
                    minWidth: "30vw",
                    background: "rgba(255,255,255,.9)",
                    borderRadius: 10,
                    padding: "1.5vw 2.5vw",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "-.8vw",
                      top: "-.8vw",
                      width: "1.8vw",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setWiner(null);
                    }}
                  >
                    <img className="w-100" src={closeImage} alt="" />
                  </div>
                  <div
                    className="text-center"
                    style={{
                      marginBottom: "5vh",
                    }}
                  >
                    <img
                      style={{
                        maxWidth: "40%",
                      }}
                      src={congra}
                      alt=""
                    />
                  </div>
                  <h2
                    className="font-large text-center border-text-white text-orange"
                    style={{
                      textTransform: "uppercase",
                      marginBottom: "1.15vh",
                      fontSize: "2.25vw",
                      lineHeight: 1.35,
                      fontWeight: 900,
                    }}
                  >
                    XIN CHÚC MỪNG
                  </h2>
                  <h2
                    className="font-large text-center border-text-white text-orange"
                    style={{
                      textTransform: "uppercase",
                      marginBottom: "1.15vh",
                      fontSize: "2.25vw",
                      lineHeight: 1.35,
                      fontWeight: 900,
                    }}
                  >
                    <span className="text-red cyen">
                      {winer?.nguoidaidien || "----------------"}
                    </span>
                  </h2>
                  <h2
                    className="font-large text-center border-text-white text-orange"
                    style={{
                      textTransform: "uppercase",
                      marginBottom: "1.15vh",
                      fontSize: "2.25vw",
                      lineHeight: 1.35,
                      fontWeight: 900,
                    }}
                  >
                    <span className="text-red cyen">
                      {winer?.tencongty || "----------------"}
                    </span>
                  </h2>
                  <h2
                    className="font-large text-center border-text-white text-orange"
                    style={{
                      textTransform: "uppercase",
                      marginBottom: "1.15vh",
                      fontSize: "2.25vw",
                      lineHeight: 1.35,
                      fontWeight: 900,
                    }}
                  >
                    SỐ MAY MẮN{" "}
                    <span className="text-red cyen">
                      {winer?.somayman || "----------------"}
                    </span>
                  </h2>
                  <h2
                    className="font-large text-center border-text-white text-orange"
                    style={{
                      textTransform: "uppercase",
                      marginBottom: "1.15vh",
                      fontSize: "2.25vw",
                      lineHeight: 1.35,
                      fontWeight: 900,
                    }}
                  >
                    ĐÃ ĐẠT{" "}
                    <span className="text-red cyen">
                      {winer?.tengiaithuong || "----------------"}
                    </span>
                  </h2>
                </div>
              </div>
            </CongratulationOverlay>
          </div>
        </OverlayWrapper>
      )}
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
