import { Anchor, Button, Card, Code, CodeProps, Group, Stack, Text, Title } from '@mantine/core'
import { forwardRef } from 'react'
import { openKBFormModal } from '../../../shared/components/KBFormModal'

const PromptEditCard: React.FC = () => {
  return (
    <Card>
      <Group position="apart">
        <Text fz={14} c="gray">
          Knowledge Base used in Prompt
        </Text>
        <Button variant="light" onClick={() => openKBFormModal('add')}>
          Add
        </Button>
      </Group>
      <Stack>
        <Stack spacing="sm">
          <Title order={6}>Description</Title>
          <Stack spacing="xs">
            <CodeWithEdit>xxx</CodeWithEdit>
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <Title order={6}>Common Sense</Title>
          <Stack spacing="xs">
            <CodeWithEdit editable>xxx</CodeWithEdit>
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <Title order={6}>Example</Title>
          <Stack spacing="xs">
            <CodeWithEdit editable>xxx</CodeWithEdit>
            <CodeWithEdit editable>xxx</CodeWithEdit>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

const CodeWithEdit: React.FC<CodeProps & React.RefAttributes<HTMLElement> & { editable?: boolean }> = forwardRef(
  ({ children, editable, ...props }, ref) => {
    return (
      <div className="relative">
        <Code className="block py-2 pr-10" {...props} ref={ref}>
          {children}
        </Code>
        {!!editable && (
          <Anchor className="absolute top-2 right-2" fz={14} onClick={() => openKBFormModal('edit')}>
            Edit
          </Anchor>
        )}
      </div>
    )
  }
)

export default PromptEditCard
