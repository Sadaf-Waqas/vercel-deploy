import dynamic from 'next/dynamic';

import { useAuth } from 'reactfire';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useUserSession } from '~/core/hooks/use-user-session';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

import SiteNavigation from './SiteNavigation';
import ProfileDropdown from './ProfileDropdown';

const DarkModeToggle = dynamic(() => import('~/components/DarkModeToggle'), {
  ssr: false,
});

import configuration from '~/configuration';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const auth = useAuth();
  const userSession = useUserSession();

  const signOutRequested = () => auth.signOut();

  return (
    <div className={`w-full ${fixed ? fixedClassName : ''}`}>
      <Container>
        <div className="flex py-1.5 px-1 items-center border-b border-gray-50 dark:border-dark-800/50 justify-between">
          <div className={'w-4/12'}>
            <Logo />
          </div>

          <div className={'w-4/12 hidden lg:flex justify-center'}>
            <SiteNavigation />
          </div>

          <div className={'flex items-center space-x-4 w-4/12 justify-end'}>
            <If condition={configuration.enableThemeSwitcher}>
              <div>
                <DarkModeToggle />
              </div>
            </If>

            <If condition={userSession?.auth} fallback={<AuthButtons />}>
              {(user) => (
                <ProfileDropdown
                  user={user}
                  signOutRequested={signOutRequested}
                />
              )}
            </If>

            <div className={'flex lg:hidden'}>
              <SiteNavigation />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  return (
    <div className={'hidden space-x-2 lg:flex'}>
      <Button round variant={'ghost'} href={configuration.paths.signIn}>
        <span>Sign In</span>
      </Button>

      <Button round href={configuration.paths.signUp}>
        <span className={'flex items-center space-x-2'}>
          <span>Sign Up</span>
          <ChevronRightIcon className={'h-4'} />
        </span>
      </Button>
    </div>
  );
}

export default SiteHeader;
