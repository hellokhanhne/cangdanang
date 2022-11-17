import { Spin } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import titleImg from "./assets/TenCTr.1.png";
import AdminWrappter from "./components/AdminWrappter";
import CoCauGiaiThuongModal from "./components/CoCauGiaiThuongModal";
import CreateUserModal from "./components/CreateUserModalx";
import UpdateUserModal from "./components/UpdateUserModal";
import { db } from "./firebase";
import useDebounce from "./hooks/useDebounce";

const UserMage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectUser, setSelectedUser] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showCoCauModal, setCoCauModal] = useState(false);
  const [tabs, setTabs] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const [unit, setUnit] = useState("All");
  const [loading, setLoading] = useState(true);

  const handleModalUpdate = (val) => {
    if (!val) {
      setSelectedUser(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đại biểu này ?")) {
      const usersRef = doc(db, "users", id);
      deleteDoc(usersRef);
    }
  };

  useEffect(() => {
    if (!unit) return;
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      const banUnit = Array.from(new Set(arr.map((e) => e.soban)));
      banUnit.sort((a, b) => Number(a) - Number(b));
      setTabs(banUnit);

      setLoading(false);

      setUsers(
        arr.filter(
          (u) =>
            (unit === "All" ? true : u.soban === unit) &&
            u.nguoidaidien.toUpperCase().includes(debouncedValue.toUpperCase())
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, [debouncedValue, unit]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,.3)",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <ToastContainer />
      <AdminWrappter>
        <div
          className="text-center"
          style={{
            marginTop: "5vh",
          }}
        >
          <img
            style={{
              maxWidth: "35%",
            }}
            src={titleImg}
            alt=""
          />
        </div>
        <div
          style={{
            textAlign: "right",
            marginTop: "1.5rem",
          }}
        >
          <button
            className="btn text-danger btn-warning text-bold me-4"
            onClick={() => setCoCauModal(true)}
          >
            Cơ cấu giải thưởng
          </button>

          <button
            className="btn text-danger btn-warning text-bold"
            onClick={() => setShowModalCreate(true)}
          >
            Thêm mới khách hàng
          </button>
        </div>

        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              marginBottom: "1vh",
            }}
          >
            <h5 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Tìm kiếm ( có dấu ){" "}
            </h5>
            <input
              className="form-control form-control-sm"
              type="text"
              style={{
                maxWidth: "75%",
              }}
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              id=""
            />
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              marginBottom: "3vh",
            }}
          >
            <h5 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Chọn số bàn
            </h5>
            <select
              className="form-select form-select-sm"
              value={unit}
              style={{
                maxWidth: "75%",
              }}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              <option value="All">Tất cả các bàn</option>
              {tabs.map((t) => (
                <option value={t} key={t}>
                  Bàn số {t}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              maxHeight: "57.25vh",
              overflowY: "auto",
            }}
          >
            <table className="w-100">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Người đại diện</th>
                  <th scope="col">Số bàn</th>
                  <th scope="col">Số may mắn</th>
                  <th scope="col">Tên công ty</th>
                  <th scope="col">Qr code </th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {users.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l.nguoidaidien}</td>
                    <td>{l.soban}</td>
                    <td>{l.somayman}</td>
                    <td>{l.tencongty} </td>
                    <td>{l.qrcode} </td>
                    <td>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="btn btn-danger me-3 text-white"
                      >
                        Xóa
                      </button>
                      <button
                        className="btn  btn-secondary"
                        onClick={() => setSelectedUser(l)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminWrappter>
      {/* modal  */}

      <CreateUserModal
        modalIsOpen={showModalCreate}
        setIsOpen={setShowModalCreate}
      />

      <UpdateUserModal
        modalIsOpen={Boolean(selectUser)}
        setIsOpen={handleModalUpdate}
        initForm={selectUser}
      />

      <CoCauGiaiThuongModal
        modalIsOpen={showCoCauModal}
        setIsOpen={setCoCauModal}
      />
    </>
  );
};

export default UserMage;
