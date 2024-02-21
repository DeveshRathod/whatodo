import React from "react";
import NotFound from "../components/NotFound";

const Not_Found = () => {
  return (
    <NotFound>
      <div className=" w-full h-full flex items-center justify-center flex-col">
        <h1 className=" text-2xl sm:text-3xl customText1">
          404 Page Not Found
        </h1>
        <p className=" text-xl sm:text-2xl text-center customText2">
          The page you are trying to access is not available{" "}
          <a
            className=" underline"
            href="https://en.wikipedia.org/wiki/HTTP_404"
          >
            Know more
          </a>
        </p>
      </div>
    </NotFound>
  );
};

export default Not_Found;
