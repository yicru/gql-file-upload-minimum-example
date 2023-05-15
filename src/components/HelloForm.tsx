import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { graphql } from '@/lib/gql'
import { useMutation } from 'urql'

const HelloForm_HelloMutation = graphql(/* GraphQL */ `
  mutation Hello($name: String!) {
    hello(name: $name)
  }
`)

type Props = BoxProps

export const HelloForm = ({ ...boxProps }: Props) => {
  const [name, setName] = useState('')

  const [result, hello] = useMutation(HelloForm_HelloMutation)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleOnUpload = async () => {
    if (!name) return
    await hello({ name })
  }

  return (
    <Box {...boxProps}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={handleOnChange} />
      </FormControl>

      <Button
        isDisabled={!name}
        bg={'black'}
        colorScheme={'blackAlpha'}
        width={'100%'}
        mt={4}
        isLoading={result.fetching}
        onClick={handleOnUpload}
      >
        Hello
      </Button>

      {result.data && (
        <Box bg={'gray.200'} py={2} px={3} mt={4} rounded={'md'}>
          <Text fontSize={'xs'}>{result.data.hello}</Text>
        </Box>
      )}
    </Box>
  )
}
