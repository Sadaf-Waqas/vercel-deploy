import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';

const InstallerSchedulerTile: React.FCC<{
  heading?: string | React.ReactNode;
  subHeading?: string | React.ReactNode;
  actions?: React.ReactNode;
}> = ({ children, heading, subHeading, actions }) => {
  return (
    <div className={'flex flex-col space-y-6'}>
      <div className={'flex flex-col space-y-1'}>
        <div
          className={
            'flex flex-col space-y-4 lg:flex-row lg:space-y-0' +
            ' lg:items-center lg:justify-between'
          }
        >
          <If condition={heading}>
            <Heading type={4}>
              <span className={'font-medium'}>{heading}</span>
            </Heading>
          </If>

          <If condition={actions}>
            <div>{actions}</div>
          </If>
        </div>

        <If condition={subHeading}>
          <p className={'text-gray-500 dark:text-gray-400'}>{subHeading}</p>
        </If>
      </div>

      <div
        className={
          'rounded-lg border border-gray-50 p-2.5 dark:border-dark-800 lg:p-6 shadow-sm'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default InstallerSchedulerTile;
