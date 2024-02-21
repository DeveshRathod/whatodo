import React from "react";

const Not_Found = () => {
  return (
    <div className=" h-screen w-screen customBg4">
      <div className=" w-full h-full flex items-center justify-center flex-col">
        <h1 className=" text-2xl sm:text-3xl customText1">
          404 Page Not Found
        </h1>
        <p className=" text-xl sm:text-2xl text-center customText2">
          The page you are trying to access is not available.{" "}
          <a
            className=" underline"
            href="https://en.wikipedia.org/wiki/HTTP_404"
          >
            Know more
          </a>
        </p>
      </div>
    </div>
  );
};

export default Not_Found;
