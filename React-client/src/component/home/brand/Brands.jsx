import Card from "../../shared/Card";
import BrandList from "./BrandList";

export default function Brands() {
  return (
    <Card bg="bg-white">
      <div className="py-5">
        <header className="ml-3 gap-x-4 pb-5">
          <h2 className="text-base font-bold uppercase leading-loose text-primary sm:text-lg md:text-xl lg:text-2xl">
            thương hiệu
          </h2>
        </header>
        <BrandList />
      </div>
    </Card>
  );
}
