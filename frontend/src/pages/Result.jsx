import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ccislogo from '../assets/ccislogo.png';

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
];

export default function Result() {
  const navigate = useNavigate();

  const handleDone = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to go back to the start?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, go back',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f4a000',
      cancelButtonColor: '#6b7280',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center">
      <div className="mx-auto w-[95%] max-w-6xl overflow-hidden rounded-[32px] bg-[#fdfdfd] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between bg-[#03045e] px-6 py-4 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-inner">
            <img src={ccislogo} alt="CCIS Logo" className="h-8 w-8 object-contain" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Path<span className="text-[#f4a000]">Rekom</span>
          </h1>

          <div className="w-10" /> {/* Spacer for balance */}
        </div>

        {/* Main Content Area */}
        <div className="px-10 py-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-stretch">

            {/* LEFT SECTION: TABLE */}
            <div className="flex flex-col h-full min-h-0">
              <h2 className="mb-6 text-center text-xl font-extrabold text-[#03045e]">
                Top 10 Recommended Job Categories
              </h2>

              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm flex-1 min-h-0">
                
                {/* Header Row */}
                <div className="grid grid-cols-[70px_1fr_130px] bg-[#03045e] px-5 py-4 text-white font-bold uppercase text-xs tracking-wider">
                  <div>Rank</div>
                  <div>Job Category</div>
                  <div className="text-right">Relative Match</div>
                </div>

                {/* Data Rows */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {categoryData.map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-[70px_1fr_130px] items-center px-5 py-4 transition-colors ${
                        index === 0
                          ? 'bg-[#f4a000] text-white font-bold'
                          : index % 2 === 0
                          ? 'bg-[#f9fafb]'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div className="text-sm font-bold">{item.rank}</div>
                      <div className="text-sm font-medium">{item.job}</div>
                      <div className="text-right text-sm">{item.match}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT SECTION: PILL LIST */}
            <div className="flex flex-col h-full min-h-0">
              <h2 className="mb-6 text-center text-xl font-extrabold text-[#03045e]">
                Top 10 Category Matches
              </h2>

              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm flex-1 min-h-0">
                <div className="flex h-full flex-col gap-3 overflow-y-auto p-4 min-h-0 bg-white">
                  {categoryData.map((item, index) => (
                    <div
                      key={item.rank}
                      className={`rounded-full px-5 py-2 shadow-sm transition-all duration-200 ${
                        index === 0
                          ? 'bg-[#f4a000] text-white shadow-md'
                          : 'bg-[#f3f4f6] text-[#1f2937] hover:bg-[#e5e7eb]'
                      }`}
                    >
                      <span className="text-sm font-medium">{item.job}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleDone}
              className="rounded-lg bg-[#f4a000] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-90"
            >
              Done
            </button>
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