import React from 'react';
import RouteShell from '~/components/RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const locations = [
  {
    path: '/jobs/denver',
    label: 'Denver',
  },
  {
    path: '/jobs/phoenix',
    label: 'Phoenix',
  },
];

const JobsPageContainer: React.FCC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <RouteShell title={title}>
      <NavigationMenu bordered>
        {locations.map((location) => (
          <NavigationItem
            className={'flex-1 lg:flex-none'}
            link={location}
            key={location.path}
          />
        ))}
      </NavigationMenu>
      <div>
        {children}
      </div>
    </RouteShell>
  )
};

export default JobsPageContainer;