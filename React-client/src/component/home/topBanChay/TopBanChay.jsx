import { useState } from "react";
import Card from "../../shared/Card";
import XepDap from "./XeDap";
import PhuKien from "./PhuKien";
import Heading from "../../shared/Heading";
import BtnAnimation from "../../shared/BtnAnimation";

export default function TopBanChay() {
  const [state, setState] = useState(true);

  return (
    <Card>
      <Heading headingName="top bán chạy" />
      <div className="flex justify-center gap-4 text-xl">
        <BtnAnimation>
          <button
            data-aos="zoom-in-right"
            data-aos-offset="100"
            onClick={() => setState(true)}
            className={`${state ? "bg-primary font-medium text-white shadow" : "border bg-white text-black"} rounded-full px-6 py-1 text-sm`}
          >
            Laptop
          </button>
        </BtnAnimation>
        <BtnAnimation>
          <button
            data-aos="zoom-in-left"
            data-aos-offset="100"
            onClick={() => setState(false)}
            className={`${!state ? "bg-primary font-medium text-white shadow" : "border bg-white text-black"} rounded-full px-6 py-1 text-sm`}
          >
            Phụ kiện
          </button>
        </BtnAnimation>
      </div>
      <XepDap state={state} />
      <PhuKien state={state} />
    </Card>
  );
}
