import { Button, Stack, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const NoMatch: React.FC = () => {
  return (
    <Stack>
      <Title order={4}>Nothing to see here!</Title>
      <Link to="/">
        <Button variant="outline">Go to the home page</Button>
      </Link>
    </Stack>
  )
}

export default NoMatch
