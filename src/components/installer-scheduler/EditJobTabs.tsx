import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationMenu';

const links = {
  Property: {
    path: '/installer-scheduler/edit-job',
    label: 'installerScheduler:propertyDetails',
  },
  Job: {
    path: '/installer-scheduler/edit-job/details',
    label: 'installerScheduler:jobDetails',
  },
  Timeline: {
    path: '/installer-scheduler/edit-job/timeline',
    label: 'installerScheduler:timeline',
  },
  AboutInstaller: {
    path: '/installer-scheduler/edit-job/about-installer',
    label: 'jobs:aboutInstaller',
  },
};

const EditJobTabs = () => {
  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

  return (
    <>
      <div className={'hidden w-[12rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem className={itemClassName} link={links.Property} depth={0} />
          <NavigationItem className={itemClassName} link={links.Job} />
          <NavigationItem className={itemClassName} link={links.Timeline} />
          <NavigationItem className={itemClassName} link={links.AboutInstaller} />
        </NavigationMenu>
      </div>

      <div className={'block w-full lg:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default EditJobTabs;
