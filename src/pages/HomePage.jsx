import CardComponent from "../components/CardComponent";
import HeroComponent from "../components/HeroComponent";

const HomePage = () => {
  return (
    <>
      <HeroComponent />

      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          <CardComponent />
        </div>
      </section>
    </>
  );
};

export default HomePage;
