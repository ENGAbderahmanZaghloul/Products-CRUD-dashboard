type Iprops = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ ...rest }: Iprops) => {
  return (
    <>
      <input
        {...rest}
        className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md"
      />
    </>
  );
};

export default Input;
