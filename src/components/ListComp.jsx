import Image from "next/image";
import Link from "next/link";

export default function ListComp({ Name, imageLink, Category, Id, type }) {
  return (
    <div className="w-full max-w-sm h-fit rounded-lg shadow bg-blue-500 border border-blue-200">
      <Link href={`/course/${Id}`}>
        <div className="h-60 w-full p-3 ">
          <Image
            width={500}
            height={500}
            className="rounded-lg h-52"
            src={`https://dytu58v746btq.cloudfront.net/${imageLink}`}
            alt="product image"
            priority
          />
        </div>
      </Link>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-white">
            {Name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5 gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gray-100 text-black ">
            {Category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gray-100 text-black ">
            {type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/assess/${Id}`}
            className="text-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-white hover:bg-gray-100 "
          >
            View {type}
          </Link>
        </div>
      </div>
    </div>
  );
}
