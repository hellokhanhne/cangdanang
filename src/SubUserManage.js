import { Spin } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminWrappter from "./components/AdminWrappter";
import SubCreateUserModal from "./components/SubCreateUserModal";
import SubUpdateUserModal from "./components/SubUpdateUserModal";
import { db } from "./firebase";
import useDebounce from "./hooks/useDebounce";

const SubUserMage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectUser, setSelectedUser] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [tabs, setTabs] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const [unit, setUnit] = useState("All");
  const [loading, setLoading] = useState(true);

  // const [deleteId, setDeleteId] = useState(null);

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

      arr.sort(
        (a, b) =>
          Number(a?.qrcode?.split("DHXIXTPDN")[1]) -
          Number(b?.qrcode?.split("DHXIXTPDN")[1])
      );

      setUsers(
        arr.filter(
          (u) =>
            (unit === "All" ? true : u.unit === unit) &&
            u.name.toUpperCase().includes(debouncedValue.toUpperCase())
        )
      );
    });
    return () => {
      unsubscribe();
    };
  }, [debouncedValue, unit]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "units"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data().value);
      });
      data.sort((a, b) => a.localeCompare(b));
      setTabs(data);
      setLoading(false);
    })();
  }, []);

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
          style={{
            textAlign: "right",
          }}
        >
          <button
            className="btn text-danger btn-warning text-bold"
            onClick={() => setShowModalCreate(true)}
          >
            Thêm mới
          </button>
        </div>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <div className="d-flex align-items-center justify-content-center mb-4">
            <h3 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Tìm kiếm ( có dấu ){" "}
            </h3>
            <input
              className="form-control"
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
          <div className="d-flex align-items-center justify-content-center mb-4">
            <h3 className="pe-4 mb-0 border-text-blue text-blue flex-1">
              Chọn đơn vị
            </h3>
            <select
              className="form-select"
              value={unit}
              style={{
                maxWidth: "75%",
              }}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              <option value="All">Tất cả</option>
              {tabs.map((t) => (
                <option value={t} key={t}>
                  {t}
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
                  <th scope="col">Ảnh</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Đơn vị</th>
                  <th scope="col">Qr code </th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>

              <tbody>
                {users.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={l.userImg}
                        style={{
                          width: 150,
                          height: 100,
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td>{l.name}</td>
                    <td>{l.unit}</td>
                    <td>{l.qrcode} </td>
                    <td>
                      <div className="d-flex">
                        <button
                          onClick={() => handleDelete(l.id)}
                          className="btn btn-danger me-3 text-white"
                        >
                          Delete
                        </button>
                        <button
                          className="btn  btn-secondary"
                          onClick={() => setSelectedUser(l)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminWrappter>
      {/* modal  */}

      <SubCreateUserModal
        modalIsOpen={showModalCreate}
        setIsOpen={setShowModalCreate}
      />

      <SubUpdateUserModal
        modalIsOpen={Boolean(selectUser)}
        setIsOpen={handleModalUpdate}
        initForm={selectUser}
      />
    </>
  );
};

export default SubUserMage;
