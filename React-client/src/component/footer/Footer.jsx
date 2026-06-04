import Endfooter from "./Endfooter";
import TopFooter from "./TopFooter";

function Footer() {
  return (
    <>
      <footer className="relative text-center md:text-left">
        <div className="bg-gray-200/60 py-16">
          <div className="container">
            <TopFooter />
          </div>
        </div>
        <Endfooter />
      </footer>
    </>
  );
}

export default Footer;
