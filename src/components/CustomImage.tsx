interface Iprops {
  imageURL: string;
  alt: string;
  className?: string;
}

const CustomImage = ({ imageURL, alt,className }: Iprops) => {
  return (
    <>
      <img src={imageURL} alt={alt} className={ `${className} w-full rounded-md h-[120px]`} />
    </>
  );
};

export default CustomImage;
