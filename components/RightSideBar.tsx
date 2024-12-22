import React from "react";

const RightSideBar = () => {
  return (
    <section className="h-screen fixed right-0 top-12  w-60 bg-light-gray dark:bg-dark-gray p-4">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-poppins font-semibold">Topic Question</h1>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-noto_serif text-sm ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            provident, hic deserunt vitae, at magni reiciendis neque nisi quia
            ex ipsum impedit molestiae fugiat! Ullam blanditiis consectetur
            doloremque debitis modi?
          </p>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 shadow rounded-full bg-white dark:bg-gray-500 font-noto_serif text-sm">
              chip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
