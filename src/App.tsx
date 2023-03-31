import { Navigate, Route, Routes } from 'react-router-dom'
import CaseList from './questions/pages/CaseList'
import Overview from './overview/pages/Overview'
import AppLayout from './shared/components/layout'
import NoMatch from './shared/pages/NoMatch'
import QuestionDetail from './questions/pages/QuestionDetail'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="overview" replace />} />

        <Route path="overview" element={<Overview />} />
        <Route path="question">
          <Route index element={<CaseList />} />
          <Route path="detail" element={<QuestionDetail />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
