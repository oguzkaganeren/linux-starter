import {
  Container, Heading, Text, Button,
} from '@chakra-ui/react';
import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';

  interface FinalPageProps {
      onReset: () => void;
  }
const FinalPage: React.FC<FinalPageProps> = (props) => (
  <Container textAlign="center">
    <CheckCircleIcon boxSize="50px" color="green.500" marginTop={150} />
    <Heading as="h2" size="xl" mt={6} mb={2}>
      Congratulations!
    </Heading>
    <Text color="gray.500">
      You are ready. Time to discover your special linux environment.
    </Text>
    <Button mt={6} size="sm" onClick={() => props.onReset()}>
      Return First Step
    </Button>

  </Container>
);
export default FinalPage;
