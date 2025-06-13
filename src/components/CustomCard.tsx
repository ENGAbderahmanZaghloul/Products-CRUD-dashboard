// import { colors } from "../data";
import type { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import CustomBtn from "./CustomBtn";
import CustomImage from "./CustomImage";

interface Iprops {
  // title: string;
  // para: string;
  // category: string;
  // price: number;
  // imgSrc: string;
  // colors: string[];
  newProduct: IProduct;
}

const CustomCard = ({ newProduct }: Iprops) => {
  const { title, description, imageURL, price, colors, category } = newProduct;

  const RenderCircleColor = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));
  return (
    <section className="border py-2 px-2 max-w-sm min-w-2xs md:max-w-lg mx-auto sm:mx-0 ">
      <CustomImage imageURL={imageURL} alt="lapTop img" />
      <div className="flex flex-col gap-5">
        <h1 className="text-1xl font-medium">{title}</h1>
        <p className="text-[12px]">{textSlicer(description)}</p>
      </div>
      <div className="flex gap-1 my-3 space-x-2 flex-wrap">
        {colors && colors.length > 0 ? (
          RenderCircleColor
        ) : (
          <div className="h-4">no color avilable</div>
        )}
      </div>
      <div className="my-3 flex justify-between">
        <p className="text-blue-600 font-semibold">$ {price}</p>
        <div className="flex gap-1.5">
          <CustomImage
            imageURL="/imgs/laptob.jpg"
            alt="lapTop img"
            className="rounded !w-8 !h-8"
          />
          <p>{category.name}</p>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <CustomBtn title="Edit" type={true} className="!w-full" />
        <CustomBtn title="Destory" type={false} className="!w-full" />
      </div>
    </section>
  );
};

export default CustomCard;
