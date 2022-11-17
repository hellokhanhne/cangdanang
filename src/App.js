import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Scanner from "./components/scanner";
import { db } from "./firebase";

import headImage from "../src/assets/TenCTr.png";

function App() {
  const [userCurrent, setUserCurrent] = useState(null);
  // const [listAttend, setListAttend] = useState([]);

  const prev = useRef("");

  // useEffect(() => {
  //   const q = query(collection(db, "checkIns_test_5"));

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const arr = [];
  //     querySnapshot.forEach((doc) => {
  //       arr.push(doc.data());
  //     });
  //     arr.sort((a, b) => b.checkIn - a.checkIn);

  //     setListAttend(arr);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const scan = useCallback(
    async (value) => {
      console.log(value === prev.current);
      if (value === prev.current) {
        return;
      }
      prev.current = value;

      // console.log(value);

      const q = query(
        collection(db, "users"),
        where("qrcode", "==", value || "")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (_doc) => {
        // console.log(_doc.data())
        const date = moment().valueOf();
        const dateString = moment(date).format("DD-MM-YYYY").toString();
        setUserCurrent({ ..._doc.data(), checkIn: date });
        const q2 = query(
          collection(db, "checkIns_test_5"),
          where("qrcode", "==", _doc.data().qrcode)
        );
        let checkExist = false;
        for (let snap of (await getDocs(q2)).docs) {
          if (
            dateString ===
            moment(snap.data().checkIn).format("DD-MM-YYYY").toString()
          ) {
            checkExist = true;
          }
        }
        if (!checkExist) {
          // console.log("zoo");
          await setDoc(doc(db, "checkIns_test_5", uuidv4()), {
            ..._doc.data(),
            checkIn: date,
          });
        }
      });
    },
    [setUserCurrent]
  );

  return (
    <div className={` main-wrapper position-relative`}>
      <div className="h-100 d-flex flex-column">
        <div className="text-center flex-1">
          <img
            src={headImage}
            style={{
              width: "70%",
              objectFit: "cover",
              marginTop: "1vh",
            }}
            alt=""
          />
        </div>
        <div
          className="w-100  d-flex justify-content-center align-items-center"
          style={{
            marginBottom: "4vh",
          }}
        >
          <div
            className="d-flex flex-column"
            style={{
              width: "35%",
              height: "52vh",
              display: "flex",
              alignItems: "center",
              objectFit: "cover",
              borderRadius: "1rem",
              border: ".5vw solid #fce500",
            }}
          >
            <Scanner onScan={scan} />
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              width: "40%",
              height: "52vh",
              padding: "1vh 1vw",
              objectFit: "fill",
              borderRadius: "1rem",
              overflow: "hidden",
              marginLeft: "5.5vw",
            }}
          >
            <div>
              <h2
                className="font-large text-center border-text-white text-orange"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  lineHeight: 1.35,
                }}
              >
                NHIỆT LIỆT CHÀO MỪNG
              </h2>
              <h2
                className="font-large text-center  text-blue"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  lineHeight: 1.35,
                }}
              >
                {userCurrent?.nguoidaidien || "- - - - - - - -"}
              </h2>
              <h2
                className="font-large text-center  text-blue"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  lineHeight: 1.35,
                }}
              >
                {userCurrent?.tencongty || "- - - - - - - -"}
              </h2>
              <h2
                className="font-large text-center border-text-white text-orange"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  lineHeight: 1.35,
                }}
              >
                ĐÃ VỀ THAM DỰ HỘI NGHỊ
              </h2>
              <h2
                className="font-large text-center  text-blue"
                style={{
                  textTransform: "uppercase",
                  marginBottom: "1.15vh",
                  lineHeight: 1.35,
                }}
              >
                SỐ BÀN : {userCurrent?.soban || "- - - - - - - -"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
