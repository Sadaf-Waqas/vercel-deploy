import React from "react";
import { deflate } from "zlib";
import Heading from "~/core/ui/Heading";
import If from "~/core/ui/If";

const InstallersTile: React.FCC<{
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

      <div>
        {children}
      </div>
    </div>
  )
}

export default InstallersTile;