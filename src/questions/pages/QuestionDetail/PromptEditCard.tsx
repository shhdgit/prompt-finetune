import { Anchor, Button, Card, Group, Stack, Table, Text, Title } from '@mantine/core'
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
}> = ({ columns, entities, examples }) => {
  const form = useKBForm({
    category: CategoryValue.Entity
  })
  return (
    <Card>
      <Group position="apart">
        <Text fz={14} c="gray" mb="xs">
          Knowledge Base used in Prompt
        </Text>
        <Button variant="light" onClick={() => openKBFormModal('add', form, () => form.reset())}>
          Add
        </Button>
      </Group>
      <Stack>
        {/* <Stack spacing="sm">
          <Title order={6}>Description</Title>
          <DescriptionTable data={columns} />
        </Stack> */}
        <Stack spacing="sm">
          <Title order={6}>Common Sense</Title>
          <EntityTable data={entities} />
        </Stack>
        <Stack spacing="sm">
          <Title order={6}>Example</Title>
          <ExampleTable data={examples} />
        </Stack>
      </Stack>
    </Card>
  )
}

const DescriptionTable: React.FC<{ data: Column[] }> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Table</th>
          <th>Column</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element, i) => (
          <tr key={i}>
            <td>{element.table}</td>
            <td>{element.column}</td>
            <td>{element.desc}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const EntityTable: React.FC<{ data: EntityFormValue[] }> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Entity</th>
          <th>Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element, i) => (
          <tr key={i}>
            <td>{element.name}</td>
            <td>{element.desc}</td>
            <td>
              <EditAction category={CategoryValue.Entity} data={element} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const ExampleTable: React.FC<{ data: ExampleFormValue[] }> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element, i) => (
          <tr key={i}>
            <td>{element.Q}</td>
            <td>{element.A}</td>
            <td>
              <EditAction category={CategoryValue.Example} data={element} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const EditAction: React.FC<{ category: CategoryValue; data: Column | ExampleFormValue | EntityFormValue }> = ({
  category,
  data
}) => {
  const form = useKBForm({
    category,
    ...data
  })
  return (
    <Anchor fz={14} onClick={() => openKBFormModal('edit', form)}>
      Edit
    </Anchor>
  )
}

export const CodeWithEdit: React.FC<{
  editable?: boolean
  category?: CategoryValue
  data: Column | ExampleFormValue | EntityFormValue
}> = ({ editable, category, data }) => {
  const form = useKBForm({
    category,
    ...data
  })
  const [displayedData] = useState(data)

  return (
    <div className="relative">
      <Prism noCopy language="tsx">
        {JSON.stringify(displayedData, null, '  ')}
      </Prism>
      {!!editable && (
        <Anchor className="absolute top-2 right-2" fz={14} onClick={() => openKBFormModal('edit', form)}>
          Edit
        </Anchor>
      )}
    </div>
  )
}

export default PromptEditCard
