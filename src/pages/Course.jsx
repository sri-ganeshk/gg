import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { coursesService } from '../services/coursesService'
import useAuthStore from '../store/authStore'

// Flashcard Component
const FlashcardComponent = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between backface-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {card.difficulty}
              </span>
              <span className="text-xs text-gray-500">#{card.id}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">
              {card.front}
            </h3>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Category: {card.category}</p>
            <p className="text-xs text-center text-gray-400">Click to reveal answer</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full bg-blue-50 border border-blue-200 rounded-lg shadow-md p-4 flex flex-col justify-between backface-hidden rotate-y-180">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-blue-600">Answer</span>
              <span className="text-xs text-gray-500">#{card.id}</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              {card.back}
            </p>
          </div>
          <div>
            {card.tags && (
              <div className="flex flex-wrap gap-1 mb-2">
                {card.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-center text-gray-400">Click to see question</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Course = () => {
  const [courseData, setCourseData] = useState(null)
  const [qnaData, setQnaData] = useState(null)
  const [flashcardData, setFlashcardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('course')
  const { id } = useParams()
  const { getToken } = useAuthStore()

  useEffect(() => {
    fetchCourse()
  }, [id])

  // Polling effect to check for QNA and Flashcard updates
  useEffect(() => {
    if (!qnaData || !flashcardData) {
      const pollInterval = setInterval(() => {
        fetchCourse()
      }, 10000) // Poll every 10 seconds

      return () => clearInterval(pollInterval)
    }
  }, [qnaData, flashcardData])

  const fetchCourse = async () => {
    try {
      if (!courseData) {
        setLoading(true)
      }
      const token = getToken()
      
      const data = await coursesService.getCourse(id, token)
      
      if (data.json) {
        const parsedCourse = JSON.parse(data.json)
        setCourseData(parsedCourse)
      }

      // Parse QNA data if available and not loading
      if (data.qna) {
        if (data.qna === "loading") {
          // Keep qnaData as null to show loading state
          setQnaData(null)
        } else {
          try {
            const parsedQna = JSON.parse(data.qna)
            setQnaData(parsedQna)
          } catch (err) {
            console.error('Error parsing QNA data:', err)
          }
        }
      }

      // Parse Flashcard data if available and not loading
      if (data.flashCard) {
        if (data.flashCard === "loading") {
          // Keep flashcardData as null to show loading state
          setFlashcardData(null)
        } else {
          try {
            const parsedFlashcard = JSON.parse(data.flashCard)
            setFlashcardData(parsedFlashcard)
          } catch (err) {
            console.error('Error parsing Flashcard data:', err)
          }
        }
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

  const isQnaLoading = !qnaData
  const isFlashcardLoading = !flashcardData

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

      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-gray-200 mb-8">
        <div className="flex">
          <button
            onClick={() => setActiveTab('course')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'course'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Course Content
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            disabled={isQnaLoading}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'qna'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : isQnaLoading
                ? 'border-transparent text-gray-300 cursor-not-allowed'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Q&A {isQnaLoading && (
              <span className="inline-flex items-center ml-2">
                <div className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full mr-1"></div>
                Generating...
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            disabled={isFlashcardLoading}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'flashcards'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : isFlashcardLoading
                ? 'border-transparent text-gray-300 cursor-not-allowed'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Flashcards {isFlashcardLoading && (
              <span className="inline-flex items-center ml-2">
                <div className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full mr-1"></div>
                Generating...
              </span>
            )}
          </button>
        </div>
        
        {/* Refresh Button */}
        <button
          onClick={fetchCourse}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors flex items-center"
          title="Refresh content"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'course' && (
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
        )}

        {activeTab === 'qna' && (
          <div>
            {isQnaLoading ? (
              <div className="flex flex-col justify-center items-center h-[50vh] text-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p>Generating Q&A content...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            ) : (
              <div>
                <h2 className="text-gray-800 mb-6 text-3xl text-center">
                  Questions & Answers ({qnaData?.questions?.length || 0})
                </h2>
                
                {qnaData?.questions?.map((qna, index) => (
                  <div key={qna.id} className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                    <div className="flex items-start mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-1">
                        {qna.difficulty}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Q{index + 1}. {qna.question}
                        </h3>
                        {qna.options && (
                          <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Options:</p>
                            <ul className="list-none space-y-1">
                              {qna.options.map((option, optIndex) => (
                                <li key={optIndex} className={`text-sm p-2 rounded ${
                                  qna.correct_option === option 
                                    ? 'bg-green-100 text-green-800 font-medium' 
                                    : 'bg-gray-50 text-gray-700'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="bg-gray-50 p-4 rounded border-l-4 border-green-500">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Answer:</p>
                          <p className="text-gray-800 leading-relaxed">{qna.answer}</p>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          Chapter: {qna.chapter} | Type: {qna.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div>
            {isFlashcardLoading ? (
              <div className="flex flex-col justify-center items-center h-[50vh] text-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p>Generating flashcards...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            ) : (
              <div>
                <h2 className="text-gray-800 mb-6 text-3xl text-center">
                  Flashcards ({flashcardData?.flashcards?.length || 0})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flashcardData?.flashcards?.map((card) => (
                    <FlashcardComponent key={card.id} card={card} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Course