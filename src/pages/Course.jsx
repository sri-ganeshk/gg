import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { coursesService } from '../services/coursesService'
import useAuthStore from '../store/authStore'

const Course = () => {
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const { getToken } = useAuthStore()

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const token = getToken()
      
      const data = await coursesService.getCourse(id, token)
      
      if (data.json) {
        const parsedCourse = JSON.parse(data.json)
        setCourseData(parsedCourse)
      }
      
      setLoading(false)
    } catch (err) {
      console.error('Error fetching course:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl">
        Loading course...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-red-600 text-xl">
        Error: {error}
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl">
        No course data found
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      {/* Course Header */}
      <div className="bg-gray-50 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-gray-800 mb-4 text-4xl font-bold">
          {courseData.courseTitle}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          {courseData.courseSummary}
        </p>
      </div>

      {/* Chapters */}
      <div>
        <h2 className="text-gray-800 mb-6 text-3xl text-center">
          Course Chapters ({courseData.chapters?.length || 0})
        </h2>
        
        {courseData.chapters?.map((chapter, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            {/* Chapter Header */}
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">
                {chapter.emoji}
              </span>
              <div>
                <h3 className="text-blue-600 m-0 text-xl font-bold">
                  Chapter {index + 1}: {chapter.chapterTitle}
                </h3>
              </div>
            </div>

            {/* Chapter Summary */}
            <p className="text-gray-600 mb-5 text-base leading-relaxed italic">
              {chapter.chapterSummary}
            </p>

            {/* Topics */}
            <div>
              <h4 className="text-gray-700 mb-4 text-lg font-semibold">
                Key Topics:
              </h4>
              <ul className="list-none p-0">
                {chapter.topics?.map((topic, topicIndex) => (
                  <li key={topicIndex} className="bg-gray-50 p-3 my-1 rounded border-l-4 border-blue-500 text-sm">
                    • {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Course