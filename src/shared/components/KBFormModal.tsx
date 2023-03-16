import { Button, Divider, Group, Select, SelectItem, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useEffect, useState } from 'react'
import { EntityFormValue, ExampleFormValue, modifyEntity, modifyExample } from '../api'

type FormMode = 'add' | 'edit'

export type FormValue = (ExampleFormValue | EntityFormValue) & { category: CategoryValue }

type KBForm = UseFormReturnType<Partial<FormValue>>

export const useKBForm = (initialValues: Partial<FormValue>) => {
  return useForm<Partial<FormValue>>({
    initialValues
  })
}

export const openKBFormModal = (mode: FormMode, form: KBForm, onChange?: (v: any) => void, onClose?: () => void) => {
  const isAddMode = mode === 'add'
  modals.open({
    title: `${isAddMode ? 'Add' : 'Edit'} Knowledge Base`,
    children: (
      <KBForm
        mode={mode}
        form={form}
        onChange={onChange}
        onClose={() => {
          modals.closeAll()
          onClose?.()
        }}
      />
    )
  })
}

export enum CategoryValue {
  Entity = 'entity',
  Example = 'example'
}

const CATEGORIES: SelectItem[] = [
  { value: CategoryValue.Entity, label: 'Common Sense' },
  { value: CategoryValue.Example, label: 'Example' }
]

const EntityForm: React.FC<{ mode: FormMode; form: KBForm }> = ({ mode, form }) => {
  return (
    <>
      <TextInput label="Entity" {...form.getInputProps('name')} required disabled={mode === 'edit'} />
      <Textarea label="Content" {...form.getInputProps('desc')} required minRows={6} />
    </>
  )
}

const ExampleForm: React.FC<{ mode: FormMode; form: KBForm }> = ({ mode, form }) => {
  return (
    <>
      <TextInput label="Question" {...form.getInputProps('Q')} required disabled={mode === 'edit'} />
      <Textarea label="Answer" {...form.getInputProps('A')} required minRows={6} />
    </>
  )
}

const FORMS = {
  [CategoryValue.Entity]: EntityForm,
  [CategoryValue.Example]: ExampleForm
}

const KBForm: React.FC<{ mode: FormMode; form: KBForm; onChange?: (v: any) => void; onClose?: () => void }> = ({
  mode,
  form,
  onChange,
  onClose
}) => {
  const isAddMode = mode === 'add'
  const [category, setCategory] = useState<CategoryValue>(form.values.category || CategoryValue.Entity)
  const Form = FORMS[category]
  const internalForm = useKBForm(form.values)
  const [loading, setLoading] = useState(false)

  return (
    <Stack>
      <Select
        label="Category"
        placeholder="Please select a category"
        data={CATEGORIES}
        disabled={!isAddMode}
        value={category}
        onChange={(v) => setCategory(v as CategoryValue)}
        required
      />
      <Divider />
      {!!Form && <Form mode={mode} form={internalForm} />}
      <Group position="right">
        <Button onClick={onClose} variant="default" disabled={loading}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true)

            try {
              const res = await (category === CategoryValue.Entity
                ? modifyEntity({
                    name: (internalForm.values as EntityFormValue).name,
                    desc: (internalForm.values as EntityFormValue).desc
                  })
                : modifyExample({
                    Q: (internalForm.values as ExampleFormValue).Q,
                    A: (internalForm.values as ExampleFormValue).A
                  }))
              onClose?.()
              if (res.data.status !== 'success') {
                return
              }
              onChange?.(
                category === CategoryValue.Entity
                  ? { name: res.data.name, desc: res.data.desc }
                  : { Q: res.data.Q, A: res.data.A }
              )
            } finally {
              setLoading(false)
            }
          }}
        >
          Confirm
        </Button>
      </Group>
    </Stack>
  )
}
