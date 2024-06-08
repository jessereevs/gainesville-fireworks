export default function CustomPackageListing() {
  return (
    <div className="flex justify-center mt-16">
      <a href="/packages/custom" className="border-red-800 bg-red-600 border-2 rounded-lg p-4 hover:bg-red-700">
        <div className="flex items-center justify-center text-base font-medium text-white">
          <h3 className="text-4xl text-center">Create a Custom Value Pack</h3>
        </div>
        <p className="mt-1 text-sm italic text-white text-center">
          Design a custom package to get the most out of your firework show!
        </p>
      </a>
    </div>
  );
}
