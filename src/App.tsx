import { type ChangeEvent, type FormEvent, useState } from "react";
import "./App.css";
import CustomBtn from "./components/CustomBtn";
import CustomCard from "./components/CustomCard";
import { categories, colors, formInputsList, productList } from "./data";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./UI/SelectMenu";
function App() {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [tempColor, setTempColor] = useState<string[]>([]);
  // console.log(tempColor);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [newProduct, setNewProduct] = useState<IProduct>({
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
  // console.log(newProduct);
  const [productClicked, setproductClicked] = useState<IProduct>({
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
  console.log(productClicked);
  const [productClickedIdx, setproductClickedIdx] = useState<number>(0);
  const [addedProduct, setAddedProduct] = useState<IProduct[]>(productList);
  console.log(productClickedIdx);
  //  handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  function EditOpen() {
    setIsEditOpen(true);
  }

  function EditClose() {
    setIsEditOpen(false);
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setproductClicked({ ...productClicked, [name]: value });
    setErrorMsg({ ...errorMsg, [name]: "" });
  };

  function onSubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({
      title: newProduct.title,
      description: newProduct.description,
      imageURL: newProduct.imageURL,
      price: newProduct.price,
      tempColor: newProduct.colors,
    });
    // <ErrorMsg msg={errors.title} />;
    const hasErrMsg =
      Object.values(errors).some((values) => values === "") &&
      Object.values(errors).every((values) => values === "");
    // console.log(hasErrMsg);
    if (!hasErrMsg) {
      setErrorMsg(errors);
      return;
    }

    setAddedProduct((prev) => [
      {
        ...newProduct,
        id: uuid(),
        colors: tempColor,
        category: selectedCategory,
      },
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
  function onEditSubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({
      title: productClicked.title,
      description: productClicked.description,
      imageURL: productClicked.imageURL,
      price: productClicked.price,
      // tempColor: productClicked.colors,
      tempColor: [...productClicked.colors, ...tempColor]
    });
    // <ErrorMsg msg={errors.title} />;
    const hasErrMsg =
      Object.values(errors).some((values) => values === "") &&
      Object.values(errors).every((values) => values === "");
    // console.log(hasErrMsg);
    if (!hasErrMsg) {
      setErrorMsg(errors);
      return;
    }

    const updatedProduct = [...addedProduct];
    updatedProduct[productClickedIdx] = {...productClicked ,colors:tempColor.concat(productClicked.colors) };
    setAddedProduct(updatedProduct);
    setproductClicked({
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
    setTempColor([]);

    EditClose();
  }

  /*       Render      */
  const RenderProduct = addedProduct.map((product, index) => (
    <CustomCard
      newProduct={product}
      key={product.id}
      setproductClicked={setproductClicked}
      EditOpen={EditOpen}
      setproductClickedIdx={setproductClickedIdx}
      idx={index}
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
      <ErrorMsg msg={errorMsg[input.name]} />
    </div>
  ));
  // first way to render inputs in edit product

  // const Rendereditproduct = formInputsList.map((input) => (
  //   <div className="flex flex-col mb-3" key={input.id}>
  //     <label htmlFor={input.id}>{input.label}</label>
  //     <Input
  //       type={input.type}
  //       id={input.id}
  //       name={input.name}
  //       onChange={onChangeHandler}
  //       value={productClicked[input.name]}
  //     />
  //     <ErrorMsg msg={errorMsg[input.name]} />
  //   </div>
  // ));

  //  second way to render inputs in edit product
  const rendereditproduct = (
    id: string,
    label: string,
    type: string,
    name: "title" | "description" | "imageURL" | "price" | "colors"
  ) => {
    return (
      <div className="flex flex-col mb-3">
        <label htmlFor={id}>{label}</label>
        <Input
          type={type}
          id={id}
          name={name}
          onChange={onChangeEditHandler}
          value={productClicked[name]}
        />
        <ErrorMsg msg={errorMsg[name]} />
      </div>
    );
  };

  const RenderCircleColor = colors.map((color) => (
  
      <CircleColor
        color={color}
        key={color}
        onClick={() => {
          if (tempColor.includes(color)) {
            setTempColor((prev) => prev.filter((item) => item !== color));
            return;
          }
          if (productClicked.colors.includes(color)) {
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
      {/* add modal  */}
      <Modal isOpen={isOpen} closeModal={close} title="Add New Produt">
        <form action="" onSubmit={onSubmitHandler}>
          {RenderFormInputs}
          <div className="flex gap-1 my-3 space-x-2 flex-wrap">
            {RenderCircleColor}
            <ErrorMsg msg={errorMsg.colors} />
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
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
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
      {/* edit modal */}
      <Modal
        isOpen={isEditOpen}
        closeModal={EditClose}
        title="Edit this Produt"
      >
        <form action="" onSubmit={onEditSubmitHandler}>
          {/* {Rendereditproduct}   it's a way*/}
          {rendereditproduct("title", "Product Title", "text", "title")}
          {rendereditproduct(
            "description",
            "Product Description",
            "text",
            "description"
          )}
          {rendereditproduct("imageURL", "Product ImageURL", "url", "imageURL")}
          {rendereditproduct("price", "Product Price", "text", "price")}
          
          <div className="flex gap-1 my-3 space-x-2 flex-wrap">
            {RenderCircleColor}
            
          </div>
          {tempColor.concat(productClicked.colors).map((color, index) => (
            <span
              key={index}
              className="p-1 mr-1 mb-1 text-xs rounded-md text-white inline-block "
              style={{ backgroundColor: color }}
            >
              {color}
            </span>
          ))}
          <SelectMenu
            selected={productClicked.category}
            setSelected={value => setproductClicked({...productClicked , category:value})}
          />
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
