import React, { useState } from "react";

const KetQuaQuaySo = () => {
  const [dsTrungGiai, setDsTrungGiai] = useState([]);
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
              <td>{l.giaithuong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KetQuaQuaySo;
