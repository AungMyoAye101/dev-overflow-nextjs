import HomePage from "@/components/HomePage";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-4  custom-scrollbar pt-20 pb-10 px-4">
      <div className="w-full h-96 bg-red-300"></div>
      <div className="w-full h-96 bg-green-300"></div>
      <div className="w-full h-96 bg-blue-300"></div>
      <div className="w-full h-96 bg-red-300"></div>
    </div>
  );
}
