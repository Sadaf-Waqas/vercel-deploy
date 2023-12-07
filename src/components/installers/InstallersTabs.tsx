import { useRouter } from "next/router";
import NavigationMenu from "~/core/ui/Navigation/NavigationMenu";
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const InstallersTabs = () => {
  const router = useRouter();
  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

  const getPath = (path: string): string => {
    return `/installers/${router.query.location}/${path}`;
  }

  return (
    <>
      <div className={'hidden w-[12rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem className={itemClassName} link={{
            path: getPath('property'),
            label: 'installers:property',
          }} />
          <NavigationItem className={itemClassName} link={{
            path: getPath('apply'),
            label: 'installers:apply',
          }} />
          <NavigationItem className={itemClassName} link={{
            path: getPath('leave'),
            label: 'installers:leave',
          }} />
        </NavigationMenu>
      </div>
    </>
  )

}

export default InstallersTabs;