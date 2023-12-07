import { Trans } from 'next-i18next';

import NAVIGATION_CONFIG from '../../../navigation.config';
import { SidebarItem } from '~/core/ui/Sidebar';

function AppSidebarNavigation() {
  return (
    <div className={'flex flex-col space-y-1.5'}>
      {NAVIGATION_CONFIG.items.map((item) => {
        return (
          <SidebarItem key={item.path} path={item.path} Icon={item.Icon}>
            <Trans i18nKey={item.label} defaults={item.label} />
          </SidebarItem>
        );
      })}
    </div>
  );
}

export default AppSidebarNavigation;
