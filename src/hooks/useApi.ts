import { useState, useEffect, DependencyList } from 'react';

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetcher()
      .then(res => setData(res))
      .catch((err: unknown) => {
        console.error(err);
        setError((err as Error).message || 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, deps);

  return { data, loading, error };
}
