import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ccislogo from '../assets/ccislogo.png'

const gradeOptions = [
  '1.00',
  '1.25',
  '1.50',
  '1.75',
  '2.00',
  '2.25',
  '2.50',
  '2.75',
  '3.00',
  '4.00 / INC',
]

const BSCS_DATA = [
  {
    year: 'First Year',
    groups: [
      {
        title: 'First Semester',
        courses: [
          ['CMPSC 100', 'Computer Science Fundamentals'],
          ['CMPSC 111', 'Computer Programming I-C'],
        ],
      },
      {
        title: 'Second Semester',
        courses: [
          ['CMPSC 113', 'Object-Oriented Programming'],
          ['CMPSC 112_N', 'Computer Programming 2'],
        ],
      },
    ],
  },
  {
    year: 'Second Year',
    groups: [
      {
        title: 'First Semester',
        courses: [
          ['CMPSC 116', 'Database Systems'],
          ['CMPSC 121', 'Digital Design'],
          ['CMPSC 131', 'Data Structures'],
          ['CMPSC 134', 'Discrete Structures'],
        ],
      },
      {
        title: 'Second Semester',
        courses: [
          ['CMPSC 117_K12', 'Web Development & Programming'],
          ['CMPSC 122_K12', 'Computer Organization and Assembly Language'],
          ['CMPSC 133', 'Design and Analysis of Algorithms'],
          ['CMPSC 136', 'Quantitative Methods for Computer Science'],
          ['CMPSC 172', 'Data Mining'],
        ],
      },
    ],
  },
  {
    year: 'Third Year',
    groups: [
      {
        title: 'First Semester',
        courses: [
          ['CMPSC 123', 'Operating Systems'],
          ['CMPSC 140', 'System Analysis & Design'],
          ['CMPSC 151_K12', 'Computer Networks'],
          ['CMPSC 162', 'Artificial Intelligence'],
        ],
      },
      {
        title: 'Second Semester',
        courses: [
          ['CMPSC 135_K12', 'Automata Theory & Languages'],
          ['CMPSC 139', 'Operations Research'],
          ['CMPSC 146', 'Software Engineering'],
          ['CMPSC 147', 'Information Assurance & Security'],
          ['CMPSC 160', 'Distributed Systems'],
        ],
      },
      {
        title: 'Mid Year',
        courses: [['CMPSC 199', 'Practicum (162 hrs)']],
        single: true,
      },
    ],
  },
  {
    year: 'Fourth Year',
    groups: [
      {
        title: 'First Semester',
        courses: [
          ['CMPSC 132', 'Programming Languages'],
          ['CMPSC 148_K12', 'Human Computed Interaction'],
          ['CMPSC 173', 'Modeling and Simulation'],
          ['CMPSC 195', 'Special Topics'],
          ['CMPSC 200A', 'Thesis Writing I'],
        ],
      },
    ],
  },
]

function EmptyRows({ count = 2 }) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`grid grid-cols-[1fr_1.4fr_0.9fr] items-center px-4 py-3 text-center text-sm ${
        i % 2 === 0 ? 'bg-[#f3f3f3]' : 'bg-[#e8e8e8]'
      }`}
    >
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  ))
}

function SemesterTable({ title, courses, grades, onGradeChange, single = false, fillRows = 0 }) {
  return (
    <div className={single ? 'mx-auto w-full max-w-[560px]' : ''}>
      <h3 className="mb-2 text-center text-[18px] font-bold text-[#1a237e] md:text-[20px]">
        {title}
      </h3>

      <div className="overflow-hidden border border-gray-500 bg-white">
        <div className="grid grid-cols-[1fr_1.4fr_0.9fr] bg-[#03045e] px-4 py-3 text-center text-sm font-bold text-white md:text-base">
          <div>Course Code</div>
          <div>Description</div>
          <div>Grade</div>
        </div>

        {courses.map(([code, desc], index) => (
          <div
            key={code}
            className={`grid grid-cols-[1fr_1.4fr_0.9fr] items-center px-4 py-3 text-center text-md ${
              index % 2 === 0 ? 'bg-[#f3f3f3]' : 'bg-[#e8e8e8]'
            }`}
          >
            <div>{code}</div>
            <div>{desc}</div>
            <div className="flex justify-center">
              <select
                value={grades[code] || ''}
                onChange={(e) => onGradeChange(code, e.target.value)}
                required
                className="w-full max-w-[130px] rounded border-2 border-[#f4a000] bg-white px-2 py-1 font-medium text-md text-gray-700 outline-none"
              >
                <option value="">Select Grade</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {fillRows > 0 && <EmptyRows count={fillRows} />}
      </div>
    </div>
  )
}

export default function GradeInput() {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [grades, setGrades] = useState({})

  const curriculum = BSCS_DATA

  const handleGradeChange = (courseCode, value) => {
    setGrades((prev) => ({
      ...prev,
      [courseCode]: value,
    }))
  }

  const handleCalculate = () => {
    if (formRef.current && !formRef.current.reportValidity()) {
      return
    }

    const allCoursesWithDetails = BSCS_DATA.flatMap(section =>
      section.groups.flatMap(group => group.courses.map(([code, desc]) => ({ code, desc })))
    )
    const unansweredCourses = allCoursesWithDetails.filter(course => !grades[course.code])

    if (unansweredCourses.length > 0) {
      const courseList = unansweredCourses
        .map(course => `<li><strong>${course.code}</strong> - ${course.desc}</li>`)
        .join('')
      
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Grades',
        html: `<p>Please fill in grades for the following ${unansweredCourses.length} course(s):</p><ul style="text-align: left; display: inline-block;">${courseList}</ul>`,
        confirmButtonColor: '#f4a000',
        didOpen: (modal) => {
          modal.querySelector('ul').style.maxHeight = '300px'
          modal.querySelector('ul').style.overflowY = 'auto'
        },
      })
      return
    }
    navigate('/result', { state: { grades } })
  }

  return (
   <div className="min-h-screen px-6 py-8">
    <form ref={formRef} onSubmit={(e) => { e.preventDefault(); handleCalculate() }}>
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

        <div className="px-4 py-6">
          {curriculum.map((section) => (
            <div key={section.year} className="mb-8 border border-gray-300 bg-[#f2f2f2] shadow">
              <div className="bg-[#03045e] py-3 text-center text-2xl font-bold text-white">
                {section.year}
              </div>

              {section.groups.length === 3 ? (
                <>
                  <div className="grid gap-4 p-4 md:grid-cols-2">
                    <SemesterTable
                      title={section.groups[0].title}
                      courses={section.groups[0].courses}
                      grades={grades}
                      onGradeChange={handleGradeChange}
                    />
                    <SemesterTable
                      title={section.groups[1].title}
                      courses={section.groups[1].courses}
                      grades={grades}
                      onGradeChange={handleGradeChange}
                    />
                  </div>

                  <div className="px-4 pb-4">
                    <SemesterTable
                      title={section.groups[2].title}
                      courses={section.groups[2].courses}
                      grades={grades}
                      onGradeChange={handleGradeChange}
                      single
                    />
                  </div>
                </>
              ) : section.groups.length === 2 ? (
                <div className="grid gap-4 p-4 md:grid-cols-2">
                  <SemesterTable
                    title={section.groups[0].title}
                    courses={section.groups[0].courses}
                    grades={grades}
                    onGradeChange={handleGradeChange}
                    fillRows={Math.max(section.groups[1].courses.length - section.groups[0].courses.length, 0)}
                  />
                  <SemesterTable
                    title={section.groups[1].title}
                    courses={section.groups[1].courses}
                    grades={grades}
                    onGradeChange={handleGradeChange}
                    fillRows={Math.max(section.groups[0].courses.length - section.groups[1].courses.length, 0)}
                  />
                </div>
              ) : (
                <div className="px-4 pb-4">
                  <SemesterTable
                    title={section.groups[0].title}
                    courses={section.groups[0].courses}
                    grades={grades}
                    onGradeChange={handleGradeChange}
                    single
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center gap-6 pb-6">
            <button  
              onClick={() => navigate('/program-select')}
              className="w-[120px] flex justify-center items-center rounded-lg bg-[#03045e] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
            >
              Back
            </button>

            <button
              onClick={handleCalculate}
              type="submit"
              className="w-[120px] flex justify-center items-center rounded-lg bg-[#f4a000] px-10 py-3 text-lg font-bold text-white shadow hover:opacity-80"
            >
              Calculate
            </button>
          </div>

          <div className="px-4 pb-5 text-sm text-gray-400">© 2026 PathRekom</div>
        </div>
      </div>
    </form>
    </div>
  )
}