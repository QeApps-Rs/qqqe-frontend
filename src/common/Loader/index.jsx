import loader from "/src/images/artificial-intelligence.gif";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-[9999] pointer-events-none ">
      <img src={loader} alt="" width={"200px"} height={"200px"} />{" "}
    </div>
  );
};

export default Loader;
