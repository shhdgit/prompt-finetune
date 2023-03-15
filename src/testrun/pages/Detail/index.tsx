import { Button, Card, Group, Stack, Text } from '@mantine/core'
import PromptEditCard from './PromptEditCard'

const Detail: React.FC = () => {
  return (
    <Stack>
      <Group position="apart">
        <Text>Question: xxx</Text>
        <Button>Test with KB</Button>
      </Group>

      <Card>
        <Text fz={14} c="gray">
          Received Question
        </Text>
        <Text fz={18}>xxx</Text>
      </Card>

      <Card>
        <Text fz={14} c="gray">
          SQL
        </Text>
        <Text fz={18}>xxx</Text>
      </Card>

      <Card>
        <Text fz={14} c="gray">
          Result
        </Text>
        <Text fz={18}>xxx</Text>
      </Card>

      <Card>
        <Text fz={14} c="gray">
          Error Message
        </Text>
        <Text fz={18}>xxx</Text>
      </Card>

      <PromptEditCard />

      <Card>
        <Text fz={14} c="gray">
          Complete Prompt
        </Text>
        <Text fz={18}>xxx</Text>
      </Card>
    </Stack>
  )
}

export default Detail
