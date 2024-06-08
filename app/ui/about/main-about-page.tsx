import {
  BanknotesIcon,
  TruckIcon,
  FaceSmileIcon,
} from "@heroicons/react/20/solid";

export default function AboutSection() {
  return (
    <div className="relative isolate overflow-hidden bg-white sm:py-32">
      <div
        className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse lg:justify-end md:gap-24">
          <div className="my-6 max-w-2xl lg:mx-0 text-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <div className="flex gap-3 mt-3 pl-1 justify-center">
              <h3 className="font-bold text-lg">Phone</h3>
              <p className="text-xl"><a href="tel:+13522310067">(352) 231-0067</a></p>
            </div>
            <div className="flex gap-3 mt-3 pl-1 justify-center">
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-xl text-red-600"><a href="mailto:gainesvillefireworks@gmail.com">gainesvillefireworks@gmail.com</a></p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-lg font-semibold leading-8 tracking-tight text-red-600">
              Gainesville Fireworks
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About Us
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              Gainesville Fireworks was started many years ago by a disabled
              veteran to help supplement his income. For years, he
              operated a fireworks tent located on University Ave.
              Unfortunately, his wife passed away unexpectedly in 2014,
              leaving him without anyone to help run the tent. That’s when my
              family stepped in to assist him, as he was no longer able to
              manage it on his own. We successfully ran the fireworks tent for
              several years until COVID-19 hit in 2020. At that time, we had to
              readjust our business model. With many loyal clients, we thought,
              why not bring the fireworks to them? So, we started delivering
              fireworks directly to our clients homes or businesses. If everyone
              else delivers products directly to you, why not fireworks as well?
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <svg
              className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/5 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0.5 0V200M200 0.5L0 0.499983" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
              />
            </svg>
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
            <p className="font-bold text-xl">
              We aim to make our clients busy lives easier by bringing their
              fireworks to them!
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-gray-600">
              <li className="flex gap-x-3">
                <BanknotesIcon
                  className="mt-1 h-5 w-5 flex-none text-red-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Competative Pricing
                  </strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <TruckIcon
                  className="mt-1 h-5 w-5 flex-none text-red-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Direct Shipping
                  </strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <FaceSmileIcon
                  className="mt-1 h-5 w-5 flex-none text-red-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">
                    Customer Satisfaction
                  </strong>{" "}
                </span>
              </li>
            </ul>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              Gainesville Fireworks is the only locally owned fireworks dealer
              in the area. All other fireworks tents come from out of town,
              taking their profits with them when they leave. Buy locally and
              support local people!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
