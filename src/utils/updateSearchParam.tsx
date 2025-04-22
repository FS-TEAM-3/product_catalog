export const updateSearchParam = (
  key: string,
  value: string,
  enabled: boolean,
  setSearchParams: (params: URLSearchParams) => void,
  currentParams: URLSearchParams,
) => {
  const params = new URLSearchParams(currentParams);
  if (enabled) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  setSearchParams(params);
};
