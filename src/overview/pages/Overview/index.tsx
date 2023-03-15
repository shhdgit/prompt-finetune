import { Card, Group, Skeleton, Text } from '@mantine/core'
import { useQuery } from 'react-query'
import { getTrend } from '../../api'
import CaseCountChart from './Chart'

const Overview: React.FC = () => {
  const { data, isLoading } = useQuery('trend', getTrend)

  return (
    <Card>
      <Group>
        <Text weight={500}>Question Trend</Text>
        <Skeleton visible={isLoading} h={300}>
          {!isLoading && <CaseCountChart data={data!.data} />}
        </Skeleton>
      </Group>
    </Card>
  )
}

export default Overview
