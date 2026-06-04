import { useEffect, useRef, useState } from "react";
import Card from "../component/shared/Card";
import { MdAlternateEmail, MdOutlineLocalPhone } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { sendContactForm } from "../api/contact";
import Swal from "sweetalert2";
import Breadcrumb from "../component/shared/Breadcrumb";
import BtnLoadingSubmit from "../component/shared/BtnLoadingSubmit";

export default function LienHe() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const [status, setStatus] = useState(false);
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      message: messageRef.current.value.trim(),
    };

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setIsError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setStatus(true);
    const result = await sendContactForm(formData);
    setIsError("");

    if (result.success) {
      setStatus(false);
      Swal.fire({
        title: "Chúng tôi sẽ liên hệ!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Đóng",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-primary text-white rounded-lg px-4 py-2",
        },
      });
    } else {
      Swal.fire({
        title: "Có lỗi xảy ra!",
        icon: "error",
        draggable: true,
      });
      setStatus(false);
    }
  };

  // useEffect(() => {
  //   document.title = "Liên hệ | xedap_3s";
  // }, []);
  useEffect(() => { 
    document.title = `Liên hệ | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  return (
    <>
      <Breadcrumb nav1="" nav1Link="" nav2="" nav2Link="" navEnd="Liên hệ" />
      <Card>
        <header className="ml-3 gap-x-4 pb-5">
          <h1 className="text-base font-bold leading-loose text-primary sm:text-lg md:text-xl lg:text-2xl">
            THÔNG TIN LIÊN HỆ
          </h1>
        </header>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="mx-auto hidden max-w-[1000px] items-center justify-between rounded-lg py-11 text-black md:flex"
        >
          <div className="flex max-w-72 flex-col items-center gap-y-2">
            <p>
              <MdOutlineLocalPhone className="text-5xl text-primary" />
            </p>

            <p className="text-xl font-semibold italic text-primary">
              Số điện thoại
            </p>
            <p className="text-center font-medium">
              {import.meta.env.VITE_APP_PHONE}
            </p>
          </div>
          <div className="flex max-w-72 flex-col items-center gap-y-2">
            <p>
              <GiPositionMarker className="text-5xl text-primary" />
            </p>

            <p className="text-xl font-semibold italic text-primary">Địa chỉ</p>
            <p className="text-center font-medium">
              {import.meta.env.VITE_APP_ADDRESS}
            </p>
          </div>
          <div className="flex max-w-72 flex-col items-center gap-y-2">
            <p>
              <MdAlternateEmail className="text-5xl text-primary" />
            </p>

            <p className="text-xl font-semibold italic text-primary">Email</p>
            <p className="text-center font-medium">
              {import.meta.env.VITE_APP_EMAIL}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-2">
          <div data-aos="zoom-in-right" data-aos-delay="200">
            <iframe
              className="h-full max-h-[650px] min-h-[400px] w-full rounded-lg shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.6673494465317!2d105.76740087504207!3d20.965869880667736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452d82b5d07a9%3A0x4393a6f1700dc31a!2zMjk5IMSQLiBRdWFuZyBUcnVuZywgVGjhu4sgeMOjLCBIw6AgxJDDtG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1775633853101!5m2!1svi!2s" 
              loading="lazy"
            ></iframe>
          </div>
          <div
            data-aos="zoom-in-left"
            data-aos-delay="200"
            className="rounded-lg bg-white p-6 shadow"
          >
            <h2 className="mb-4 text-2xl font-bold">Liên hệ chúng tôi</h2>
            <p className="mb-4 text-sm font-semibold text-gray-600">
              Để liên hệ và nhận các thông tin khuyến mãi sớm nhất, Chúng tôi sẽ
              liên lạc với bạn trong thời gian sớm nhất
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                ref={nameRef}
                type="text"
                name="name"
                placeholder="Tên của bạn (*)"
                className="w-full rounded border p-3"
              />
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email của bạn (*)"
                className="w-full rounded border p-3"
              />
              <input
                ref={phoneRef}
                type="text"
                name="phone"
                placeholder="Số điện thoại của bạn (*)"
                className="w-full rounded border p-3"
              />
              <textarea
                ref={messageRef}
                name="message"
                placeholder="Nhập mô tả (*)"
                className="w-full rounded border p-3"
              />

              <BtnLoadingSubmit
                isPending={status}
                loadingText="Đang gửi"
                defaultText="Gửi yêu cầu"
                typebtn="submit"
              />
              <p className="text-sm text-red-600">{isError}</p>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
}
