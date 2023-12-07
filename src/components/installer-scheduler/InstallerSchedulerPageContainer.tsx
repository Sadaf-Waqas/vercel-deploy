import React from 'react';

import RouteShell from '~/components/RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const InstallerSchedulerPageContainer: React.FCC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <RouteShell title={title}>
      <NavigationMenu bordered>
        <NavigationItem
          className={'flex-1 lg:flex-none'}
          link={{ path: '/installer-scheduler/create-job', label: 'Create Job' }}
          key={'create-job'}
        />
        <NavigationItem
          className={'flex-1 lg:flex-none'}
          link={{ path: '/installer-scheduler/edit-job', label: 'Edit Job' }}
          key={'edit-job'}
        />
        <NavigationItem
          className={'flex-1 lg:flex-none'}
          link={{ path: '/installer-scheduler/completion-report', label: 'Completion Report' }}
          key={'completion-report'}
        />
      </NavigationMenu>
      <div className={'mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-y-0 lg:space-x-8'}>{children}</div>
    </RouteShell>
  )
};

export default InstallerSchedulerPageContainer;
