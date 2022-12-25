import {
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stat,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';
import SystemUpdate from './SystemUpdate';
import Mirrors from './Mirrors';
import ManjaroSettingsModule from './ManjaroSettingsModule';
import GnomeLayoutManager from './GnomeLayoutMaganer';

const SystemConfig: React.FC = () => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  const [isVisibleMSM, setIsVisibleMSM] = useState(false);
  const [isVisibleMCP, setIsVisibleMCP] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const resultOfGnome = new Command('version-control', ['-Q', 'gnome-layout-switcher']).execute();
    resultOfGnome.then((response) => {
      if (response.stdout) {
        setIsVisibleGnomeLayout(true);
      }
    });
    const resultOfMCP = new Command('version-control', ['-Q', 'mcp-qt']).execute();
    resultOfMCP.then((response) => {
      if (response.stdout) {
        setIsVisibleMCP(true);
      }
    });
    const resultOfMSM = new Command('version-control', ['-Q', 'manjaro-settings-manager']).execute();
    resultOfMSM.then((response) => {
      if (response.stdout) {
        setIsVisibleMSM(true);
      }
    });
  });
  return (
    <Tabs
      isLazy
      my={20}
      orientation="vertical"
      variant="solid-rounded"
      colorScheme="whatsapp"
    >
      <TabList>
        <Tab>{t('system')}</Tab>
        <Tab>{t('mirrors')}</Tab>
        <Tab>{t('updates')}</Tab>
        <Tab>{t('kernels')}</Tab>
        <Tab>{t('settings')}</Tab>
      </TabList>
      <TabPanels
        minW={{
          sm: '25em',
          md: '43em',
          lg: '50em',
          xl: '60em',
          '2xl': '80em',
        }}
        maxW={{
          sm: '25em',
          md: '43em',
          lg: '50em',
          xl: '60em',
          '2xl': '80em',
        }}
      >
        <TabPanel>
          <SystemInfoComponent />
        </TabPanel>
        <TabPanel>
          <Mirrors />
        </TabPanel>
        <TabPanel>
          <SystemUpdate />
        </TabPanel>
        <TabPanel>
          <KernelComponent />
        </TabPanel>
        <TabPanel>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
            {isVisibleMSM && <ManjaroSettingsModule />}
            {isVisibleMCP && (
            <Stat
              px={{ base: 2, md: 4 }}
              py="5"
              shadow="xl"
              size="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded="lg"
            >
              <Button
                width="100%"
                onClick={async () => {
                  new Command('mcp').execute();
                }}
              >
                {t('moreSettings')}
              </Button>
            </Stat>
            )}
            {isVisibleGnomeLayout && <GnomeLayoutManager />}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SystemConfig;
