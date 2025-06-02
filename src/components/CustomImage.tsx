interface Iprops {
  imgUrl: string;
  alt: string;
  className?: string;
}

const CustomImage = ({ imgUrl, alt,className }: Iprops) => {
  return (
    <>
      <img src={imgUrl} alt={alt} className={ `${className} w-full rounded-md h-[120px]`} />
    </>
  );
};

export default CustomImage;
