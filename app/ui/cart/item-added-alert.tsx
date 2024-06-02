import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Alert() {
  return (
    <div className="rounded-lg bg-green-200 p-4 border border-green-300">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex">
          <h3 className="text-sm font-medium text-green-800">Added to Cart</h3>
          <div className="ml-12">
            <div className="-mx-2 -my-1.5 flex">
              <a href="/cart">
                <button
                  type="button"
                  className="rounded-md bg-green-200 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  View Cart
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
