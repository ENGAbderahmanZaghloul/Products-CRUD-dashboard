import "./App.css";
import CustomCard from "./components/CustomCard";
import { productList } from "./data";

function App() {
  const RenderProduct = productList.map((product) => (
    <CustomCard
      key={product.id}
      imgSrc={product.imageURL}
      title={product.title}
      para={product.description}
      colors={product.colors}
      category={product.category.name}
      price={0}
    />
  ));
  return (
    <main className="container mx-auto">
      <div className="mx-5 my-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 ">
        {RenderProduct}
      </div>
    </main>
  );
}

export default App;
