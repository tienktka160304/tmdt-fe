import { useEffect, useState } from "react";
import { useFetch } from "../../../hook/useFeach";
import { getToken, saveUser } from "../../../util/auth";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchUserActive, updateUser } from "../../../api/user";
import BtnAnimation from "../../../component/shared/BtnAnimation";

export default function EditAccout(params) {
  const { isFetching, fetchedData } = useFetch(fetchUserActive, []);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (fetchedData.data?.length) {
      const user = fetchedData.data[0];
      setUserData(user);
      setFormData(user);
    }
  }, [fetchedData]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);
  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    const selectedProvince = provinces.find((p) => p.name === provinceName);

    setFormData((prev) => ({
      ...prev,
      province: selectedProvince ? selectedProvince.name : "",
      district: "",
      ward: "",
    }));

    setDistricts(selectedProvince ? selectedProvince.districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const selectedDistrict = districts.find((d) => d.name === districtName);

    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict ? selectedDistrict.name : "",
      ward: "",
    }));

    setWards(selectedDistrict ? selectedDistrict.wards : []);
  };

  const handleWardChange = (e) => {
    const wardName = e.target.value;
    const selectedWard = wards.find((w) => w.name === wardName);

    setFormData((prev) => ({
      ...prev,
      ward: selectedWard ? selectedWard.name : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Token = getToken();

    const fullAddress = [
      formData.houseNumber, // Số nhà, tên đường
      formData.ward,
      formData.district,
      formData.province,
    ]
      .filter(Boolean) // Xóa phần tử rỗng
      .join(", ");
    const formDataToSend = new FormData();
    if (selectedFile) {
      formDataToSend.append("img", selectedFile);
    }

    formDataToSend.append("address", fullAddress);

    // Chỉ thêm trường nào đã thay đổi
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== userData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
    const response = await updateUser(formDataToSend);

    if (response.success === false) {
      Swal.fire(response.message);
      return;
    }

    if (response) {
      saveUser(response.user);
      Swal.fire(response.message).then((result) => window.location.reload());
    }
  };

  return (
    <>
      <div data-aos="zoom-in" data-aos-delay="400" className="rounded-md p-4">
        <h2 className="pb-4 text-center text-xl font-medium">
          Chỉnh sửa thông tin
        </h2>
        {isFetching && !fetchedData.data?.length && <p>Vui lòng đợi !</p>}

        <Form onSubmit={handleSubmit} className="border px-4 py-6">
          {!isFetching &&
            fetchedData.data?.length &&
            fetchedData.data.map((item) => (
              <div key={item.id}>
                <div className="">
                  <label
                    htmlFor="img-avatar"
                    className="inline-block h-36 w-36 cursor-pointer overflow-hidden rounded-full border p-1 shadow"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full overflow-hidden rounded-full object-cover"
                      />
                    ) : userData.avatar ? (
                      <img
                        src={`${import.meta.env.VITE_ENDPOINT + userData.avatar}`}
                        alt="Avatar"
                        className="h-full w-full overflow-hidden rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="/18.png"
                        alt="avatar"
                        className="h-full w-full overflow-hidden rounded-full object-cover"
                      />
                    )}
                  </label>

                  <input
                    type="file"
                    name="img"
                    id="img-avatar"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="pb-3">
                  <span className="inline-block w-32 font-semibold">
                    Số điện thoại:
                  </span>
                  <div>
                    <input
                      className="mb-2 mt-1 w-full rounded border bg-gray-100 px-4 py-1"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                    />
                  </div>
                </p>
                <p className="pb-3">
                  <span className="inline-block w-32 font-semibold">
                    Ngày sinh:
                  </span>
                  <div>
                    <input
                      type="date"
                      className="mb-2 mt-1 w-full rounded border bg-gray-100 px-4 py-1"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleChange}
                    />
                  </div>
                </p>
                <p className="pb-3">
                  <span className="inline-block w-32 font-semibold">
                    Giới tính:
                  </span>
                  <div>
                    <select
                      className="mb-2 mt-1 w-full rounded border bg-gray-100 px-4 py-1"
                      name="gender"
                      value={formData.gender || "0"}
                      onChange={handleChange}
                    >
                      <option value="0">Chưa cập nhật</option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                    </select>
                  </div>
                </p>

                <p className="">
                  <span className="inline-block w-32 font-semibold">
                    Địa chỉ:
                  </span>
                  <div>
                    <select
                      className="mb-2 mt-1 w-full rounded border bg-gray-100 px-4 py-1"
                      value={formData.province || ""}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Chọn Tỉnh/Thành</option>
                      {provinces.map((p) => (
                        <option key={p.code} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="mb-2 mt-1 w-full rounded border bg-gray-100 px-4 py-1"
                      value={formData.district || ""}
                      onChange={handleDistrictChange}
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((d) => (
                        <option key={d.code} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="r ounded mb-2 mt-1 mt-2 w-full border bg-gray-100 px-4 py-1"
                      value={formData.ward || ""}
                      onChange={handleWardChange}
                    >
                      <option value="">Chọn Xã/Phường</option>
                      {wards.map((w) => (
                        <option key={w.code} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </p>

                <p className="pb-3">
                  <span className="inline-block w-32 font-semibold">
                    Đường số nhà:
                  </span>
                  <div>
                    <input
                      className="r ounded mb-2 mt-1 w-full border bg-gray-100 px-4 py-1"
                      name="houseNumber"
                      value={formData.houseNumber || ""}
                      onChange={handleChange}
                      placeholder="Số nhà, tên đường"
                    />
                  </div>
                </p>
                <BtnAnimation>
                  <button
                    type="submit"
                    className="mx-auto ml-4 mt-4 rounded-md bg-primary px-8 py-2 font-semibold text-white hover:bg-black"
                  >
                    Cập nhật thông tin
                  </button>
                </BtnAnimation>
              </div>
            ))}
        </Form>
      </div>
    </>
  );
}
