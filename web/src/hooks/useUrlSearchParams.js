import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useUrlSearchParams = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const getSearchParams = () => {
    return {
      q: params.get('q') || '',
      page: parseInt(params.get('page')) || 0,
      size: parseInt(params.get('size')) || 10,
    };
  };

  const [searchParams, setSearchParams] = useState(getSearchParams());

  useEffect(() => {
    setSearchParams(getSearchParams());
  }, [params]);

  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(location.search);

    Object.keys(newParams).forEach((key) => {
      if (newParams[key] !== undefined) {
        updatedParams.set(key, newParams[key]);
      } else {
        updatedParams.delete(key);
      }
    });

    navigate({ search: updatedParams.toString() }, { replace: true });
  };

  return [searchParams, updateSearchParams];
};

export default useUrlSearchParams;