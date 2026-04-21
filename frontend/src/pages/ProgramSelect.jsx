import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ccislogo from '../assets/ccislogo.png'

export default function ProgramSelect() {
  const navigate = useNavigate()
  const [selectedSex, setSelectedSex] = useState('')

  const handleNext = () => {
    if (!selectedSex) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please select your sex to continue.',
        confirmButtonColor: '#f4a000',
      })
      return
    }

    navigate('/grade-input', {
      state: {
        sex: selectedSex,
      },
    })
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto w-[90%] max-w-6xl overflow-hidden rounded-[32px] border border-gray-300 bg-[#f5f5f5] shadow-2xl">
        <div className="flex items-center justify-between bg-[#03045e] px-4 py-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <img src={ccislogo} alt="logo" className="h-9 w-9 object-contain" />
          </div>

          <h1 className="text-center text-2xl font-bold">
            Path<span className="text-[#f4a000]">Rekom</span>
          </h1>

          <div className="w-12" />
        </div>

        <div className="min-h-[620px] px-10 py-12">
          <div className="mx-auto w-full max-w-6xl bg-[#03045e] py-4 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Enter Your Sex
            </h2>
          </div>

          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-md">
              <h3 className="mb-4 text-center text-lg font-semibold text-[#0b1f7a]">
                Select Sex
              </h3>

              <div className="flex justify-center gap-8">
                <button
                  type="button"
                  onClick={() => setSelectedSex('m')}
                  className={`w-36 rounded-xl border-2 py-3 text-lg font-semibold transition ${
                    selectedSex === 'm'
                      ? 'border-[#03045e] bg-[#03045e] text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-[#e6eefc]'
                  }`}
                >
                  Male
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSex('f')}
                  className={`w-36 rounded-xl border-2 py-3 text-lg font-semibold transition ${
                    selectedSex === 'f'
                      ? 'border-[#03045e] bg-[#03045e] text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-[#e6eefc]'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 pb-6">
          <button
            onClick={() => navigate('/')}
            className="flex w-[120px] items-center justify-center rounded-lg bg-[#03045e] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex w-[120px] items-center justify-center rounded-lg bg-[#f4a000] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
          >
            Next
          </button>
        </div>

        <div className="px-8 pb-5 text-sm text-gray-400">
          © 2026 PathRekom
        </div>
      </div>
    </div>
  )
}