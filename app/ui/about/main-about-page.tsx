import { BanknotesIcon, TruckIcon, FaceSmileIcon,} from '@heroicons/react/20/solid'

export default function AboutSection() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div
        className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-lg font-semibold leading-8 tracking-tight text-red-600">Gainesville Fireworks</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
          <p className="mt-6 text-xl leading-8 text-gray-700">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
            aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
            egestas fringilla sapien.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <svg
              className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
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
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" />
            </svg>
            <figure className="border-l border-red-600 pl-8">
              <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                <p>
                  “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh ullamcorper ac
                  dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
                  tristique.”
                </p>
              </blockquote>
              <figcaption className="mt-8 flex gap-x-4">
                <div className="text-sm leading-6">
                  <div className="font-semibold text-gray-900">Brenna Goyette</div>
                  <div className="text-gray-600">@brenna</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
              vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
              erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper
              sed amet vitae sed turpis id.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <BanknotesIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-gray-900">Competative Pricing.</strong> Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                  blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <TruckIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-gray-900">Shipping.</strong> Anim aute id magna aliqua
                  ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <FaceSmileIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-gray-900">Customer Satisfaction.</strong> Ac tincidunt sapien
                  vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
              fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
              adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
