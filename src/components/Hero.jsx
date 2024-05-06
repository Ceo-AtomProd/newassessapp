import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-20  md:flex-row flex-col items-center justify-between">
          <div class=" md:w-1/2 w-5/6  md:order-2 mb-5 md:mb-0">
            <img
              class="object-cover object-center rounded-lg"
              alt="hero"
              src="/hero-main.jpg"
            />
          </div>
          <div class=" md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font text-4xl md:text-5xl xl:text-6xl mb-4 text-gray-900 font-bold">
              Now AI automate all your analysis of {" "} <br />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "sessions",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "risk assess",
                  1000,
                  "patient profile",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                className="text-blue-600"
                repeat={Infinity}
              />
            </h1>
            <p class="mb-8 leading-relaxed font-semibold md:text-xl text-sm">
              Get detail report of session and build next session framework of
              therapy programs in just 5 minutes
              <br />
              <span className="font-bold">Never store any data of user.</span>
            </p>
            <div class="flex justify-center">
              <Link
                href="#Try"
                class="inline-flex text-white bg-blue-500 border-0 py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-lg"
              >
                Try For Free
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="Try" class="text-gray-600 body-font py-20 flex justify-center items-center ">
         <div className="bg-gray-100 w-full md:w-2/3 p-10 rounded-lg">
        <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center ">
      
          <div class=" md:w-1/2 w-5/6 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
          <Link href={"/"}>
            <img
              class="object-cover object-center rounded"
              alt="itemn"
              src="/home-1.png"
            />
             </Link>
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <span className="text-blue-500">Build blue print </span>
              of session in just seconds
            </h1>
            <p class="mb-8 leading-relaxed">
              Get therapy session framework of techniques to use, goals to
              assign, and risk assessment by analyzing the previous session
              progress and talk
            </p>
            
          </div>
         
        </div>

        <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
          <div class=" md:w-1/2  w-5/6 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
            <img
              class="object-cover object-center rounded"
              alt="itemn"
              src="/home-3.png"
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <span className="text-blue-500">100+ Diagnosis </span>
              of Mental illness and disorders
            </h1>
            <p class="mb-8 leading-relaxed">
              Share inbuild or customize the assessment for patient and analyze
              result with AI to get detail insights which help to plan the
              problem solving session.
            </p>
          </div>
        </div>
        <div class="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
          <div class=" md:w-1/2  w-5/6 mb-10 md:mb-0 p-5 bg-gray-300 rounded-lg">
            <img
              class="object-cover object-center rounded"
              alt="itemn"
              src="/home-2.png"
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              <span className="text-blue-500">Assign Goal </span>
              to patient and measure live progress
            </h1>
            <p class="mb-8 leading-relaxed">
              Get access to bunch of therapy guide, worksheet that help to
              learn, practice share with patient on platfrom with easy to fill
              UI.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section id="About" class="text-gray-600 body-font ">
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">
                    Phoebe Caulfield
                  </h2>
                  <div class="w-12 h-1 bg-blue-500 rounded mt-2 mb-4"></div>
                  <p class="text-base">
                    Raclette knausgaard hella meggs normcore williamsburg enamel
                    pin sartorial venmo tbh hot chicken gentrify portland.
                  </p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">
                  Meggings portland fingerstache lyft, post-ironic fixie man bun
                  banh mi umami everyday carry hexagon locavore direct trade art
                  party. Locavore small batch listicle gastropub farm-to-table
                  lumbersexual salvia messenger bag. Coloring book flannel
                  truffaut craft beer drinking vinegar sartorial, disrupt
                  fashion axe normcore meh butcher. Portland 90's scenester
                  vexillologist forage post-ironic asymmetrical, chartreuse
                  disrupt butcher paleo intelligentsia pabst before they sold
                  out four loko. 3 wolf moon brooklyn.
                </p>
                <a class="text-blue-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font bg-blue-300">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div class="text-center lg:w-1/2 md:w-2/3 w-full">
            <h1 class="title-font mb-4  text-gray-900 text-3xl md:text-5xl font-bold">
              Al-Powered Assistant for your team
            </h1>
            <p class="mb-8 leading-relaxed">
              Elevate the efficiency of your organization with our Al-enhanced
              tools. Streamline session documentation, take more clients,
              enhance supervision and access insightful analytics to focus more
              on client care and less on paperwork.
            </p>
            <div class="flex justify-center">
              <button class="inline-flex text-blue-300 font-semibold bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded text-lg">
                Under Development
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
