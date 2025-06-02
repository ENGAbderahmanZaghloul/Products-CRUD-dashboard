import { textSlicer } from "../utils/functions";
import CustomBtn from "./CustomBtn";
import CustomImage from "./CustomImage";

interface Iprops {
  title: string;
  para: string;
  category: string;
  price: number;
  imgSrc: string;
  colors: string[];
}

const CustomCard = ({
  imgSrc,
  title,
  para,
  price,
  category,
  colors,
}: Iprops) => {
  return (
    <section className="border py-2 px-2 max-w-sm min-w-2xs md:max-w-lg mx-auto sm:mx-0 ">
      <CustomImage imgUrl={imgSrc} alt="lapTop img" />
      <div className="flex flex-col gap-5">
        <h1 className="text-1xl font-medium">{title}</h1>
        <p className="text-[12px]">{textSlicer(para)}</p>
      </div>
      <div className="flex gap-1 my-3 ">
        {colors && colors.length > 0 ? (
          colors
            .slice(0, 3)
            .map((color) => (
              <span
                className={`rounded-full  w-4 h-4 inline-block`}
                style={{ backgroundColor: color }}
              ></span>
            ))
        ) : (
          <div className="h-4">no color avilable</div>
        )}
      </div>
      <div className="my-3 flex justify-between">
        <p className="text-blue-600 font-semibold">$ {price}</p>
        <div className="flex gap-1.5">
          <CustomImage
            imgUrl="/imgs/laptob.jpg"
            alt="lapTop img"
            className="rounded !w-8 !h-8"
          />
          <p>{category}</p>
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
