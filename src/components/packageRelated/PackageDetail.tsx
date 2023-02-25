import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import DOMPurify from 'dompurify';
import { AtSignIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import PackageStatus from './PackageStatus';
import commands from '../../assets/Commands';
import RemotePackagePopover from '../common/remotePackage/RemotePackagePopover';
import { connectionState } from '../../stores/ConnectionStore';
import useWindowDimensions from '../../hooks/useWindowDimensions';

  interface PackageDetailProps {
    icon:string;
    title:string;
    catId:string;
    uniqueId:string;
    pkg:string;
    isInstalled:boolean;
    installedVersion:string;
    children: React.ReactNode;
  }

const PackageDetail: React.FC<PackageDetailProps> = (props) => {
  const {
    icon, title, catId, uniqueId, pkg, isInstalled, installedVersion, children,
  } = props;
  const [avatarSrc, setAvatarSrc] = React.useState('');
  const isOnline = useRecoilValue(connectionState);
  const { width } = useWindowDimensions();
  useEffect(() => {
    invoke('get_svg_icon', {
      svgpath: `/usr/share/icons/Papirus/32x32/apps/${icon}.svg`,
    }).then((response) => {
      if (response) {
        setAvatarSrc(response as string);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card minH={['none', 'none', '2xs', '2xs']} variant="filled">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {avatarSrc && avatarSrc !== 'Unable to read file' ? (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(avatarSrc),
                }}
              />
            ) : (
              <AtSignIcon />
            )}

            <Box>
              <Heading size="sm">
                <Button
                  variant="link"
                  whiteSpace="initial"
                  size="sm"
                  maxW={{
                    sm: '10em',
                    md: '10em',
                    lg: '24em',
                    xl: '20em',
                    '2xl': '80em',
                  }}
                  onClick={() => {
                    const cmd = new Command(commands.getPamacManager.program, [
                      `--details=${pkg}`,
                    ]);
                    cmd.execute();
                  }}
                >
                  {title}
                </Button>
              </Heading>
              {width > 760 && (<Text fontSize="xs">{installedVersion}</Text>)}
            </Box>
          </Flex>
          {isOnline && width > 500 && <RemotePackagePopover name={pkg} />}
        </Flex>
      </CardHeader>
      {width > 760 && (
      <CardBody>
        <Text fontSize="sm">{children}</Text>
      </CardBody>
      )}

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
      >
        <PackageStatus
          catId={catId}
          pkId={uniqueId}
          pkgName={pkg}
          isInstalled={isInstalled}
        />
      </CardFooter>
    </Card>
  );
};
export default PackageDetail;
