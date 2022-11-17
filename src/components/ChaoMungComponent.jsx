import React, { memo } from "react";

const ChaoMungComponent = ({ userCurrent }) => {
  return (
    <div>
      <h2
        className="font-large text-center border-text-white text-orange"
        style={{
          textTransform: "uppercase",
          marginBottom: "1.15vh",
          fontSize: "3.5vw",
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
          fontSize: "3.5vw",
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
          fontSize: "3.5vw",
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
          fontSize: "3.5vw",
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
          fontSize: "3.5vw",
          lineHeight: 1.35,
        }}
      >
        SỐ BÀN : {userCurrent?.soban || "- - - - - - - -"}
      </h2>
    </div>
  );
};

export default memo(ChaoMungComponent);
