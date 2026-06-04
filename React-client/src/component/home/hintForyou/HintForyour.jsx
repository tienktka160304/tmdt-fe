import Card from "../../shared/Card";
import Heading from "../../shared/Heading";
import ContentForYou from "./ContentForYou";

export default function HintForyour() {
  return (
    <Card>
      <Heading headingName="Sản phẩm Nổi bật" />
      <div className="grid grid-cols-2 gap-1 pt-4 sm:gap-5 sm:pt-8 md:pt-10 lg:grid-cols-4 xl:grid-cols-4">
        <ContentForYou />
      </div>
    </Card>
  );
}
