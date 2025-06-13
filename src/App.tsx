import { type ChangeEvent, type FormEvent, useState } from "react";
import "./App.css";
import CustomBtn from "./components/CustomBtn";
import CustomCard from "./components/CustomCard";
import { colors, formInputsList, productList } from "./data";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
function App() {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  console.log(tempColor);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
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

  const [addedProduct, setAddedProduct] = useState<IProduct[]>(productList);

  //  handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onCancel = () => {
    setNewProduct({
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
    close();
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setErrorMsg({ ...errorMsg, [name]: "" });
  };

  function onSubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({
      title: newProduct.title,
      description: newProduct.description,
      imageURL: newProduct.imageURL,
      price: newProduct.price,
    });
    <ErrorMsg msg={errors.title} />;
    const hasErrMsg =
      Object.values(errors).some((values) => values === "") &&
      Object.values(errors).every((values) => values === "");
    console.log(hasErrMsg);
    if (!hasErrMsg) {
      setErrorMsg(errors);
      return;
    }
    setAddedProduct((prev) => [
      { ...newProduct, id: uuid(), colors: tempColor },
      ...prev,
    ]);
    setNewProduct({
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
    close();
  }

  /*       Render      */
  const RenderProduct = addedProduct.map((product) => (
    <CustomCard newProduct={product} />
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
      <ErrorMsg msg={errorMsg[input.name]} />
    </div>
  ));

  const RenderCircleColor = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
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
        <form action="" onSubmit={onSubmitHandler}>
          {RenderFormInputs}
          <div className="flex gap-1 my-3 space-x-2 flex-wrap">
            {RenderCircleColor}
          </div>
          {tempColor &&
            tempColor.map((color, index) => (
              <span
                key={index}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white inline-block "
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          <div className="flex justify-between gap-5 mt-4">
            <CustomBtn title="Submit" type={true} className="w-full " />
            <CustomBtn
              title="Close"
              type={true}
              className="bg-gray-600 w-full"
              onClick={onCancel}
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
