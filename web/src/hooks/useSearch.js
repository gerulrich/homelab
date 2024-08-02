import { useEffect, useState } from "react";
import axios from '@app/services/homelab'
import useDebounce from './useDebounce';
import useUrlSearchParams from './useUrlSearchParams';

export const useSearch = (url) => {
  const [searchParams, updateSearchParams] = useUrlSearchParams();
  const { q, page, size } = searchParams;
  const [data, setData] = useState({items: [], pagination: { total: (page+1)*size }});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const debouncedSearch = useDebounce(q, 500);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, { params: { q: debouncedSearch, offset: page*size, limit: size }});
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearch, page, size]);

  const setSearch = (newSearch) => updateSearchParams({ q: newSearch, page: 0 });
  const setPage   = (newPage)   => updateSearchParams({ page: newPage });
  const setSize   = (newSize)   => updateSearchParams({ size: newSize, page: 0 });

  return {
    data,
    setData,
    search: q,
    setSearch,
    page,
    setPage,
    size,
    setSize,
    loading,
    setError,
    error,
  };
}
