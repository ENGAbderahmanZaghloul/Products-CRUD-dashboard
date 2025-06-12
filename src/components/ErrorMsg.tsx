interface Iprops {
  msg: string;
}

const ErrorMsg = ({ msg }: Iprops) => {
  return (
    <>
      {msg ?
      <span className="block text-sm font-semibold text-red-700">{msg}</span>
      :null}
    </>
  );
};

export default ErrorMsg;
