// import { colors } from "../data";
import type { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import CustomBtn from "./CustomBtn";
import CustomImage from "./CustomImage";

interface Iprops {
  newProduct: IProduct;
  setproductClicked: (newProduct: IProduct) => void;
  EditOpen: (value: boolean) => void;
  removeOpen: (value: boolean) => void;
  setproductClickedIdx: (value: number) => void;
  idx: number;
}

const CustomCard = ({
  newProduct,
  setproductClicked,
  EditOpen,
  removeOpen,
  setproductClickedIdx,
  idx,
}: Iprops) => {
  const { title, description, imageURL, price, colors, category } = newProduct;

  const RenderCircleColor = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  const onEdit = () => {
    setproductClicked(newProduct);
    EditOpen(true);
    setproductClickedIdx(idx);
  };

  const onRemove = () =>{
    setproductClicked(newProduct);  //علشان اتحكم ف نفس المنتج ال بضغط عليه اخلي ال state  بتاع الكليك تخزن المنتج الممضغوط
    removeOpen(true)
  }
  return (
    <section className="border py-2 px-2 max-w-sm min-w-2xs md:max-w-lg mx-auto sm:mx-0 ">
      <CustomImage imageURL={imageURL} alt="lapTop img" />
      <div className="flex flex-col gap-5">
        <h1 className="text-1xl font-medium">{title}</h1>
        <p className="text-[12px]">{textSlicer(description)}</p>
      </div>
      <div className="flex gap-1 my-3 space-x-2 flex-wrap">
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors!</p>
        ) : (
          RenderCircleColor
        )}
      </div>
      <div className="my-3 flex justify-between">
        <p className="text-blue-600 font-semibold">$ {price}</p>
        <div className="flex gap-1.5">
          <CustomImage
            imageURL={category.imageURL}
            alt="lapTop img"
            className="rounded !w-8 !h-8"
          />
          <p>{category.name}</p>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <CustomBtn
          title="Edit"
          type={true}
          className="!w-full"
          onClick={onEdit}
        />
        <CustomBtn title="Remove" type={false} className="!w-full" onClick={onRemove} />
      </div>
    </section>
  );
};

export default CustomCard;
