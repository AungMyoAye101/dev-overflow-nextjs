import React from "react";

const RightSideBar = () => {
  return (
    <section className="hidden lg:block  h-screen sticky right-0 top-0 pt-20 pb-10 px-4 max-w-60  bg-light-gray dark:bg-dark-gray">
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
