export default function Card(props) {
  return (
    <section
      className={`${props.bg ? props.bg : "bg-greenwhite"} py-8 sm:py-6 md:py-8`}
    >
      <div className="container">{props.children}</div>
    </section>
  );
}
