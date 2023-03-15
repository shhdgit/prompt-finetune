import { Divider, Select, SelectItem, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useState } from 'react'

type FormMode = 'add' | 'edit'

type FormValue = (ExampleFormValue | EntityFormValue) & { category: CategoryValue }

interface ExampleFormValue {
  q: string
  a: string
}

interface EntityFormValue {
  name: string
  desc: string
}

export const openKBFormModal = (mode: FormMode, defaultFormValue?: FormValue) => {
  const isAddMode = mode === 'add'
  modals.openConfirmModal({
    title: `${isAddMode ? 'Add' : 'Edit'} Knowledge Base`,
    children: <KBForm mode={mode} defaultFormValue={defaultFormValue} />,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed')
  })
}

enum CategoryValue {
  Entity = 'entity',
  Example = 'example'
}

const CATEGORIES: SelectItem[] = [
  { value: CategoryValue.Entity, label: 'Common Sense' },
  { value: CategoryValue.Example, label: 'Example' }
]

const EntityForm: React.FC<{ form: UseFormReturnType<ExampleFormValue | EntityFormValue> }> = () => {
  return (
    <>
      <TextInput label="Entity" />
      <Textarea label="Content" />
    </>
  )
}

const ExampleForm: React.FC<{ form: UseFormReturnType<ExampleFormValue | EntityFormValue> }> = () => {
  return (
    <>
      <TextInput label="Question" />
      <Textarea label="Answer" />
    </>
  )
}

const FORMS = {
  [CategoryValue.Entity]: EntityForm,
  [CategoryValue.Example]: ExampleForm
}

const KBForm: React.FC<{ mode: FormMode; defaultFormValue?: FormValue }> = ({
  mode,
  defaultFormValue = {} as FormValue
}) => {
  const isAddMode = mode === 'add'
  const { category: defaultCategory = CategoryValue.Entity, ...otherValues } = defaultFormValue
  const [category, setCategory] = useState<CategoryValue>(defaultCategory)
  const form = useForm({ initialValues: otherValues })
  const Form = FORMS[category]

  return (
    <Stack>
      <Select
        label="Category"
        placeholder="Please select a category"
        data={CATEGORIES}
        disabled={!isAddMode}
        value={category}
        onChange={(v) => setCategory(v as CategoryValue)}
      />
      <Divider />
      {!!Form && <Form form={form} />}
    </Stack>
  )
}
