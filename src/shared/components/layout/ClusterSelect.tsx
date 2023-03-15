import { Select } from '@mantine/core'

const ClusterSelect: React.FC = () => {
  return <Select data={[{ value: 'ossinsight', label: 'Ossinsight' }]} defaultValue="ossinsight" />
}

export default ClusterSelect
