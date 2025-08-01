import LineChart from "../Components/UI/LineChart";
import { Link } from "react-router-dom";
import { CardOne } from "../Components/UI/Card";
import {Product} from "@/Mock/mock"
export default function Home() {
  return (
    <div className="grid grid-cols-3 mt-[87px] grid-rows-3 gap-2 w-full h-full">
      <div className="flex items-center justify-center col-span-2 gap-2">
        <div className="flex-1 rounded rounded-md flex flex-col justify-between h-full relative bg-primary-me text-white w-full p-2">
          <h4 className="text-4xl font-bold">Stok Barang</h4>
          <p className="absolute right-4 top-7">
            <svg
              width="80"
              height="80"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.34375 2.10938H6.79687C6.92632 2.10938 7.03125 2.21431 7.03125 2.34375V6.79688C7.03125 6.92633 6.92632 7.03125 6.79687 7.03125H2.34375C2.2143 7.03125 2.10938 6.92633 2.10938 6.79688V2.34375C2.10938 2.21431 2.2143 2.10938 2.34375 2.10938ZM10.6101 1.73829L13.2617 4.38995C13.3532 4.48147 13.3532 4.62986 13.2617 4.7214L10.6101 7.37305C10.5185 7.46457 10.3701 7.46457 10.2786 7.37305L7.62696 4.72139C7.53543 4.62986 7.53543 4.48147 7.62696 4.38994L10.2786 1.73829C10.3701 1.64677 10.5185 1.64677 10.6101 1.73829ZM2.34375 7.96875H6.79687C6.92632 7.96875 7.03125 8.07368 7.03125 8.20313V12.6563C7.03125 12.7857 6.92632 12.8906 6.79687 12.8906H2.34375C2.2143 12.8906 2.10938 12.7857 2.10938 12.6563V8.20313C2.10938 8.07368 2.2143 7.96875 2.34375 7.96875ZM8.20312 7.96875H12.6562C12.7857 7.96875 12.8906 8.07368 12.8906 8.20313V12.6563C12.8906 12.7857 12.7857 12.8906 12.6562 12.8906H8.20312C8.07368 12.8906 7.96875 12.7857 7.96875 12.6563V8.20313C7.96875 8.07368 8.07368 7.96875 8.20312 7.96875Z"
                fill="white"
              />
            </svg>
          </p>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold font-poppins text-6xl">1203</h3>
            <p className="flex text-gray-300 font-semibold items-center gap-4">
              <span className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85449 1L0.854492 4M3.85449 1L6.85449 4M3.85449 1V6.25M3.85449 9V7.75"
                    stroke=" #1AB54E"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#1AB54E]">8,9%</span>
              </span>
              Last the week
            </p>
          </div>
        </div>

        <div className="flex-1 rounded rounded-md flex flex-col justify-between h-full relative bg-primary-me text-white w-full p-2">
          <h4 className="text-4xl font-bold">Total Month</h4>
          <p className="text-[80px] font-bold absolute right-4 top-4">$</p>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold font-poppins text-6xl">1203</h3>
            <p className="flex text-gray-300 font-semibold items-center gap-4">
              <span className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85449 1L0.854492 4M3.85449 1L6.85449 4M3.85449 1V6.25M3.85449 9V7.75"
                    stroke=" #1AB54E"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#1AB54E]">8,9%</span>
              </span>
              Last the week
            </p>
          </div>
        </div>

        <div className="flex-1 rounded rounded-md flex flex-col justify-between h-full relative bg-primary-me text-white w-full p-2">
          <h4 className="text-4xl font-bold">Revenue</h4>
          <p className="absolute right-4 top-7">
            <svg
              width="80"
              height="80"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.34375 2.10938H6.79687C6.92632 2.10938 7.03125 2.21431 7.03125 2.34375V6.79688C7.03125 6.92633 6.92632 7.03125 6.79687 7.03125H2.34375C2.2143 7.03125 2.10938 6.92633 2.10938 6.79688V2.34375C2.10938 2.21431 2.2143 2.10938 2.34375 2.10938ZM10.6101 1.73829L13.2617 4.38995C13.3532 4.48147 13.3532 4.62986 13.2617 4.7214L10.6101 7.37305C10.5185 7.46457 10.3701 7.46457 10.2786 7.37305L7.62696 4.72139C7.53543 4.62986 7.53543 4.48147 7.62696 4.38994L10.2786 1.73829C10.3701 1.64677 10.5185 1.64677 10.6101 1.73829ZM2.34375 7.96875H6.79687C6.92632 7.96875 7.03125 8.07368 7.03125 8.20313V12.6563C7.03125 12.7857 6.92632 12.8906 6.79687 12.8906H2.34375C2.2143 12.8906 2.10938 12.7857 2.10938 12.6563V8.20313C2.10938 8.07368 2.2143 7.96875 2.34375 7.96875ZM8.20312 7.96875H12.6562C12.7857 7.96875 12.8906 8.07368 12.8906 8.20313V12.6563C12.8906 12.7857 12.7857 12.8906 12.6562 12.8906H8.20312C8.07368 12.8906 7.96875 12.7857 7.96875 12.6563V8.20313C7.96875 8.07368 8.07368 7.96875 8.20312 7.96875Z"
                fill="white"
              />
            </svg>
          </p>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold font-poppins text-6xl">1203</h3>
            <p className="flex text-gray-300 font-semibold items-center gap-4">
              <span className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85449 1L0.854492 4M3.85449 1L6.85449 4M3.85449 1V6.25M3.85449 9V7.75"
                    stroke=" #1AB54E"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-[#1AB54E]">8,9%</span>
              </span>
              Last the week
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-gray-300 row-span-2 col-start-1 row-start-2">
        3
      </div>
      <div className="row-span-3 gap-2 flex flex-col col-start-3 row-start-1">
        <Link className="flex text-white gap-4 justify-center hover:bg-primary-me-hover font-bold items-center py-2 px-4 bg-primary-me rounded rounded-md">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 4.21875C12.42 4.21875 4.21875 12.42 4.21875 22.5C4.21875 32.58 12.42 40.7812 22.5 40.7812C32.58 40.7812 40.7812 32.58 40.7812 22.5C40.7812 12.42 32.58 4.21875 22.5 4.21875ZM22.5 7.03125C31.0598 7.03125 37.9688 13.9402 37.9688 22.5C37.9688 31.0598 31.0598 37.9688 22.5 37.9688C13.9402 37.9688 7.03125 31.0598 7.03125 22.5C7.03125 13.9402 13.9402 7.03125 22.5 7.03125ZM21.0938 14.0625V21.0938H14.0625V23.9062H21.0938V30.9375H23.9062V23.9062H30.9375V21.0938H23.9062V14.0625H21.0938Z"
              fill="white"
            />
          </svg>

          <span className="text-3xl">Tambah Orderan</span>
        </Link>
        <div className="flex gap-2 items-center justify-center w-full flex-col">
          <h2 className="font-semibold text-xl">Popular Order</h2>
          <div className="overflow-y-auto gap-2 flex flex-col w-full max-h-[900px]">
            {Product.map((item, id) => (
              <CardOne id={id}
              url={item.url}
              image={item.image}
              name={item.name}
              sisaBarang={item.sisaBarang}
              sold={item.sold}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
