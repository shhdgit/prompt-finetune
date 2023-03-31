import useUrlState from '@ahooksjs/use-url-state'
import { ActionIcon, Alert, Badge, Card, Group, ScrollArea, Skeleton, Stack, Table, Text, Tooltip } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconAlertCircle, IconExternalLink, IconPlayerPlay } from '@tabler/icons-react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PropsWithChildren, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { getQuestionList, executeQuestion } from '../api'

dayjs.extend(utc)

const yesterday = new Date()
yesterday.setDate(yesterday.getDate())

const CaseList: React.FC = () => {
  const [urlState, setUrlState] = useUrlState(() => {
    const d = new Date()
    d.setDate(d.getDate())
    return { date: dayjs(d).format('YYYY-MM-DD') }
  })
  const date = useMemo(() => dayjs(urlState.date).toDate(), [urlState.date])
  const { data, isLoading } = useQuery(['questionList', urlState.date], () => getQuestionList(urlState.date))

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
                <th className="min-w-[160px]">Dayily Run Test</th>
                <th className="min-w-[160px]">Manual Test</th>
                <th className="min-w-[120px]">Model</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                data?.data.map((d: any) => (
                  <tr key={d.id}>
                    <td>{dayjs(d.created_at).utc().format('YYYY-MM-DD hh:mm:ss')}</td>
                    <td>
                      <TextEllipsis>{d.title}</TextEllipsis>
                    </td>
                    <td>{d.error_type}</td>
                    <td>
                      <TextEllipsis>{d.error}</TextEllipsis>
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
                            to={`/question/detail?id=${encodeURIComponent(d.id)}&type=daily`}
                            target="_blank"
                            className="no-underline"
                          >
                            <ActionIcon color="blue">
                              <IconExternalLink className="align-sub	" size={16} />
                            </ActionIcon>
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
                        {!!d.manual_status ? (
                          <NavLink
                            to={`/question/detail?id=${encodeURIComponent(d.id)}&type=manual`}
                            target="_blank"
                            className="no-underline"
                          >
                            <ActionIcon color="blue">
                              <IconExternalLink className="align-sub" size={16} />
                            </ActionIcon>
                          </NavLink>
                        ) : (
                          <RunManual data={d} />
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

const RunManual: React.FC<{ data: any }> = ({ data }) => {
  const [successed, setSuccessed] = useState(false)
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ['exec_manual_test', data.id],
    mutationFn: () => executeQuestion(data.id)
  })

  return (
    <ActionIcon
      color="blue"
      loading={isLoading}
      onClick={async () => {
        if (successed) {
          window.open(
            `${window.location.origin}${window.location.pathname}#/question/detail?id=${encodeURIComponent(
              data.id
            )}&type=manual`
          )
        }

        const res = await mutateAsync()
        setSuccessed(true)
        window.open(
          `${window.location.origin}${window.location.pathname}#/question/detail?id=${encodeURIComponent(
            res.data.id
          )}&type=manual`
        )
      }}
    >
      {successed ? (
        <IconExternalLink className="align-sub	" size={16} />
      ) : (
        <IconPlayerPlay className="align-sub" size={16} />
      )}
    </ActionIcon>
  )
}

export default CaseList
