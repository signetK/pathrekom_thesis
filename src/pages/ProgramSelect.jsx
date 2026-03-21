import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ccislogo from '../assets/ccislogo.png'

export default function ProgramSelect() {
  const navigate = useNavigate()
  const [selectedProgram, setSelectedProgram] = useState('')

  const handleNext = () => {
    if (!selectedProgram) return
    navigate('/grade-input', { state: { program: selectedProgram } })
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto mt-1 mb-1 w-[90%] max-w-7xl overflow-hidden rounded-[32px] border border-gray-300 bg-[#f5f5f5] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-[#03045e] px-6 py-3 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <img src={ccislogo} alt="logo" className="h-9 w-9 object-contain" />
          </div>

          <h1 className="text-center text-3xl font-bold">
            Path<span className="text-[#f4a000]">Rekom</span>
          </h1>

          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="min-h-[620px] px-6 py-10">
          <div className="mx-auto w-full max-w-6xl bg-[#03045e] py-4 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Select Your Degree Program
            </h2>
          </div>

          {/* Dropdown */}
          <div className="mt-24 flex justify-center">
            <div className="w-full max-w-md">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="cursor-pointer w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-xl text-gray-600 shadow-sm outline-none"
              >
                <option value="" disabled>
                  Choose Program
                </option>
                <option value="bscs">BS in Computer Science</option>
                <option value="bsit">BS in Information Technology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 pb-6">
          <button  
            onClick={() => navigate('/')}
            className="w-[120px] flex justify-center items-center rounded-lg bg-[#03045e] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="w-[120px] flex justify-center items-center rounded-lg bg-[#f4a000] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
          >
            Next
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 pb-5 text-sm text-gray-400">
          © 2026 PathRekom
        </div>
      </div>
    </div>
  )
}