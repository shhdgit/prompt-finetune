import { Anchor, Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useState } from 'react'
import { EntityFormValue, ExampleFormValue } from '../../../shared/api'
import { CategoryValue, openKBFormModal, useKBForm } from '../../../shared/components/KBFormModal'

interface Column {
  column: string
  desc: string
  table: string
}

const PromptEditCard: React.FC<{
  columns: Column[]
  entities: EntityFormValue[]
  examples: ExampleFormValue[]
  onAdd: () => void
}> = ({ columns, entities, examples, onAdd }) => {
  const form = useKBForm({
    category: CategoryValue.Entity
  })
  return (
    <Card>
      <Group position="apart">
        <Text fz={14} c="gray">
          Knowledge Base used in Prompt
        </Text>
        <Button variant="light" onClick={() => openKBFormModal('add', form, onAdd, () => form.reset())}>
          Add
        </Button>
      </Group>
      <Stack>
        <Stack spacing="sm">
          <Title order={6}>Description</Title>
          <Stack spacing="xs">
            {columns.map((c, i) => (
              <CodeWithEdit key={i} data={c} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <Title order={6}>Common Sense</Title>
          <Stack spacing="xs">
            {entities.map((e, i) => (
              <CodeWithEdit key={i} editable data={e} category={CategoryValue.Entity} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing="sm">
          <Title order={6}>Example</Title>
          <Stack spacing="xs">
            {examples.map((e, i) => (
              <CodeWithEdit key={i} editable data={e} category={CategoryValue.Example} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

const CodeWithEdit: React.FC<{
  editable?: boolean
  category?: CategoryValue
  data: Column | ExampleFormValue | EntityFormValue
}> = ({ editable, category, data }) => {
  const form = useKBForm({
    category,
    ...data
  })
  const [displayedData, setDisplayedData] = useState(data)
  const updateData = (v: any) => {
    setDisplayedData(v)
    form.setValues(v)
  }

  return (
    <div className="relative">
      <Prism noCopy language="tsx">
        {JSON.stringify(displayedData, null, '  ')}
      </Prism>
      {!!editable && (
        <Anchor className="absolute top-2 right-2" fz={14} onClick={() => openKBFormModal('edit', form, updateData)}>
          Edit
        </Anchor>
      )}
    </div>
  )
}

export default PromptEditCard
