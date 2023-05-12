import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  HStack,
  Text,
  VisuallyHiddenInput,
} from '@chakra-ui/react'
import { ChangeEvent, useRef, useState } from 'react'
import { graphql } from '@/lib/gql'
import { useMutation } from 'urql'

const ReadTextFileForm_ReadTextFileMutation = graphql(/* GraphQL */ `
  mutation ReadTextFile($file: File!) {
    readTextFile(file: $file)
  }
`)

type Props = BoxProps

export const ReadTextFileForm = ({ ...boxProps }: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [result, readTextFile] = useMutation(
    ReadTextFileForm_ReadTextFileMutation
  )

  const openFilePicker = () => {
    ref.current?.click()
  }

  const clearFile = () => {
    setSelectedFile(null)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
  }

  const handleOnUpload = async () => {
    if (!selectedFile) return
    await readTextFile({ file: selectedFile })
  }

  return (
    <Box {...boxProps}>
      <HStack>
        <Button onClick={openFilePicker} size={'sm'}>
          Pick File
        </Button>
        {selectedFile && (
          <>
            <Text isTruncated>{selectedFile.name}</Text>
            <CloseButton size={'sm'} onClick={clearFile} />
          </>
        )}
      </HStack>
      <VisuallyHiddenInput ref={ref} type={'file'} onChange={handleOnChange} />

      <Button
        isDisabled={!selectedFile}
        bg={'black'}
        colorScheme={'blackAlpha'}
        width={'100%'}
        mt={4}
        isLoading={result.fetching}
        onClick={handleOnUpload}
      >
        Upload
      </Button>

      {result.error && (
        <Box
          borderColor={'red.600'}
          py={2}
          px={3}
          mt={4}
          rounded={'md'}
          borderWidth={'1px'}
        >
          <Text fontSize={'xs'} color={'red.600'}>
            {result.error.message}
          </Text>
        </Box>
      )}

      {result.data && (
        <Box bg={'gray.200'} py={2} px={3} mt={4} rounded={'md'}>
          <Text fontSize={'xs'}>{result.data.readTextFile}</Text>
        </Box>
      )}
    </Box>
  )
}
