import { Alert, Anchor, Badge, Card, Group, ScrollArea, Skeleton, Stack, Table, Text } from '@mantine/core'
import { DatePickerInput, DateValue } from '@mantine/dates'
import { IconAlertCircle } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { getQuestions } from '../api'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const List: React.FC = () => {
  const [date, setDate] = useState<DateValue>(() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d
  })
  const d = dayjs(date).format('YYYY-MM-DD')
  const { data, isLoading } = useQuery(['questions', d], () => getQuestions(d), {
    refetchOnWindowFocus: false
  })

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Alert icon={<IconAlertCircle size="1rem" />}>Here are failed questions being displayed to users.</Alert>
          <DatePickerInput
            maxDate={yesterday}
            value={date}
            onChange={setDate}
            w={300}
            popoverProps={{ withinPortal: true }}
          />
        </Group>

        <ScrollArea>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th className="min-w-[180px]">Time</th>
                <th className="min-w-[200px]">Question</th>
                <th className="min-w-[110px]">Status</th>
                <th className="min-w-[100px]">Error Message</th>
                <th className="min-w-[100px]">Dayily Run Test</th>
                <th className="min-w-[100px]">Manual Test</th>
                <th className="min-w-[120px]">Model</th>
                <th className="min-w-[110px]">Test with KB</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                data?.data.map((d: any) => (
                  <tr key={d.id}>
                    <td>{dayjs(d.created_at).format('YYYY-MM-DD hh:mm:ss')}</td>
                    <td>
                      <Text lineClamp={1}>{d.title}</Text>
                    </td>
                    <td>
                      <Badge variant="dot" color={d.status === 'success' ? 'green' : 'red'}>
                        {d.status}
                      </Badge>
                    </td>
                    <td>
                      <Text lineClamp={1}>{d.daily_error || d.manual_error}</Text>
                    </td>
                    <td>
                      <Text lineClamp={1}>{d.daily_result}</Text>
                    </td>
                    <td>
                      <Text lineClamp={1}>{d.manual_result}</Text>
                    </td>
                    <td>{d.daily_model || d.manual_model}</td>
                    <td>
                      <NavLink to={`/testrun/detail/${d.id}`} target="_blank" className="no-underline">
                        <Anchor component="span">Manual Test</Anchor>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <Skeleton height={300} />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Card>
  )
}

export default List
