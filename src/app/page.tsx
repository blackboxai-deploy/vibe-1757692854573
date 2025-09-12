"use client";

import { useState } from "react";
import { playSound, showAlert, formatPercent } from "@/lib/utils";

// Data structures
const letterCharacters = {
  'A': {icon: '🍎', word: 'Apple'},
  'B': {icon: '📚', word: 'Book'},
  'C': {icon: '🐱', word: 'Cat'},
  'D': {icon: '🐕', word: 'Dog'},
  'E': {icon: '🥚', word: 'Egg'},
  'F': {icon: '🐟', word: 'Fish'},
  'G': {icon: '🍇', word: 'Grape'},
  'H': {icon: '🏠', word: 'House'},
  'I': {icon: '🍦', word: 'Ice cream'},
  'J': {icon: '🧃', word: 'Juice'},
  'K': {icon: '🔑', word: 'Key'},
  'L': {icon: '🍋', word: 'Lemon'},
  'M': {icon: '🌙', word: 'Moon'},
  'N': {icon: '👃', word: 'Nose'},
  'O': {icon: '🍊', word: 'Orange'},
  'P': {icon: '🍕', word: 'Pizza'},
  'Q': {icon: '👸', word: 'Queen'},
  'R': {icon: '🌧️', word: 'Rain'},
  'S': {icon: '☀️', word: 'Sun'},
  'T': {icon: '🌳', word: 'Tree'},
  'U': {icon: '☂️', word: 'Umbrella'},
  'V': {icon: '🎻', word: 'Violin'},
  'W': {icon: '💧', word: 'Water'},
  'X': {icon: '❌', word: 'X-mark'},
  'Y': {icon: '🟡', word: 'Yellow'},
  'Z': {icon: '🦓', word: 'Zebra'}
};

const numberCharacters = {
  '1': {icon: '1️⃣', word: 'One'},
  '2': {icon: '2️⃣', word: 'Two'},
  '3': {icon: '3️⃣', word: 'Three'},
  '4': {icon: '4️⃣', word: 'Four'},
  '5': {icon: '5️⃣', word: 'Five'},
  '6': {icon: '6️⃣', word: 'Six'},
  '7': {icon: '7️⃣', word: 'Seven'},
  '8': {icon: '8️⃣', word: 'Eight'},
  '9': {icon: '9️⃣', word: 'Nine'},
  '10': {icon: '🔟', word: 'Ten'}
};

const learningModules = [
  {id: 'phonics', title: 'Phonics Fundamentals', description: 'Master letter sounds and pronunciation patterns', icon: '🔤'},
  {id: 'reading', title: 'Reading Comprehension', description: 'Build strong reading and understanding skills', icon: '📖'},
  {id: 'writing', title: 'Writing Mastery', description: 'Develop confident writing abilities', icon: '✍️'},
  {id: 'visual', title: 'Visual Learning', description: 'Learn through pictures and associations', icon: '🖼️'}
];

const gamesList = [
  {id: 'matching', title: 'Letter Matching', description: 'Match letters with corresponding words', icon: '🧩'},
  {id: 'typing', title: 'Speed Typing', description: 'Improve typing accuracy and speed', icon: '⌨️'},
  {id: 'puzzle', title: 'Word Puzzles', description: 'Solve engaging word challenges', icon: '🧩'}
];

const assessmentQuestions = [
  {
    question: "Which letter is shown in the image?",
    options: ["A", "B", "C", "D"],
    answer: "A"
  },
  {
    question: "Select the word that begins with the letter 'B'",
    options: ["Cat", "Ball", "Dog", "Egg"],
    answer: "Ball"
  },
  {
    question: "What number is displayed?",
    options: ["1", "2", "3", "4"],
    answer: "3"
  },
  {
    question: "Choose the correctly spelled word",
    options: ["Apple", "Aple", "Appl", "Appel"],
    answer: "Apple"
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeLearningTab, setActiveLearningTab] = useState('alphabet');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const showSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'assessment') {
      resetAssessment();
    }
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowAssessmentResults(false);
  };

  const selectOption = (option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (!userAnswers[currentQuestionIndex]) {
      showAlert('Required', 'Please select an option before proceeding.');
      return;
    }
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = () => {
    if (!userAnswers[currentQuestionIndex]) {
      showAlert('Required', 'Please select an option before submitting.');
      return;
    }
    
    let correctCount = 0;
    assessmentQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });
    
    setShowAssessmentResults(true);
    showAlert('Complete', `Assessment submitted! Score: ${formatPercent(correctCount, assessmentQuestions.length)}%`);
  };

  const playAllLetters = () => {
    const letters = Object.keys(letterCharacters);
    let index = 0;
    const playNext = () => {
      if (index < letters.length) {
        playSound(letters[index]);
        index++;
        setTimeout(playNext, 1000);
      }
    };
    playNext();
  };

  const playAllNumbers = () => {
    const numbers = Object.keys(numberCharacters);
    let index = 0;
    const playNext = () => {
      if (index < numbers.length) {
        playSound(numbers[index]);
        index++;
        setTimeout(playNext, 1000);
      }
    };
    playNext();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-lg">
                DE
              </div>
              <h1 className="text-xl font-semibold">DyslexiaEdu Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, Learner</span>
              <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              {id: 'dashboard', label: 'Dashboard', icon: '📊'},
              {id: 'assessment', label: 'Assessment', icon: '📝'},
              {id: 'learning', label: 'Learning', icon: '📚'},
              {id: 'modules', label: 'Modules', icon: '🎓'},
              {id: 'games', label: 'Games', icon: '🎮'},
              {id: 'reports', label: 'Reports', icon: '📈'}
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => showSection(nav.id)}
                className={`uber-nav-link px-6 py-4 whitespace-nowrap ${
                  activeSection === nav.id ? 'active border-b-2 border-black' : ''
                }`}
              >
                <span className="mr-2">{nav.icon}</span>
                {nav.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Section */}
        <div className={`uber-section ${activeSection === 'dashboard' ? 'active' : ''}`}>
          <div className="uber-card p-8 mb-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Track your learning progress and achievements</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="uber-stat-card">
                <div className="text-3xl font-bold text-black mb-1">85%</div>
                <div className="text-gray-600 text-sm mb-3">Overall Progress</div>
                <div className="uber-progress-bar">
                  <div className="uber-progress-fill" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="uber-stat-card">
                <div className="text-3xl font-bold text-black mb-1">26</div>
                <div className="text-gray-600 text-sm mb-3">Letters Mastered</div>
                <div className="uber-progress-bar">
                  <div className="uber-progress-fill" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="uber-stat-card">
                <div className="text-3xl font-bold text-black mb-1">10</div>
                <div className="text-gray-600 text-sm mb-3">Numbers Completed</div>
                <div className="uber-progress-bar">
                  <div className="uber-progress-fill" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="uber-stat-card">
                <div className="text-3xl font-bold text-black mb-1">12</div>
                <div className="text-gray-600 text-sm mb-3">Games Played</div>
                <div className="uber-progress-bar">
                  <div className="uber-progress-fill" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => showSection('learning')}
                className="uber-button-primary px-6 py-3 text-sm font-medium"
              >
                Continue Learning →
              </button>
              <button 
                onClick={() => showSection('reports')}
                className="uber-button-secondary px-6 py-3 text-sm font-medium"
              >
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Assessment Section */}
        <div className={`uber-section ${activeSection === 'assessment' ? 'active' : ''}`}>
          {!showAssessmentResults ? (
            <div className="uber-card p-8">
              <div className="border-b border-gray-100 pb-6 mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Dyslexia Assessment</h2>
                <p className="text-gray-600">Quick screening tool to evaluate learning needs</p>
              </div>
              
              <div className="mb-8">
                <div className="text-lg font-medium text-black mb-6">
                  {assessmentQuestions[currentQuestionIndex]?.question}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessmentQuestions[currentQuestionIndex]?.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => selectOption(option)}
                      className={`uber-test-option text-left ${
                        userAnswers[currentQuestionIndex] === option ? 'selected' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="uber-button-secondary px-6 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                </span>
                
                {currentQuestionIndex === assessmentQuestions.length - 1 ? (
                  <button
                    onClick={submitAssessment}
                    className="uber-button-success px-6 py-3 text-sm font-medium"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="uber-button-primary px-6 py-3 text-sm font-medium"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="uber-card p-8 text-center">
              <h2 className="text-3xl font-bold text-black mb-6">Assessment Results</h2>
              <div className="text-6xl font-bold text-green-600 mb-6">
                {formatPercent(
                  userAnswers.filter((answer, idx) => answer === assessmentQuestions[idx].answer).length,
                  assessmentQuestions.length
                )}%
              </div>
              <button
                onClick={resetAssessment}
                className="uber-button-primary px-6 py-3 text-sm font-medium"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>

        {/* Learning Section */}
        <div className={`uber-section ${activeSection === 'learning' ? 'active' : ''}`}>
          <div className="uber-card p-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Learning Center</h2>
              <p className="text-gray-600">Interactive alphabet and number learning with audio</p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveLearningTab('alphabet')}
                className={`uber-button-primary px-6 py-3 text-sm font-medium ${
                  activeLearningTab === 'alphabet' ? '' : 'uber-button-secondary'
                }`}
              >
                Alphabet
              </button>
              <button
                onClick={() => setActiveLearningTab('numbers')}
                className={`uber-button-primary px-6 py-3 text-sm font-medium ${
                  activeLearningTab === 'numbers' ? '' : 'uber-button-secondary'
                }`}
              >
                Numbers
              </button>
            </div>
            
            {activeLearningTab === 'alphabet' && (
              <div>
                <button
                  onClick={playAllLetters}
                  className="uber-button-primary px-4 py-2 text-sm font-medium mb-6"
                >
                  🔊 Play All Letters
                </button>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {Object.entries(letterCharacters).map(([letter, {icon, word}]) => (
                    <div
                      key={letter}
                      onClick={() => playSound(letter)}
                      className="uber-learning-card"
                    >
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className="text-xl font-bold text-black mb-1">{letter}</div>
                      <div className="text-xs text-gray-600">{word}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeLearningTab === 'numbers' && (
              <div>
                <button
                  onClick={playAllNumbers}
                  className="uber-button-primary px-4 py-2 text-sm font-medium mb-6"
                >
                  🔊 Play All Numbers
                </button>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {Object.entries(numberCharacters).map(([number, {icon, word}]) => (
                    <div
                      key={number}
                      onClick={() => playSound(number)}
                      className="uber-learning-card"
                    >
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className="text-xl font-bold text-black mb-1">{number}</div>
                      <div className="text-xs text-gray-600">{word}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modules Section */}
        <div className={`uber-section ${activeSection === 'modules' ? 'active' : ''}`}>
          <div className="uber-card p-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Learning Modules</h2>
              <p className="text-gray-600">Structured educational content designed for progressive learning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModules.map((module) => (
                <div key={module.id} className="uber-module-card">
                  <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-4xl text-white">
                    {module.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">{module.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{module.description}</p>
                    <button
                      onClick={() => setSelectedModule(module.id)}
                      className="uber-button-primary px-4 py-2 text-sm font-medium w-full"
                    >
                      Start Module
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Games Section */}
        <div className={`uber-section ${activeSection === 'games' ? 'active' : ''}`}>
          <div className="uber-card p-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Educational Games</h2>
              <p className="text-gray-600">Learn through interactive and engaging gameplay</p>
            </div>
            
            {!activeGame ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamesList.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => setActiveGame(game.id)}
                    className="uber-game-card"
                  >
                    <div className="text-4xl mb-4">{game.icon}</div>
                    <h3 className="text-xl font-semibold text-black mb-2">{game.title}</h3>
                    <p className="text-gray-600 text-sm">{game.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Playing: {gamesList.find(g => g.id === activeGame)?.title}
                </h3>
                <p className="text-gray-600 mb-8">Game content would be implemented here</p>
                <button
                  onClick={() => setActiveGame(null)}
                  className="uber-button-secondary px-6 py-3 text-sm font-medium"
                >
                  ← Back to Games
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reports Section */}
        <div className={`uber-section ${activeSection === 'reports' ? 'active' : ''}`}>
          <div className="uber-card p-8">
            <div className="border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">Progress Reports</h2>
              <p className="text-gray-600">Track your improvement and learning milestones over time</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-4">Alphabet Progress</h3>
                <div className="uber-progress-bar mb-2">
                  <div className="uber-progress-fill" style={{width: '95%'}}></div>
                </div>
                <p className="text-gray-600 text-sm">95% Complete</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-4">Number Recognition</h3>
                <div className="uber-progress-bar mb-2">
                  <div className="uber-progress-fill" style={{width: '88%'}}></div>
                </div>
                <p className="text-gray-600 text-sm">88% Complete</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-4">Word Formation</h3>
                <div className="uber-progress-bar mb-2">
                  <div className="uber-progress-fill" style={{width: '72%'}}></div>
                </div>
                <p className="text-gray-600 text-sm">72% Complete</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="uber-button-primary px-6 py-3 text-sm font-medium">
                Download Report
              </button>
              <button className="uber-button-secondary px-6 py-3 text-sm font-medium">
                Share with Teacher
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Alert Component */}
      <div id="successAlert" className="uber-alert">
        <strong id="alertTitle" className="block text-black font-semibold">Success!</strong>
        <div id="alertMessage" className="text-gray-600 text-sm mt-1">Operation completed</div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2024 DyslexiaEdu Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}