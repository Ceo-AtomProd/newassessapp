import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function AssessTest({ _id }) {
  const router = useRouter();
  const [assess, setAssess] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [options, setOptions] = useState(null);
  const [range, setRange] = useState(null);
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tab, setTab] = useState("Welcome");
  const handleStatus = () => {
    let status = "";
    for (const { min, max, status: rangeStatus } of range) {
      const minScore = Number(min);
      const maxScore = Number(max);
      if (score >= minScore && score <= maxScore) {
        status = rangeStatus;
        break;
      }
    }
    return status;
  };
  const fetchAssessment = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/test/assess?_id=${_id}`,
      }).then(({ data }) => {
        if (data.assessData.isComplete) {
          toast.warn("You Already Complete this Assessment");
          router.push("/");
        } else {
          setTimeout(() => {
            setAssess(data.assessData);
          }, 800);
          setQuestions(data.assessData.assessId.questions);
          setOptions(data.assessData.assessId.options);
          setRange(data.assessData.assessId.range);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      if (error.response.data.error === "Assessment Not Found") {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    }
  };
  let a = 0;
  useEffect(() => {
    if (!_id) {
      toast.error("AssessmentId Not Found");
      router.push("/");
    }
    if (_id.length !== 24) {
      toast.error("AssessmentId is Invalid");
      router.push("/");
    } else {
      if (a === 0) {
        fetchAssessment();
        a = 1;
      }
    }
  }, [router]);

  if (!assess) {
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

  async function handleSubmit(updatedScore) {
    setTab("finish");
    try {
      const toastUpdate = toast.loading("Please wait...");
      const status = handleStatus();
      axios({
        method: "put",
        url: `/api/test/assess`,
        data: {
          _id,
          testresult: {
            score: updatedScore,
            status,
          },
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

  async function nextQuestion(i) {
    const updatedScore = score + i;
    setScore(updatedScore);
    if (questions.length === currentQuestion + 1) {
      const status = handleStatus();
      setStatus(status);
      handleSubmit(updatedScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <section className="text-gray-800 body-font">
      <div className="container px-5 py-5 mx-auto flex justify-center items-center min-h-[66vh]">
        {assess && tab === "Welcome" && StartWin()}
        {assess && tab === "assess" && MCQ()}
        {assess && tab === "finish" && EndScreen()}
      </div>
    </section>
  );

  function EndScreen() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4">
          <p className="text-center">{assess.name}</p>
          <h2 className="text-xl font-semibold text-center mb-3">
            {assess.assessId.title}
          </h2>
          <p className="text-center md:px-10">
            According to the test the status is{" "}
            <span className="font-semibold">{status}</span>
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="px-5 mt-5 bg-blue-600 py-3 text-white rounded-md"
          >
            Done Assessment
          </Link>
        </div>
      </div>
    );
  }

  function StartWin() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4">
          <p className="text-center">Welcome, {assess.name}</p>
          <h2 className="text-xl font-semibold text-center mb-3">
            {assess.assessId.title}
          </h2>
          <p className="text-center md:px-10">{assess.assessId.description}</p>
        </div>
        <div>
          <button
            onClick={() => {
              setTab("assess");
            }}
            className="px-5 bg-blue-600 py-3 text-white rounded-md"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  function MCQ() {
    return (
      <div className="md:w-1/2 w-full  bg-white rounded-lg flex flex-col p-5 justify-between items-center border border-blue-900">
        <div className="p-4">
          <p className="text-center">
            {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-semibold">
            {questions[currentQuestion]}
          </h2>
        </div>
        <div className="w-full flex justify-between flex-wrap gap-y-2">
          {options.map((i, index) => (
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
          ))}
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const _id = ctx.params.assess ? ctx.params.assess : null;
  return {
    props: {
      _id,
    },
  };
}
