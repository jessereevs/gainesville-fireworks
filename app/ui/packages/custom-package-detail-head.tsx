const timeline = [
  {
    name: "Create Package",
    description:
      "To begin creating your own custom package, select the fireworks you wish to include! Do this by selecting your fireworks and quantities using the quantity boxes below.",
    date: "Step 1",
    dateTime: "2024-01",
  },
  {
    name: "Submit Package",
    description:
      "Once you have finished creating your fireworks packages, enter your contact information and submit the package using the SUBMIT button below.",
    date: "Step 2",
    dateTime: "2024-02",
  },
  {
    name: "Wait for Approval",
    description:
      "After submission, a Gainesville Fireworks represenative will review your order and return to you with a total value pack price. This may take up to 48 hours.",
    date: "Step 3",
    dateTime: "2024-03",
  },
  {
    name: "Place Order",
    description:
      "If you wish to purchase your custom package at the approved price, follow the instructions provided in your follow-up email.",
    date: "Step 4",
    dateTime: "2024-04",
  },
];

export default function CustomPackDetailHead() {
  return (
    <div className="flex flex-col items-center mt-4 p-6">
      <h1 className="text-red-500 text-5xl font-bold text-center">
        Custom Package Creator
      </h1>
      <h3 className="mt-4 md:w-1/2 lg:w-1/3 text-center">
        The custom package creator allows you to design your own package and get
        the best deals on your fireworks this coming 4th of July!
      </h3>
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.name}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm font-semibold leading-6 text-red-600"
              >
                <svg
                  viewBox="0 0 4 4"
                  className="mr-4 h-1 w-1 flex-none"
                  aria-hidden="true"
                >
                  <circle cx={2} cy={2} r={2} fill="currentColor" />
                </svg>
                {item.date}
                <div
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  aria-hidden="true"
                />
              </time>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {item.name}
              </p>
              <p className="mt-1 text-base leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 font-semibold text-gray-700">If you have any questions regarding this process, please contact us and a Gainesville Fireworks represenative will be happy to assist!</p>
      </div>
    </div>
  );
}
