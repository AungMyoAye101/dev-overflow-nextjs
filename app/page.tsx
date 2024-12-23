import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-4  custom-scrollbar pt-20 pb-10 px-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center w-full ">
        <h1 className="text-2xl md:text-4xl font-poppins font-semibold">
          All Questions
        </h1>
        <Button className="self-end">Ask a Question</Button>
      </div>
    </div>
  );
}
