import React from 'react';
import RouteShell from '../RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const locations = [
  {
    path: '/installers/denver',
    label: 'Denver',
  },
  {
    path: '/installers/phoenix',
    label: 'Phoenix',
  },
  {
    path: '/installers/add-location',
    label: 'Add Location',
  }
];

const InstallersPageContainer: React.FCC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <RouteShell title={title}>
      <NavigationMenu bordered>
        {locations.map((location) => (
          <NavigationItem
            className={`flex-1 lg:flex-none`}
            link={location}
            key={location.path}
          />
        ))}
      </NavigationMenu>
      <div className={'mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-y-0 lg:space-x-8'}>{children}</div>
    </RouteShell>
  )
}

export default InstallersPageContainer;