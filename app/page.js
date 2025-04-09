"use client"
// import { Button } from "@/components/ui/button";
import Header from "./dashboard/_components/Header";
import { useRouter } from "next/navigation";




export default function Home() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/sign-in");
  };
  return (
    <div>
<Header/>
      {/* Hero Section */}
      <section className="text-center py-20 px-4 md:px-0 bg-[url('/grid-bg.svg')] bg-cover">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">New</span>
            <span>Next Hire</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Personal AI Interview Coach</h1>
          <p className="text-lg text-gray-600 mb-8">Double your chances of landing that job offer with our AI-powered interview prep</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition"  onClick={handleGetStarted}>
              Get Started →
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition">
              🎥 Watch video
            </button>
          </div>

          {/* Featured Logos */}
          <div className="flex flex-col items-center mt-10 text-gray-500">
            {/* Heading */}
            <h2 className="text-sm font-semibold text-gray-500 mb-4">FEATURED IN</h2>

            {/* Logos Row */}
            <div className="flex justify-center gap-10 flex-wrap mt-3">
              <div className="flex items-center space-x-2">
                <img src="/youtube.svg" alt="YouTube" className="w-10 h-10 text-green-500" />
                <span>YouTube</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/google.svg" alt="Google" className="w-10 h-10 text-green-500" />
                <span>Google</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/reddit.svg" alt="Reddit" className="w-10 h-10 text-green-500" />
                <span>Reddit</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/loom.svg" alt="Reddit" className="w-10 h-10 text-green-500" />
                <span>Loom</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/docker.svg" alt="Reddit" className="w-10 h-10 text-green-500" />
                <span>Docker</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
