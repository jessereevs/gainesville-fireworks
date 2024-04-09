import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What are firework packages?",
    answer:
      "Firework packages are the best way to get the most BANG for you buck! Firework packages are collections of individual fireworks, offered at various price points, that allow you to host your own private fireworks show without the work of selecting each firework individually.",
  },
  {
	question: "Can I add to the firework packages?",
	answer: 
	  "YES! We have a wide variety of individual fireworks for purchase. Any combination of packages can be purchases alongside any combination of individual fireworks."
  },
  {
	question: "Who is Gainesville Fireworks?",
	answer: 
	  "Gainesville Fireworks is a locally owned fireworks retailer, owned and operated by Robert Lastname and Pearse Hayes. Robert Lastname is a retired US Army veteren born and raised in Gainesville, Florida. To learn about Robert's story, view our about page for more!"
  }
]

export default function Example() {
  return (
    <div className="bg-slate-900 my-20">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Frequently Asked Questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
