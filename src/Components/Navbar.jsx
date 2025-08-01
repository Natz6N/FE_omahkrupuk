export default function Navbar() {
  return (
    <div className="flex top-0 left-0 py-4 px-4 items-center justify-between w-full bg-white h-fit fixed">
      <div className="flex items-center h-[40px]">
        <img src="Logo.svg" alt="" className="w-full h-full" />
      </div>
      <div className="cursor-pointer flex items-center relative justify-center">
        <div className="w-[70px] h-[70px] p-1 mx-auto relative rounded-full ring-2 ring-offset-2 ring-offset-transparent ring-primary-me">
          <img
            src="mockuser.jpg"
            alt=""
            className=" w-full h-full object-cover rounded rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
