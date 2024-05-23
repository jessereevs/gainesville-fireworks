export default function FreeShippingBanner() {
  return (
    <div>
        <div className="flex items-center gap-x-6 bg-red-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <p className="text-sm leading-6 text-white">
            <a href="/about">
              <strong className="font-semibold">FREE DELIVERY</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Free Delivery to Gainesville Area Residents
            </a>
          </p>
          <div className="flex flex-1 justify-end">
          </div>
        </div>
    </div>
  );
}
