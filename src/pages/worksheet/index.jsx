import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Worksheet({ curruntPage }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(curruntPage);
  const [totalPage, setTotalPage] = useState(null);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const categoryOptions = [
    "Addiction",
    "Anger",
    "Anxiety",
    "Bipolar disorder",
    "Body dysmorphia (BDD)",
    "Depression",
    "Dissociation",
    "Eating disorders",
    "OCD",
    "PTSD",
    "Self-esteem & self-criticism",
    "Sleep & insomnia",
    "Social anxiety",
    "Stress",
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
        url: `/api/public/worksheet?page=${page}&search=${search}&filter=${filter}&type=all`,
      }).then(function ({ data }) {
        setTimeout(() => {
          setData(data.allWorksheet);
        }, 800);
        setTotalPage(data.totalPages);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [curruntPage, page, search, filter]);

  console.log(data);

  const arr = [1, 2, 3, 4];

  return (
    <section className="text-gray-400 body-font flex flex-col md:flex-row">
      <aside class="top-16 hidden z-0 md:flex left-0 fixed w-72 min-h-[65vh] transition-transform -translate-x-full sm:translate-x-0">
        <div class="rounded-r-lg py-5 px-3 gap-3 h-full flex flex-col bg-white border-r border-gray-200">
          <div className="w-full h-full">
            <form class="max-w-md mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  class="block w-full p-4 ps-10 border-none outline-blue-500 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Worksheet"
                  required
                />
              </div>
            </form>
            <div
              className={`border min-w-fit p-3 mt-2 bg-white rounded-lg shadow `}
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
      </aside>

      <div className="container px-5 py-5 mx-auto md:ml-72">
        <form className="py-5 px-2 md:px-40 block md:hidden ">
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
              className="block w-full p-4 pl-10 text-sm border  rounded-lg outline-none placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              placeholder="Worksheets ..."
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
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Worksheets
            </h1>
            <div className="h-1 w-20 bg-blue-500 rounded"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {data && data.length === 0 && (
            <div className=" w-full flex  items-center h-[50vh] flex-col gap-2">
              {" "}
              <p className="text-2xl md:text-3xl text-gray-800 font-bold">
                {" "}
                Worksheets Not Found
              </p>
              <p className=""> We couldn't find the Worksheet .....</p>
            </div>
          )}

          {data?.map((i) => (
            <div className="xl:w-1/4 md:w-1/2 p-4" key={i._id}>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-400">
                <img
                  className="h-40 rounded border border-gray-500 w-full object-cover object-center mb-6"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${i.image}`}
                  alt="content"
                />
                <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
                  {i.category}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {i.title}
                </h2>
                <Link
                  href={`/worksheet/${i._id}`}
                  className="text-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 "
                >
                  View Worksheet
                </Link>
              </div>
            </div>
          ))}
          {!data &&
            arr.map((i) => (
              <div className="xl:w-1/4 w-full md:w-1/2 p-4" key={i}>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-400">
                  <div className="h-40 w-full bg-gray-500 animate-pulse"></div>
                  <h3 className="tracking-widest h-4 w-1/3 mt-2 rounded-lg bg-blue-500  text-xs font-medium title-font animate-pulse"></h3>
                  <h2 className="text-lg h-8 w-full mt-2 rounded-lg bg-gray-500 font-medium title-font mb-4 animate-pulse"></h2>
                  <div className="text-blue-100 h-8 w-1/2 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 animate-pulse"></div>
                </div>
              </div>
            ))}
        </div>
        <div>
          {totalPage !== 0 && (
            <div className="flex justify-center py-10">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <Link
                    href={
                      curruntPage !== 1
                        ? `/worksheet?page=${curruntPage - 1}`
                        : ""
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
                        curruntPage !== 1
                          ? `/worksheet?page=${curruntPage - 2}`
                          : ""
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
                        curruntPage !== 1
                          ? `/worksheet?page=${curruntPage - 1}`
                          : ""
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
                    href={`/worksheet?page=${curruntPage}`}
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
                          ? `/worksheet?page=${curruntPage + 1}`
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
                          ? `/worksheet?page=${curruntPage + 2}`
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
                        ? `/worksheet?page=${curruntPage + 1}`
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
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ query }) => {
  const curruntPage = query.page ? Number(query.page) : 1;
  return { props: { curruntPage } };
};
