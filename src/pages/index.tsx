import { Box, Container, StackDivider, Text, VStack } from '@chakra-ui/react'
import { graphql } from '@/lib/gql'
import { useQuery } from 'urql'
import { ReadTextFileForm } from '@/components/ReadTextFileForm'
import { HelloForm } from '@/components/HelloForm'

const HomePageQuery = graphql(/* GraphQL */ `
  query HomePage {
    greetings
  }
`)

export default function Home() {
  const [{ data, fetching }] = useQuery({
    query: HomePageQuery,
  })

  return (
    <Container gap={8} py={8}>
      <VStack alignItems={'stretch'} spacing={8} divider={<StackDivider />}>
        <Box>
          <Text fontSize={'xl'} fontWeight={500} color={'gray.600'}>
            Query
          </Text>
          <Box bg={'gray.200'} py={2} px={3} mt={4} rounded={'md'}>
            <Text>{fetching ? 'loading...' : data?.greetings}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontSize={'xl'} fontWeight={500} color={'gray.600'}>
            Mutation
          </Text>
          <HelloForm mt={4} />
        </Box>

        <Box>
          <Text fontSize={'xl'} fontWeight={500} color={'gray.600'}>
            Mutation - File Upload
          </Text>
          <ReadTextFileForm mt={4} />
        </Box>
      </VStack>
    </Container>
  )
}
