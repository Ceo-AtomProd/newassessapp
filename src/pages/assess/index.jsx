import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import ListComp from "@/components/ListComp";

export const getServerSideProps = async ({ query }) => {
  const curruntPage = Number(query.page) || 1;
  return { props: { curruntPage } };
};

export default function Asess({ curruntPage }) {
  
  const [page, setPage] = useState(curruntPage);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const router = useRouter();

  const categoryOptions = [
    "Mental health",
    "Disorder",
    "Child",
    "Personality",
    "Sleep",
    "PTSD",
    "Relationship",
    "Addiction",
  ];
  const handleCheckboxChange = (value) => {
    if (filter === value) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  const loadData = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/public/assess?page=${page}&search=${search}&filter=${filter}&type=all`,
      }).then(function ({ data }) {
        setData(data.allAssess);
        setTotalPage(data.totalPages);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [curruntPage, page, search, filter]);

  const NotFound = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl font-bold mb-4 text-black">
            Assessments Not Found
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            We couldn't find the assess .
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  };

  const SkeletonCourse = () => {
    const array = [1, 2, 3];

    return array.map((i) => (
      <div
        key={i}
        className="w-full max-w-sm h-fit rounded-lg shadow bg-blue-600 border border-gray-800 animate-pulse"
      >
        <div className="h-56 w-full p-3 mb-6">
          <div className="rounded-lg h-full bg-gray-50"></div>
        </div>
        <div className="px-3 pb-5">
          <div className=" h-6 rounded-lg w-40 bg-gray-50"></div>
          <div className="flex items-center mt-2.5 mb-5">
            <span className=" h-4 w-20 px-2.5 py-0.5 rounded bg-blue-200 "></span>
          </div>
          <div className="flex items-center  justify-between">
            <span className="text-3xl font-bol rounded-lg bg-white h-10 w-32"></span>
            <div className="rounded-lg px-5 py-2.5  bg-white hover:bg-gray-100 h-10 w-28"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="text-gray-400  body-font">
      <form className="py-5 px-2 md:px-40">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm border  rounded-lg     placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Assessments ..."
            required
          />
          <div className="text-white absolute right-2.5 bottom-[0.55rem]  rounded-lg text-sm">
            <button
              id="filterDropdownButton"
              onClick={() => setFilterModal(!filterModal)}
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200    0  "
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
              <svg
                className="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            <div
              id="filterDropdown1"
              className={`z-10 ${
                !filterModal && "hidden"
              } border absolute min-w-fit p-3 bg-white rounded-lg shadow `}
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                Category
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="filterDropdownButton"
              >
                {categoryOptions.map((i) => (
                  <li className="flex items-center">
                    <input
                      id={i}
                      type="checkbox"
                      value={i}
                      checked={filter === i}
                      onChange={() => handleCheckboxChange(i)}
                      className="w-4 h-4 border rounded focus:ring-3 outline-blue-500 bg-blue-700 border-blue-600 focus:ring-blue-600 focus:ring-offset-blue-800"
                    />
                    <label
                      htmlFor={i}
                      className="ml-2 text-sm font-medium text-gray-900 "
                    >
                      {i}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
      <div className="container px-5 py-10 mx-auto flex flex-wrap gap-5 justify-center min-h-[50vh]">
        {data &&
          data.length !== 0 &&
          data?.map((item) => (
            <ListComp
              key={item._id}
              {...{
                Name: item.title,
                imageLink: item.image,
                type: "Asessment",
                Category: item.category,
                Id: item._id,
              }}
            />
          ))}
        {!data && <SkeletonCourse />}
        {data && data?.length === 0 && <NotFound />}
      </div>

      {totalPage !== 0 && (
        <div className="flex justify-center py-10">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <Link
                href={
                  curruntPage !== 1 ? `/assess?page=${curruntPage - 1}` : ""
                }
                className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight  border  rounded-l-lg   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </Link>
            </li>
            {curruntPage === 1 || curruntPage - 2 === 0 ? (
              ""
            ) : (
              <li>
                <Link
                  href={
                    curruntPage !== 1 ? `/assess?page=${curruntPage - 2}` : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  {curruntPage - 2}
                </Link>
              </li>
            )}
            {curruntPage === 1 ? (
              ""
            ) : (
              <li>
                <Link
                  href={
                    curruntPage !== 1 ? `/assess?page=${curruntPage - 1}` : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  {curruntPage - 1}
                </Link>
              </li>
            )}
            {/* active */}
            <li>
              <Link
                href={`/assess?page=${curruntPage}`}
                aria-current="page"
                className="cursor-pointer z-10 flex items-center justify-center px-3 h-8 leading-tight border hover:bg-blue-700 hover:text-blue-100 border-gray-700 bg-blue-600 text-white"
              >
                {curruntPage}
              </Link>
            </li>

            {curruntPage === totalPage ? (
              ""
            ) : (
              <li>
                <Link
                  href={
                    curruntPage !== totalPage
                      ? `/assess?page=${curruntPage + 1}`
                      : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  {curruntPage + 1}
                </Link>
              </li>
            )}
            {curruntPage === totalPage || curruntPage + 1 === totalPage ? (
              ""
            ) : (
              <li>
                <Link
                  href={
                    curruntPage !== totalPage
                      ? `/assess?page=${curruntPage + 2}`
                      : ""
                  }
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight   border   bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  {curruntPage + 2}
                </Link>
              </li>
            )}
            <li>
              <Link
                href={
                  curruntPage !== totalPage
                    ? `/assess?page=${curruntPage + 1}`
                    : ""
                }
                className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight  border  rounded-r-lg   bg-gray-100 border-gray-400 text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
