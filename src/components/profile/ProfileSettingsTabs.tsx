import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationMenu';

const links = {
  General: {
    path: '/settings/profile',
    label: 'profile:generalTab',
  },
  Authentication: {
    path: '/settings/profile/authentication',
    label: 'profile:authenticationTab',
  },
  Email: {
    path: '/settings/profile/email',
    label: 'profile:emailTab',
  },
  Password: {
    path: '/settings/profile/password',
    label: 'profile:passwordTab',
  },
  APIKeys: {
    path: '/settings/profile/api-keys',
    label: 'profile:apiKeysTab',
  },
};

const ProfileSettingsTabs = () => {
  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

  return (
    <>
      <div className={'hidden w-[12rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem
            className={itemClassName}
            link={links.General}
            depth={0}
          />

          <NavigationItem
            className={itemClassName}
            link={links.Authentication}
          />

          <NavigationItem className={itemClassName} link={links.Email} />

          <NavigationItem className={itemClassName} link={links.Password} />

          <NavigationItem className={itemClassName} link={links.APIKeys} />
        </NavigationMenu>
      </div>

      <div className={'block w-full lg:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default ProfileSettingsTabs;
