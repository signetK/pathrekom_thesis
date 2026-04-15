import React from 'react'
import { Link } from 'react-router-dom'
import ccislogo from '../assets/ccislogo.png'

const categoryData = [
  { rank: 1, job: 'Software Development', match: '92%' },
  { rank: 2, job: 'IT / Systems / Support', match: '89%' },
  { rank: 3, job: 'Management / Leadership / Program Roles', match: '75%' },
  { rank: 4, job: 'Business / Sales / Marketing', match: '64%' },
  { rank: 5, job: 'Administrative / Office', match: '53%' },
  { rank: 6, job: 'Technical / Engineering / Operations', match: '51%' },
  { rank: 7, job: 'Government / Community / Others', match: '50%' },
  { rank: 8, job: 'Data / Analytics', match: '48%' },
  { rank: 9, job: 'Education / Academe', match: '46%' },
  { rank: 10, job: 'Web / UI/UX / Design', match: '44%' },
]

const specificJobs = [
  { rank: 1, job: 'IT / Systems / Support - Senior ICT Assistant', match: '92%' },
  { rank: 2, job: 'Management - Assistant, ERC', match: '89%' },
  { rank: 3, job: 'Administrative - Inventory Staff', match: '75%' },
  { rank: 4, job: 'Business - E-commerce Associate', match: '64%' },
  { rank: 5, job: 'Business - Tiktok Affiliate Marketer', match: '53%' },
  { rank: 6, job: 'Software Dev - SAP BW Associate / Data Engineer', match: '51%' },
  { rank: 7, job: 'Software Dev - Automation Engineer III', match: '50%' },
  { rank: 8, job: 'Software Dev - Programmer', match: '48%' },
  { rank: 9, job: 'Software Dev - Blockchain Developer', match: '46%' },
  { rank: 10, job: 'Education - Professor', match: '44%' },
]

export default function Result() {

  const formatJob = (job) => {
    const parts = job.split(/ - (.+)/)
    if (parts.length < 2) return job

    return (
      <>
        {parts[0]}
        {' - '}
        <span className="font-bold">{parts[1]}</span>
      </>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-r from-blue-900 to-blue-500">
      <div className="mx-auto w-[90%] max-w-6xl overflow-hidden rounded-[28px] bg-[#f5f5f5] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between bg-[#03045e] px-4 py-3 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <img src={ccislogo} alt="logo" className="h-9 w-9 object-contain" />
          </div>

          <h1 className="text-2xl font-bold">
            Path<span className="text-[#f4a000]">Rekom</span>
          </h1>

          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="px-8 py-10">
          <div className="grid gap-8 md:grid-cols-2 items-stretch">

            {/* LEFT TABLE */}
            <div className="flex flex-col h-full">
              <h2 className="mb-4 text-center text-xl font-bold">
                Top 10 Recommended Job Categories
              </h2>

              <div className="overflow-hidden rounded-lg border flex-1 flex flex-col">
                
                {/* Header Row */}
                <div className="grid grid-cols-[60px_1fr_115px] bg-[#03045e] px-4 py-3 text-white font-bold">
                  <div className="text-left">Rank</div>
                  <div className="text-left">Job Category</div>
                  <div className="text-right">Relative Match</div>
                </div>

                {/* Data Rows */}
                <div className="flex-1">
                  {categoryData.map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-[60px_minmax(0,1fr)_100px] px-4 py-2 ${
                        index === 0
                          ? 'bg-[#f4a000] text-white font-semibold'
                          : index % 2 === 0
                          ? 'bg-[#e9e9e9]'
                          : 'bg-[#f6f6f6]'
                      }`}
                    >
                      <div className="text-left font-bold">{item.rank}</div>
                      <div className="text-left">{item.job}</div>
                      <div className="text-right">{item.match}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT TABLE */}
            <div className="flex flex-col h-full">
              <h2 className="mb-4 text-center text-xl font-bold">
                Top 10 Specific Job Matches
              </h2>

              <div className="overflow-hidden rounded-lg border flex-1 flex flex-col">
                
                {/* Header Row */}
                <div className="grid grid-cols-[60px_1fr_115px] bg-[#03045e] px-4 py-3 text-white font-bold">
                  <div className="text-left">Rank</div>
                  <div className="text-left">Specific Job</div>
                  <div className="text-right">Relative Match</div>
                </div>

                {/* Data Rows */}
                <div className="flex-1">
                  {specificJobs.map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-[60px_minmax(0,1fr)_100px] px-4 py-2 ${
                        index === 0
                          ? 'bg-[#f4a000] text-white font-semibold'
                          : index % 2 === 0
                          ? 'bg-[#e9e9e9]'
                          : 'bg-[#f6f6f6]'
                      }`}
                    >
                      <div className="text-left font-bold">{item.rank}</div>
                      <div className="text-left">{formatJob(item.job)}</div>
                      <div className="text-right">{item.match}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* Button */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="rounded-lg bg-[#f4a000] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-90"
            >
              Done
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 text-sm text-gray-400">
          © 2026 PathRekom
        </div>
      </div>
    </div>
  )
}