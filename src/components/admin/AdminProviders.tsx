import { useState } from 'react';
import SentryProvider from '~/components/SentryProvider';
import { SidebarContext } from '~/core/contexts/sidebar';

function AdminProviders(
  props: React.PropsWithChildren<{
    collapsed: boolean;
  }>,
) {
  const [collapsed, setCollapsed] = useState(props.collapsed);

  return (
    <SentryProvider>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        {props.children}
      </SidebarContext.Provider>
    </SentryProvider>
  );
}

export default AdminProviders;
