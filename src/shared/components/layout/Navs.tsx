import { IconDashboard, IconZoomExclamation } from '@tabler/icons-react'
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'

interface Link {
  icon: React.ReactNode
  color: string
  label: string
  path: string
}

interface MainLinkProps extends Link {
  isActive: boolean
}

function MainLink({ icon, color, label, isActive }: MainLinkProps) {
  return (
    <UnstyledButton
      component="div"
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundColor: isActive ? theme.colors.gray[1] : undefined,

        '&:hover': {
          backgroundColor: isActive
            ? undefined
            : theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const data: Link[] = [
  {
    icon: <IconDashboard size="1rem" />,
    color: 'blue',
    label: 'Overview',
    path: '/overview'
  },
  {
    icon: <IconZoomExclamation size="1rem" />,
    color: 'violet',
    label: 'Bad Cases',
    path: '/badcase'
  }
  // {
  //   icon: <IconReportMedical size="1rem" />,
  //   color: "teal",
  //   label: "Test Run",
  // },
  // { icon: <IconDatabase size="1rem" />, color: "grape", label: "Databases" },
]

function Navs() {
  const links = data.map((link) => (
    <NavLink className="no-underline" to={link.path} key={link.label}>
      {({ isActive }) => <MainLink {...link} isActive={isActive} />}
    </NavLink>
  ))
  return <div>{links}</div>
}

export default Navs
