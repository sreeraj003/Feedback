import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feedback from './pages/Feedback/Index'
import Result from './pages/Result'
import NotFoundPage from './pages/error/Index'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Feedback />} />
          <Route path='/result' element={<Result />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
