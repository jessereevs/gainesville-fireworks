export default function FreeShippingBanner() {
  return (
      <div className="flex justify-center items-center gap-x-6 bg-red-600 px-6 py-2.5">
        <p className="text-sm leading-6 text-white text-center">
          <a href="/about">
            <strong className="font-semibold">
              FREE DELIVERY TO GAINESVILLE RESIDENTS
            </strong>
          </a>
        </p>
      </div>
  );
}
