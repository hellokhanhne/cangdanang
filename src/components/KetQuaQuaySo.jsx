import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const KetQuaQuaySo = () => {
  const [dsTrungGiai, setDsTrungGiai] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "dstrunggiai"), orderBy("tengiaithuong"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
    <div
      className="w-100 "
      style={{
        height: "53.25vh",
        overflowY: "auto",
        marginTop: "3vh",
      }}
    >
      <table
        className="w-100"
        style={{
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Người đại diện</th>
            <th scope="col">Công ty</th>
            <th scope="col">Số may mắn</th>
            <th scope="col">Đã trúng giải</th>
          </tr>
        </thead>

        <tbody>
          {dsTrungGiai.map((l, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{l.nguoidaidien}</td>
              <td>{l.tencongty}</td>
              <td>{l.somayman}</td>
              <td>{l.tengiaithuong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaQuaySo;

// DELETE ALL DATY IN COLLECTION
// for (let d of querySnapshot.docs) {
//   await deleteDoc(doc(db, "dstrunggiai", d.id));
// }
