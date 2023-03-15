import { Navigate, Route, Routes } from 'react-router-dom'
import BadCaseList from './badcase/pages/List'
import Overview from './overview/pages/Overview'
import AppLayout from './shared/components/layout'
import NoMatch from './shared/pages/NoMatch'
import TestRunDetail from './testrun/pages/Detail'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="overview" replace />} />

        <Route path="overview" element={<Overview />} />
        <Route path="badcase" element={<BadCaseList />} />
        <Route path="testrun">
          <Route path="detail/:id" element={<TestRunDetail />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
