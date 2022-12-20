import * as React from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import ApiTestingLayout from '../worldview/mapLayout/ApiTestingLayout';
import Navbar from './Navbar';

const ApiTestingPage = (props: FlexProps) => {

  return (
    <Flex direction="column" flex="1">
      <Navbar />
      <Flex as="main" role="main" direction="column" flex="1" px="16" py="1" {...props}>
        <ApiTestingLayout />
      </Flex>
    </Flex>
  )
}

export default ApiTestingPage;