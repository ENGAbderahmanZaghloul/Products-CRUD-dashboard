interface Iprops {
  title: string;
  type: boolean;
  className?: string;
}

const CustomBtn = ({ title, type, className }: Iprops) => {
  return (
    <>
      {type ? (
        <button
          className={`${className} w-[100px] h-[40px] rounded-md bg-blue-600 text-white font-medium cursor-pointer`}
        >
          {title}
        </button>
      ) : (
        <button
          className={`${className} w-[100px] h-[40px] rounded-md bg-red-600 text-white font-medium cursor-pointer`}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default CustomBtn;
