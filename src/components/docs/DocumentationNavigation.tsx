import { useRouter } from 'next/router';
import Link from 'next/link';

import { DocsTree } from '~/core/docs/types/docs-tree';
import Heading from '~/core/ui/Heading';

export default function DocumentationNavigation({
  data,
}: React.PropsWithChildren<{
  data: DocsTree[];
}>) {
  const router = useRouter();
  const path = router.query.page;

  return (
    <div className={'flex h-full flex-col space-y-4 flex-1'}>
      {data.map(({ directory, pages }) => {
        return (
          <div
            className={'mt-6 sticky inset-0 overflow-y-auto last-child:pb-24'}
            key={directory.title}
          >
            <div className={'flex flex-col w-full'}>
              <div className={'pb-1'}>
                <Heading type={6}>
                  <span
                    className={
                      'text-sm font-bold text-gray-700 dark:text-gray-200'
                    }
                  >
                    {directory.title}
                  </span>
                </Heading>
              </div>

              {pages.map((page) => {
                const selected = path === page.slug;
                const href = `/docs/${page.slug}`;

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex dark:active:bg-dark-800 active:bg-gray-100
                    text-sm text-gray-500 dark:text-gray-400 hover:text-current rounded-md
                    py-1.5 px-2 transition-colors duration-300 w-full ${
                      selected
                        ? `font-semibold text-current dark:text-primary-500 bg-primary-500/10`
                        : `hover:border-l-primary-400 dark:hover:text-white
                    dark:border-l-dark-800 font-medium border-l-gray-50`
                    }`}
                  >
                    <span>{page.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
