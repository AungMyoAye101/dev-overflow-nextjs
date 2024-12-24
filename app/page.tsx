import LeftSideBar from "@/components/LeftSideBar";
import LocalSearchBox from "@/components/LocalSearchBox";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-10   custom-scrollbar pt-28 pb-10 px-4 md:px-10 bg-light-gray dark:bg-black border-2 ">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center w-full ">
        <h1 className="text-2xl md:text-4xl font-poppins font-semibold">
          All Questions
        </h1>
        <Button className="self-end btn-bg font-poppins  font-semibold">
          Ask a Question
        </Button>
      </div>
      <div>
        <LocalSearchBox />
      </div>
    </div>
  );
}
