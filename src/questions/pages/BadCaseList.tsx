import useUrlState from '@ahooksjs/use-url-state'
import { Alert, Anchor, Badge, Card, Group, ScrollArea, Skeleton, Stack, Table, Text, Tooltip } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconAlertCircle, IconExternalLink } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { PropsWithChildren, useMemo } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { getQuestionList } from '../api'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const BadCaseList: React.FC = () => {
  const [urlState, setUrlState] = useUrlState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return { date: dayjs(d).format('YYYY-MM-DD') }
  })
  const date = useMemo(() => dayjs(urlState.date).toDate(), [urlState.date])
  const { data, isLoading } = useQuery(['questionList', urlState.date], () => getQuestionList(urlState.date))
  const badCaseData = useMemo(() => {
    if (!data?.data) {
      return []
    }
    return data.data.filter((d: any) => d.status !== 'success')
  }, [data])

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Alert icon={<IconAlertCircle size="1rem" />}>Here are failed questions being displayed to users.</Alert>
          <DatePickerInput
            maxDate={yesterday}
            value={date}
            onChange={(d) => setUrlState({ date: dayjs(d).format('YYYY-MM-DD') })}
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
                <th className="min-w-[200px]">Error Type</th>
                <th className="min-w-[100px]">Error Message</th>
                <th className="min-w-[140px]">Dayily Run Test</th>
                <th className="min-w-[140px]">Manual Test</th>
                <th className="min-w-[120px]">Model</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                badCaseData.map((d: any) => (
                  <tr key={d.id}>
                    <td>{dayjs(d.created_at).format('YYYY-MM-DD hh:mm:ss')}</td>
                    <td>
                      <TextEllipsis>{d.title}</TextEllipsis>
                    </td>
                    <td>{d.error_type}</td>
                    <td>
                      <TextEllipsis>{d.daily_error || d.manual_error}</TextEllipsis>
                    </td>
                    <td>
                      <Group spacing={4}>
                        <Badge
                          variant="dot"
                          color={!d.daily_status ? 'gray' : d.daily_status === 'success' ? 'green' : 'red'}
                        >
                          {d.daily_status || 'NA'}
                        </Badge>
                        {!!d.daily_status && (
                          <NavLink
                            to={`/question/detail?id=${d.id}&type=daily`}
                            target="_blank"
                            className="no-underline"
                          >
                            <Anchor component="span">
                              <IconExternalLink className="align-sub	" size={16} />
                            </Anchor>
                          </NavLink>
                        )}
                      </Group>
                    </td>
                    <td>
                      <Group spacing={4}>
                        <Badge
                          variant="dot"
                          color={!d.manual_status ? 'gray' : d.manual_status === 'success' ? 'green' : 'red'}
                        >
                          {d.manual_status || 'NA'}
                        </Badge>
                        {!!d.manual_status && (
                          <NavLink
                            to={`/question/detail?id=${d.id}&type=manual`}
                            target="_blank"
                            className="no-underline"
                          >
                            <Anchor component="span">
                              <IconExternalLink className="align-sub" size={16} />
                            </Anchor>
                          </NavLink>
                        )}
                      </Group>
                    </td>
                    <td>{d.daily_model || d.manual_model}</td>
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

const TextEllipsis: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tooltip label={children} multiline maw={400}>
      <Text lineClamp={1}>{children}</Text>
    </Tooltip>
  )
}

export default BadCaseList
