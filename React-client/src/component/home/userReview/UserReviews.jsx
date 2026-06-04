import Card from "../../shared/Card";
import Heading from "../../shared/Heading";
import UserReviewList from "./UserReviewList";

export default function UserReviews(params) {
  return (
    <Card>
      <Heading headingName="Khách hàng nói gì" />
      <UserReviewList />
    </Card>
  );
}
