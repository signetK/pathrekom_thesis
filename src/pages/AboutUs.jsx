import React from 'react'
import { useNavigate } from 'react-router-dom'
import ccislogo from '../assets/ccislogo.png'
import adriano from '../assets/adriano.png'
import galam from '../assets/galam.png'
import juarez from '../assets/juarez.png'
import galut from '../assets/galut.jpg'

const members = [
  { name: 'Gabriel C. Adriano Jr.', image: adriano },
  { name: 'Kirsten Jacob R. Galam', image: galam },
  { name: 'Kurt Basti A. Juarez', image: juarez },
  { name: 'Quian Vencel A. Galut', image: galut },
]

export default function About() {
  const navigate = useNavigate()

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

        <div className="min-h-[520px] px-10 py-10">

        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-20">
            {members.map((member) => (
            <div key={member.name} className="flex items-center gap-4">
                <img
                src={member.image}
                alt={member.name}
                className="h-24 w-24 rounded-full object-cover border-2 border-[#cfe0ef]"
                />
                <h2 className="text-2xl font-bold text-[#0b1f7a]">
                {member.name}
                </h2>
            </div>
            ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[18px] bg-[#cfe0ef] px-6 py-5">
            <p className="text-xl leading-relaxed text-[#0b1f7a] font-medium text-justify">
            PathRekom is a data-driven career guidance system that leverages alumni employment outcomes and student academic performance to generate personalized career recommendations. 
            Using the KNN algorithm, the system identifies similar alumni profiles and suggests relevant career paths, helping students make informed decisions while improving employability outcomes.
            </p>
        </div>

        <div className="mt-12 flex justify-center">
            <button
            onClick={() => navigate('/')}
            className="w-[180px] rounded-xl bg-[#03045e] px-10 py-3 text-xl font-bold text-white shadow hover:opacity-80"
            >
            Back
            </button>
        </div>

        </div>

        <div className="px-8 pb-5 text-sm text-gray-400">
          © 2026 PathRekom
        </div>
      </div>
    </div>
  )
}