import { type ChangeEvent, useState } from "react";
import "./App.css";
import CustomBtn from "./components/CustomBtn";
import CustomCard from "./components/CustomCard";
import { formInputsList, productList } from "./data";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import type { IProduct } from "./interfaces";

function App() {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<IProduct>({
    id: "",
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
console.log(newProduct);
  //  handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

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

  const RenderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col mb-3" key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        onChange={onChangeHandler}
        value={newProduct[input.name]}
      />
    </div>
  ));
  return (
    <main className="container mx-auto mt-5">
      <div dir="rtl" className="w-full mr-20">
        <CustomBtn
          onClick={() => open()}
          title="Build A Product"
          type={true}
          className="w-fit p-1 mr-14"
        />
      </div>
      <Modal isOpen={isOpen} closeModal={close} title="Add New Produt">
        <form action="">
          {RenderFormInputs}
          <div className="flex justify-between gap-5">
            <CustomBtn title="Submit" type={true} className="w-full " />
            <CustomBtn
              title="Close"
              type={true}
              className="bg-gray-600 w-full"
              onClick={() => close()}
            />
          </div>
        </form>
      </Modal>
      <div className="mx-5 my-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 ">
        {RenderProduct}
      </div>
    </main>
  );
}

export default App;
