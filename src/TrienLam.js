import gttrienlam from "../src/GioithieuTrienlam.jpg";
import banner from "../src/Tieude.png";
import video from "../src/ĐẠI HỘI ĐOÀN THCS HỒ CHÍ MINH THÀNH PHỐ ĐÀ NẴNG LẦN THỨ XIX, NHIỆM KỲ 2022-2027.mp4";

function TriemLam() {
  return (
    <div className=" w-100 trienlam-wrapper d-flex">
      <div className="p-4 d-flex flex-column align-items-center h-100 justify-content-center m-auto">
        <div className=" text-center mb-5 ">
          <img style={{}} src={banner} className="trienlam-banner" alt="" />
        </div>
        <div className="video-wrapper">
          <video controls loop autoPlay muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="mt-4 text-center">
          <img src={gttrienlam} alt="" className="w-100 gttrienlam" />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <a href="https://trien-lam.netlify.app" className="trien-lam-button">
            <b>VÀO XEM</b>
          </a>
        </div>
        {/* ban quyền  */}
        <div
          className=" w-100 mt-5"
          style={{
            bottom: ".75vh",
          }}
        >
          <div className="text-center">
            <div className="d-flex">
              <p
                style={{
                  lineHeight: 1.2,
                }}
                className="border-text-blue  text-blue m-auto"
              >
                Bản quyền thuộc về Thành Đoàn Đà Nẵng. <br /> Thiết kế và xây
                dựng : Đoàn viên Ngọc Khánh - Đình Quý - Tuấn Ngọc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TriemLam;
