import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '~/core/ui/Select';

const LanguageSwitcher: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    });
  }, [currentLanguage]);

  const [value, setValue] = useState(i18n.language);

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = useCallback(
    async (locale: string) => {
      setValue(locale);

      if (onChange) {
        onChange(locale);
      }

      await switchToLocale(locale);
    },
    [switchToLocale, onChange]
  );

  return (
    <Select value={value} onValueChange={languageChanged}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {locales.map((locale) => {
          const label = capitalize(languageNames.of(locale) ?? locale);

          const option = {
            value: locale,
            label,
          };

          return (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LanguageSwitcher;
