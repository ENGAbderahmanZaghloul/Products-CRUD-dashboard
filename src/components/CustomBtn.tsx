interface Iprops  {
  title: string;
  type: boolean;
  className?: string;
  onClick?: () => void;
}

const CustomBtn = ({ title, type, className, onClick }: Iprops) => {
  return (
    <>
      {type ? (
        <button
          className={`${className} w-[100px] h-[40px] rounded-md bg-blue-600 text-white font-medium cursor-pointer`}
          onClick={onClick}
        >
          {title}
        </button>
      ) : (
        <button
          className={`${className} w-[100px] h-[40px] rounded-md bg-red-600 text-white font-medium cursor-pointer`}
          onClick={onClick}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default CustomBtn;
