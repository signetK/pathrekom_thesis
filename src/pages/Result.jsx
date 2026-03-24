import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ccislogo from '../assets/ccislogo.png'

const defaultMatches = [
  'Software Developer',
  'Data Scientist',
  'System Analyst',
  'Cybersecurity Analyst',
  'AI Engineer',
  'IT Project Manager',
  'Database Administrator',
  'Web Developer',
  'Network Administrator',
  'Computer Systems Analyst',
]

const defaultTableData = [
  { job: 'Software Developer', percentage: '92%' },
  { job: 'Data Scientist', percentage: '89%' },
  { job: 'System Analyst', percentage: '87%' },
  { job: 'Cybersecurity Analyst', percentage: '85%' },
  { job: 'AI Engineer', percentage: '83%' },
  { job: 'IT Project Manager', percentage: '81%' },
  { job: 'Database Administrator', percentage: '80%' },
  { job: 'Web Developer', percentage: '79%' },
  { job: 'Network Administrator', percentage: '78%' },
  { job: 'Computer Systems Analyst', percentage: '76%' },
  { job: 'QA Engineer', percentage: '75%' },
  { job: 'Cloud Support Associate', percentage: '74%' },
  { job: 'IT Support Specialist', percentage: '73%' },
  { job: 'Business Analyst', percentage: '72%' },
  { job: 'Application Developer', percentage: '71%' },
]

export default function Result() {
  const location = useLocation()
  const program = location.state?.program || 'bscs'

  const titleMatches =
    program === 'bsit'
      ? [
          'Web Developer',
          'IT Support Specialist',
          'System Analyst',
          'Network Administrator',
          'Database Administrator',
          'QA Engineer',
          'Cybersecurity Analyst',
          'Business Analyst',
          'Cloud Support Associate',
          'Software Developer',
        ]
      : defaultMatches

  const tableData =
    program === 'bsit'
      ? [
          { job: 'Web Developer', percentage: '93%' },
          { job: 'IT Support Specialist', percentage: '90%' },
          { job: 'System Analyst', percentage: '88%' },
          { job: 'Network Administrator', percentage: '86%' },
          { job: 'Database Administrator', percentage: '84%' },
          { job: 'QA Engineer', percentage: '82%' },
          { job: 'Cybersecurity Analyst', percentage: '80%' },
          { job: 'Business Analyst', percentage: '78%' },
          { job: 'Cloud Support Associate', percentage: '77%' },
          { job: 'Software Developer', percentage: '76%' },
          { job: 'Technical Support Engineer', percentage: '75%' },
          { job: 'Systems Administrator', percentage: '74%' },
          { job: 'Application Support Analyst', percentage: '73%' },
          { job: 'Project Coordinator', percentage: '72%' },
          { job: 'IT Operations Associate', percentage: '71%' },
        ]
      : defaultTableData

  return (
   <div className="min-h-screen px-6 py-8">
         <div className="mx-auto mt-1 mb-1 w-[90%] max-w-6xl overflow-hidden rounded-[32px] border border-gray-300 bg-[#f5f5f5] shadow-2xl">
           
           {/* Header */}
           <div className="flex items-center justify-between bg-[#03045e] px-4 py-2 text-white">
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
               <img src={ccislogo} alt="logo" className="h-9 w-9 object-contain" />
             </div>
   
             <h1 className="text-center text-2xl font-bold">
               Path<span className="text-[#f4a000]">Rekom</span>
             </h1>
   
             <div className="w-12" />
           </div>

        <div className="min-h-[620px] px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_0.9fr]">
            <div>
              <div className="overflow-hidden rounded-[8px] border border-gray-500">
                <div className="grid grid-cols-2 bg-[#03045e] px-6 py-3 text-center text-xl font-bold text-white">
                  <div>Jobs</div>
                  <div>Percentage</div>
                </div>

                <div>
                  {tableData.map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-2 px-6 py-2 text-center font-medium text-[17px] text-gray-700 ${
                        index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-[#f6f6f6]'
                      }`}
                    >
                      <div>{item.job}</div>
                      <div>{item.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-center text-2xl font-bold text-gray-600">
                Top 10 Career Matches
              </h1>

              <div className="space-y-2">
                {titleMatches.map((job, index) => (
                  <div
                    key={job}
                    className={`rounded-lg px-4 py-2 text-lg font-medium shadow-sm ${
                      index === 0
                        ? 'bg-[#f4a000] text-white'
                        : 'border border-gray-300 bg-[#efefef] text-gray-700'
                    }`}
                  >
                    {job}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="rounded-lg bg-[#f4a000] px-12 py-3 text-xl font-bold text-white shadow hover:opacity-90"
            >
              Done
            </Link>
          </div>
        </div>

        <div className="px-8 pb-5 text-sm text-gray-400">© 2026 PathRekom</div>
      </div>
    </div>
  )
}