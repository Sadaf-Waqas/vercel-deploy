import Layout from '~/core/ui/Layout';
import Logo from '~/core/ui/Logo';
import Heading from '~/core/ui/Heading';

const AuthPageLayout: React.FCC<{
  heading: string | React.ReactNode;
}> = ({ children, heading }) => {
  return (
    <Layout>
      <div
        className={
          'flex h-screen flex-col items-center justify-center space-y-4' +
          ' md:space-y-8 lg:space-y-16 lg:bg-gray-50 dark:lg:bg-background' +
          ' animate-in fade-in slide-in-from-top-8 duration-1000'
        }
      >
        <Logo />

        <div
          className={`flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent bg-white px-2 py-1 dark:bg-transparent md:w-8/12 md:border md:px-8 md:py-6 lg:w-5/12 lg:px-6 lg:shadow-2xl dark:lg:border-dark-800 lg:dark:bg-background dark:lg:shadow-[0_0_1200px_0] lg:dark:shadow-primary/30 xl:w-4/12 2xl:w-3/12`}
        >
          <div>
            <Heading type={4}>{heading}</Heading>
          </div>

          {children}
        </div>
      </div>
    </Layout>
  );
};

export default AuthPageLayout;
