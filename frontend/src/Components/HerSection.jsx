// components/HeroSection.jsx
export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row items-center bg-gradient-to-r from-yellow-100 to-white p-6 gap-6">
            <div className="bg-white p-6 rounded-lg shadow w-full md:w-1/2">
                <h2 className="text-xl font-semibold">Layaly Dalida</h2>
                <p className="mt-1 text-sm">May 22 to May 24 | 8:00pm</p>
                <p className="text-sm text-gray-500">Rawabet Art Space</p>
                <div className="mt-4 flex gap-4">
                    <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">Book Now</button>
                    <button className="text-blue-500 font-medium">More Info</button>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <img src="/assets/hero-image.png" alt="Layaly Dalida" className="rounded-lg shadow" />
            </div>
        </section>
    );
}
