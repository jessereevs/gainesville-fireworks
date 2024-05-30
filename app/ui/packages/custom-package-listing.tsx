import Image from "next/image"

export default function CustomPackageListing() {
    return(
          <div className="flex justify-center">
              <a className="group">
                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/package/package-100-total.jpg"
                    alt="Image of the firework package."
                    height={600}
                    width={600}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <div className="flex gap-2">
                    <h3>Custom Package</h3>
                    <h4 className=" text-red-600 italic">(Click Here for Details)</h4>
                  </div>
                  <p>Custom Pricing</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                    Design a custom package to get the most out of your firework show!
                </p>
              </a>
          </div>
    )
}