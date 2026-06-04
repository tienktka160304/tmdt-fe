import { NavLink } from "react-router-dom";
import { fetchBannerThree } from "../../../api/home";
import { useFetch } from "../../../hook/useFeach";

export default function BannerSale() {
  const { fetchedData } = useFetch(fetchBannerThree, []);

  return (
    <div className="mt-4">
      {fetchedData?.length == 1 && (
        <NavLink
          data-aos="zoom-in"
          to={import.meta.env.VITE_APP + fetchedData[0]?.link}
          className="inline-block max-h-[230px] w-full overflow-hidden rounded-lg shadow duration-500 hover:scale-[1.01] hover:shadow-2xl"
        >
          <img
            src={import.meta.env.VITE_ENDPOINT + fetchedData[0]?.image}
            className="h-full w-full"
            alt=""
          />
        </NavLink>
      )}

      {fetchedData?.length == 0 && (
        <div className="h-56 w-full animate-pulse cursor-wait bg-loading align-middle opacity-50"></div>
      )}
    </div>
  );
}
