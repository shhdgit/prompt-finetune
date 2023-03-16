import { AppShell, Button, Group, Header, MantineProvider, Navbar, Title } from '@mantine/core'
import { IconFilePlus } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { CategoryValue, openKBFormModal, useKBForm } from '../KBFormModal'
import ClusterSelect from './ClusterSelect'
import Navs from './Navs'

const AppLayout: React.FC = () => {
  const form = useKBForm({ category: CategoryValue.Entity })
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 275 }} p="xs">
            <Navbar.Section grow mt="xs">
              <Navs />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" px={20}>
              <Group>
                <Title order={3} lh="60px" className="cursor-pointer inline-block">
                  AI Optimization Platform
                </Title>
                <ClusterSelect />
              </Group>
              <Button
                leftIcon={<IconFilePlus size={18} />}
                variant="light"
                onClick={() => openKBFormModal('add', form, () => form.reset())}
              >
                Add Knowledge Base
              </Button>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
          }
        })}
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  )
}

export default AppLayout
