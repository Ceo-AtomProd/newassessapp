import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 z-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            /> */}
            <span className="self-center text-2xl font-bold text-blue-600 whitespace-nowrap">
              {process.env.NEXT_PUBLIC_SITENAME}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/asess" className="hover:underline me-4 md:me-6">
                Assessments
              </Link>
            </li>
            <li>
              <Link href="/worksheet" className="hover:underline me-4 md:me-6">
                Worksheets
              </Link>
            </li>
            <li>
              <Link href="/worksheet" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()} {""}
          <a href="/" className="hover:underline">
            {process.env.NEXT_PUBLIC_SITENAME}
          </a>
          . All Rights Reserved, {""}
          Developed by{" "}
          <a href="https://www.atomprod.in" className="hover:underline">
            Atomprod.
          </a>
        </span>
      </div>
    </footer>
  );
}
