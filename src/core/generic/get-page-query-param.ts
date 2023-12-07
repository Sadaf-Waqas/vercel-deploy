function getPageFromQueryParam(page: Maybe<string>) {
  const pageInt = parseInt(page || '1', 10);

  if (isNaN(pageInt)) {
    return 1;
  }

  return pageInt;
}

export default getPageFromQueryParam;
