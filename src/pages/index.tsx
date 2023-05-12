import { Box, Container, Text } from '@chakra-ui/react'
import { graphql } from '@/lib/gql'
import { useQuery } from 'urql'

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
    <Container py={8}>
      <Text fontSize={'xl'} fontWeight={500} color={'gray.600'}>
        Query Result
      </Text>
      <Box bg={'gray.200'} py={2} px={3} mt={2} rounded={'md'}>
        <Text>{fetching ? 'loading...' : data?.greetings}</Text>
      </Box>
    </Container>
  )
}
