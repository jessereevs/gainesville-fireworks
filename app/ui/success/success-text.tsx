export default function SuccessText() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Thank you for your purchase!
        </h2>
        <p className="mt-8 text-xl leading-8 text-gray-600">
         A Gainesville Fireworks represenitive will reach out shortly using the email or phone number provided to schedule a time for pick-up or delivery. 
        </p>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          If you have any questions regarding your order, please <a className="text-red-500 italic" href="/about">contact us</a> and our team will be happy to assist you.
        </p>
        <p className="mt-4 text-md italic leading-8 text-gray-600">
        Our email may be marked as spam. Please check your spam folder before reaching out for questions. 
        </p>
      </div>
    </div>
  );
}
