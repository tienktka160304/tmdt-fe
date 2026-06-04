import ButtonSeeAll from "../../shared/ButtonSeeAll";
import Card from "../../shared/Card";
import Heading from "../../shared/Heading";
import NewsList from "./NewsList";

export default function News(params) {
  return (
    <div className="border-t border-gray-300">
      <Card>
        <Heading headingName="Tin tức nổi bật" />
        <NewsList />
        <ButtonSeeAll link="/tin-tuc" />
      </Card>
    </div>
  );
}
