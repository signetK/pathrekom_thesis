import React from 'react'
import { Link } from 'react-router-dom'
import ccislogo from '../assets/ccislogo.png'
import compass from '../assets/compass.png'
import rankIcon from '../assets/rankIcon.png'
import graduateIcon from '../assets/graduateIcon.png'

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto mt-1 mb-1 w-[90%] max-w-6xl overflow-hidden rounded-[32px] border border-gray-300 bg-[#f5f5f5] shadow-2xl">
        <div className="flex items-center justify-between bg-[#03045e] px-4 py-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <img src={ccislogo} alt="logo" className="h-9 w-9 object-contain" />
          </div>

          <h1 className="text-center text-2xl font-bold">
            Path<span className="text-[#f4a000]">Rekom</span>
          </h1>

          <div className="w-12" />
        </div>

        <div className="grid min-h-[620px] grid-cols-1 px-10 py-12 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-extrabold leading-tight text-[#0b1f7a] md:text-6xl">
              Welcome to
              <br />
              Path<span className="text-[#f4a000]">Rekom</span>
            </h1>

            <div className="mt-5 max-w-[520px] rounded-[18px] bg-[#d8ebf8] px-5 py-4 text-xl font-medium leading-relaxed text-[#1a237e]">
              Discover your future! PathRekom uses alumni career data and uses your academic performance to suggest personalized career paths. Start your Journey Now!
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                to="/grade-input"
                className="rounded-xl bg-[#f4a000] px-7 py-3 text-xl font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Start Recommendation
              </Link>

              <button>
                <Link to="/about" className="rounded-xl bg-[#03045e] px-7 py-3 text-xl font-semibold text-white shadow-md transition hover:opacity-90">
                  About Us
                </Link>
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-10 border-l border-gray-300 pl-10 lg:mt-0">
            <FeatureItem icon={compass} title="Data-Driven Navigation / Guide" />
            <FeatureItem icon={rankIcon} title="Ranked Career Discovery" />
            <FeatureItem icon={graduateIcon} title="Unlock Your Future Now" />
          </div>
        </div>

        <div className="px-8 pb-5 text-sm text-gray-400">© 2026 PathRekom</div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title }) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#d8ebf8]">
        <img src={icon} alt={title} className="h-12 w-12 object-contain" />
      </div>
      <h3 className="max-w-[280px] text-2xl font-bold leading-snug text-[#0b1f7a]">
        {title}
      </h3>
    </div>
  )
}