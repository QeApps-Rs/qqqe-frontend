import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="absolute bg-[url('/src/images/purple-bg.jpg')] bg-fixed bg-no-repeat bg-cover w-full h-auto">
        <div className="relative inset-0 backdrop-brightness-50 opacity-90 min-h-screen">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
