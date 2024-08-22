const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-[9999] pointer-events-none">
      <div className=" w-16 h-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
