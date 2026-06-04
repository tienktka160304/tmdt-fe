import { useEffect, useState } from "react";

export default function CountDown({ dest }) {
  const [timeLeft, setTimeLeft] = useState(
    new Date(dest).getTime() - Date.now(),
  );
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      const remaining = new Date(dest).getTime() - Date.now();
      setTimeLeft(Math.max(0, remaining));
    }, 1000);

    return () => clearInterval(timer);
  }, [new Date(dest).getTime()]);

  if (timeLeft <= 0) {
    return <div className="p-2 text-green-50">Chương trình đã kết thúc</div>;
  }

  const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
  );
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <div className="flex flex-col items-center rounded bg-gray-100 px-2 py-1 text-primary">
          <span className="text-xl font-medium">{days}</span>
          <span className="text-xs font-normal text-black">ngày </span>
        </div>
        <div className="text-white">:</div>
        <div className="flex flex-col items-center rounded bg-gray-100 px-2 py-1 text-primary">
          <span className="text-xl font-medium">{hours}</span>
          <span className="text-xs font-normal text-black">giờ</span>
        </div>
        <div className="text-white">:</div>

        <div className="flex flex-col items-center rounded bg-gray-100 px-2 py-1 text-primary">
          <span className="text-xl font-medium">{minutes}</span>
          <span className="text-xs font-normal text-black">phút</span>
        </div>
        <div className="text-white">:</div>

        <div className="flex flex-col items-center rounded bg-gray-100 px-2 py-1 text-primary">
          <span className="text-xl font-medium">{seconds}</span>
          <span className="text-xs font-normal text-black">giây</span>
        </div>
      </div>
    </>
  );
}
