import React from 'react'
import { Stack,Spinner } from '@chakra-ui/react'

function Loader() {
  return (
    
    <div>
      {/* Loader function for Loading function */}

      <Stack direction='row'  spacing={4}>
<Spinner size='xs' />
<Spinner size='sm' />
<Spinner size='md' />             
<Spinner size='lg' />
<Spinner size='xl' />
</Stack>
    </div>
  )
}

export default Loader
