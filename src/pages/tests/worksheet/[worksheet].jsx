import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function WorksheetTest({ _id }) {
  const router = useRouter();
  const [worksheet, setWorksheet] = useState(null);
  const [columns, setColumns] = useState(null);
  const [answerArray, setAnswerArray] = useState(null);
  const [currentColumns, setCurrentColumns] = useState(0);
  const [tab, setTab] = useState("Welcome");

  const fetchWorksheetment = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/test/worksheet?_id=${_id}`,
      }).then(({ data }) => {
        if (data.worksheetData.isComplete) {
          toast.warn("You Already Complete this Worksheetment");
          router.push("/");
        } else {
          setTimeout(() => {
            setWorksheet(data.worksheetData);
          }, 800);
          setAnswerArray(() =>
            Array(data.worksheetData.worksheetId.columns?.length).fill("")
          );
          setColumns(data.worksheetData.worksheetId.columns);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      if (error.response.data.error === "Worksheetment Not Found") {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    }
  };
  let a = 0;
  useEffect(() => {
    if (!_id) {
      toast.error("WorksheetmentId Not Found");
      router.push("/");
    }
    if (_id.length !== 24) {
      toast.error("WorksheetmentId is Invalid");
      router.push("/");
    } else {
      if (a === 0) {
        fetchWorksheetment();
        a = 1;
      }
    }
  }, [router]);

  if (!worksheet) {
    const demoarr = [1, 2, 3, 4];
    return (
      <section className="text-gray-800 body-font">
        <div className="container px-5 py-5 mx-auto flex justify-center items-center min-h-[66vh]">
          <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900 animate-pulse">
            <div className="p-4 flex flex-col justify-center items-center">
              <p className="text-center h-5 w-40 rounded-lg bg-gray-500 mb-2"></p>
              <h2 className="text-xl font-semibold text-center mb-3 h-8 w-80 rounded-lg bg-gray-500"></h2>
              {demoarr.map((i) => (
                <p
                  key={i}
                  className="text-center h-4 rounded-md w-full bg-gray-500 mb-1 md:px-10 "
                ></p>
              ))}
            </div>
            <div>
              <button className="px-5 h-12 w-40 bg-blue-600 py-3 text-white rounded-md"></button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  async function handleSubmit() {
    setTab("finish");
    try {
      const toastUpdate = toast.loading("Please wait...");
      axios({
        method: "put",
        url: `/api/test/worksheet`,
        data: {
          _id,
          answers: answerArray,
        },
      })
        .then(function ({ data }) {
          toast.update(toastUpdate, {
            render: data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        })
        .catch(function (error) {
          toast.update(toastUpdate, {
            render: error.response.data.error,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function nextColumn() {
    if (columns.length === currentColumns + 1) {
      handleSubmit();
    } else {
      setCurrentColumns(currentColumns + 1);
    }
  }

  return (
    <section className="text-gray-800 body-font">
      <div className="container px-5 py-5 mx-auto flex justify-center items-center min-h-[66vh]">
        {worksheet && tab === "Welcome" && StartWin()}
        {worksheet && tab === "worksheet" && MCQ()}
        {worksheet && tab === "finish" && EndScreen()}
      </div>
    </section>
  );

  function EndScreen() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4">
          <p className="text-center">{worksheet.name}</p>
          <h2 className="text-xl font-semibold text-center mb-3">
            {worksheet.worksheetId.title}
          </h2>
          <p className="text-center md:px-10">
            Data Added to the
            <span className="font-semibold">Worksheet</span>
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="px-5 mt-5 bg-blue-600 py-3 text-white rounded-md"
          >
            go to home
          </Link>
        </div>
      </div>
    );
  }

  function StartWin() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4">
          <p className="text-center">Welcome, {worksheet.name}</p>
          <h2 className="text-xl font-semibold text-center mb-3">
            {worksheet.worksheetId.title}
          </h2>
          <p className="text-center md:px-10">
            {worksheet.worksheetId.description}
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setTab("worksheet");
            }}
            className="px-5 bg-blue-600 py-3 text-white rounded-md"
          >
            Fill Worksheetment
          </button>
        </div>
      </div>
    );
  }

  function MCQ() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4 ">
          <p className="text-center ">
            {currentColumns + 1} of {columns.length}
          </p>
          <h2 className="text-xl font-semibold text-center">
            {columns[currentColumns].title}
          </h2>
          {columns[currentColumns].questions.map((i, index) => (
            <p>
              {index + 1}. {i}
            </p>
          ))}
        </div>
        <div className="w-full flex justify-center flex-wrap items-center gap-y-2">
          <textarea
            type="text"
            name="name"
            rows={5}
            id="name"
            value={answerArray[currentColumns]}
            onChange={(e) =>
              setAnswerArray((prevState) => {
                const updatedArray = [...prevState];
                updatedArray[currentColumns] = e.target.value;
                return updatedArray;
              })
            }
            class="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
            placeholder="Answer the question given above"
            required
          />
          <button
            onClick={() => {
              nextColumn();
            }}
            className="px-5 bg-blue-600 py-3 text-white rounded-md"
          >
            {columns.length === currentColumns + 1 ? "Submit" : "Next"}
          </button>

          {/* {options.map((i, index) => (
            <div
              onClick={() => {
                nextQuestion(index);
              }}
              className="w-80 h-16 bg-blue-300 rounded-lg border cursor-pointer hover:scale-105 transition border-blue-950 flex justify-start gap-x-5 items-center p-2"
            >
              <div className="h-6 w-6 bg-white rounded-md flex justify-center items-center border border-blue-950">
                <p className="text-blue-950 text-sm text-center font-semibold">
                  {alpha[index]}
                </p>
              </div>
              <div>
                <p className="text-blue-950">{i}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const _id = ctx.params.worksheet ? ctx.params.worksheet : null;
  return {
    props: {
      _id,
    },
  };
}
