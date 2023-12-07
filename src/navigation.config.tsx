import configuration from '~/configuration';
import { Cog8ToothIcon, Squares2X2Icon, UserGroupIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';

const NAVIGATION_CONFIG = {
  items: [
    // {
    //   label: 'common:dashboardTabLabel',
    //   path: configuration.paths.appHome,
    //   Icon: ({ className }: { className: string }) => {
    //     return <Squares2X2Icon className={className} />;
    //   },
    // },
    {
      label: 'common:jobsTabLabel',
      path: configuration.paths.jobs,
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
    },
    {
      label: 'common:installerSchedulerTabLabel',
      path: configuration.paths.installerScheduler,
      Icon: ({ className }: { className: string }) => {
        return <Square3Stack3DIcon className={className} />;
      },
    },
    {
      label: 'common:installersTabLabel',
      path: configuration.paths.installers,
      Icon: ({ className }: { className: string }) => {
        return <UserGroupIcon className={className} />;
      },
    },
    {
      label: 'common:settingsTabLabel',
      path: '/settings',
      Icon: ({ className }: { className: string }) => {
        return <Cog8ToothIcon className={className} />;
      },
    },
  ],
};

export default NAVIGATION_CONFIG;
