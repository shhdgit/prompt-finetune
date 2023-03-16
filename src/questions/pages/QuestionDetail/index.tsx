import { Button, Card, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { executeQuestion, getQuestion } from '../../api'
import PromptEditCard from './PromptEditCard'

const Detail: React.FC = () => {
  const location = useLocation()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const type = (searchParams.get('type') || 'daily') as 'daily' | 'manual'
  const { data, isLoading, refetch } = useQuery(['question', id], () => getQuestion(id!))
  const d = data?.data
  const columns = useMemo(() => d && parseJSON(type === 'daily' ? d.daily_columns : d.manual_columns), [d])
  const examples = useMemo(() => d && parseJSON(type === 'daily' ? d.daily_examples : d.manual_examples), [d])
  const entities = useMemo(() => d && parseJSON(type === 'daily' ? d.daily_entities : d.manual_entities), [d])
  const [testing, setTesting] = useState(false)

  return (
    <Stack>
      {isLoading ? (
        <>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} width="70%" radius="xl" />
        </>
      ) : (
        <>
          <Group position="apart">
            <Tooltip label={d.title} multiline maw={400}>
              <Text className="break-all" maw="700px" lineClamp={1}>
                Question: {d.title}
              </Text>
            </Tooltip>
            <Button
              onClick={async () => {
                setTesting(true)
                try {
                  const res = await executeQuestion(id!)
                  window.open(`${window.location.origin}/question/detail/${res.data.id}?type=manual`)
                } finally {
                  setTesting(false)
                }
              }}
              loading={testing}
            >
              Test with KB
            </Button>
          </Group>

          <Card>
            <Text fz={14} c="gray">
              Revised Question
            </Text>
            <Text fz={16}>{d.revised_title}</Text>
          </Card>

          <Card>
            <Text fz={14} c="gray">
              SQL
            </Text>
            <Text fz={16}>{d.query_sql || 'N/A'}</Text>
          </Card>

          <Card>
            <Text fz={14} c="gray">
              Result
            </Text>
            <Text fz={16}>{d.result || 'N/A'}</Text>
          </Card>

          <Card>
            <Text fz={14} c="gray">
              Error Message
            </Text>
            <Text fz={16}>{d.error || 'N/A'}</Text>
          </Card>

          <PromptEditCard columns={columns} entities={entities} examples={examples} onAdd={refetch} />

          <Card>
            <Text fz={14} c="gray">
              Complete Prompt
            </Text>
            <Text fz={16} className="whitespace-pre-line">
              {type === 'daily' ? d.daily_prompt : d.manual_prompt}
            </Text>
          </Card>
        </>
      )}
    </Stack>
  )
}

const parseJSON = (s: string) => {
  try {
    return JSON.parse(s)
  } catch (e) {
    return s
  }
}

export default Detail
