import { Button } from "antd";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import titleImg from "./assets/TenCTr.3.png";
import KetQuaQuaySo from "./components/KetQuaQuaySo";
import QuaySoTab from "./components/QuaySoTab";
import { db } from "./firebase";

function QuaySo() {
  const [tab, setTab] = useState(1);

  const [dsTrungGiai, setDsTrungGiai] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "dstrunggiai"), orderBy("tengiaithuong"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      // for (let d of querySnapshot.docs) {
      //   await deleteDoc(doc(db, "dstrunggiai", d.id));
      // }
      setDsTrungGiai(
        querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={` main-wrapper-thong-ke`}>
      <div
        className="h-100"
        style={{
          paddingLeft: "10vw",
          paddingRight: "10vw",
          paddingTop: "18vh",
        }}
      >
        <div
          className="text-center"
          style={{
            marginBottom: "7vh",
          }}
        >
          <img
            src={titleImg}
            alt=""
            style={{
              maxWidth: "25vw",
            }}
          />
        </div>
        <div className="d-flex">
          <div className="flex-1">
            <div className="title-wrapper">
              {" "}
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="d-flex"
              >
                <div className="d-flex ms-2 ">
                  <Button
                    size="large"
                    onClick={() => setTab(1)}
                    type={tab === 1 ? "primary" : "dashed"}
                    className="me-2"
                  >
                    Quay số
                  </Button>
                  <Button
                    size="large"
                    onClick={() => setTab(2)}
                    type={tab === 2 ? "primary" : "dashed"}
                  >
                    Kết quả quay số
                  </Button>
                </div>
              </div>
            </div>

            {tab === 1 && <QuaySoTab dsTrungGiai={dsTrungGiai} />}
            {tab === 2 && <KetQuaQuaySo dsTrungGiai={dsTrungGiai} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuaySo;
