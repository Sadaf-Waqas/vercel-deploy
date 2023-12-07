import React from 'react';

import AppSidebarNavigation from './AppSidebarNavigation';
import Sidebar from '~/core/ui/Sidebar';

const AppSidebar = () => {
  return (
    <Sidebar>
      <AppSidebarNavigation />
    </Sidebar>
  );
};

export default AppSidebar;
