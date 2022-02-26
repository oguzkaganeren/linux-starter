import './home.css';
import React, { Suspense } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode, Button, useColorModeValue,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs, GiDonerKebab } from 'react-icons/gi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/packageList/PackageListComponent';
import ResultComponent from '../components/ResultComponent';
import SystemSettings from '../components/SystemSettings';
import MoreComponent from '../components/MoreComponent';

import packageJson from '../../package.json';

interface AppProps {
}

const homeContent = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const PackageContent: React.FC<AppProps> = (props) => (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <PackagesView />
    </Suspense>
  </Flex>
);
const settingContent = (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <SystemSettings />
    </Suspense>
  </Flex>
);
const moreContent = (
  <Flex py={4}>
    <MoreComponent />
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const STEPCOUNT = 4;
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <PackageContent /> },
    { label: 'Settings', icon: GiSettingsKnobs, content: settingContent },
    { label: 'More', icon: GiDonerKebab, content: moreContent },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const {
    nextStep, prevStep, reset, activeStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <VStack>

      <VStack width="100%">

        <Steps
          bg={bg}
          position="fixed"
          padding={5}
          activeStep={activeStep}
        >

          {steps.map(({ label, content, icon }) => (
            <Step label={label} key={label} icon={icon}>
              {content}
            </Step>
          ))}
        </Steps>

      </VStack>

      {activeStep === STEPCOUNT ? (
        <ResultComponent onReset={reset} />
      ) : (
        <Flex
          position="fixed"
          padding={5}
          bg={bg}
          bottom={0}
          w="100%"
        >
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <StepButtons
            {...{ nextStep, prevStep }}
            prevDisabled={activeStep === 0}
            isLast={activeStep === STEPCOUNT - 1}
          />
          <Text position="absolute" ml={3} fontSize="xs" mt={10} color="gray.500">
            {packageJson.version}
          </Text>

        </Flex>
      )}

    </VStack>

  );
};

export default App;
