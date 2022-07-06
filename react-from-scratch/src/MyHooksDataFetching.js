import React, {useEffect, useState} from "react";
import 'regenerator-runtime/runtime';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetch(url).then(resp => Promise.resolve(resp.text()));
        setData(result);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url]);

  return [{data, isLoading, isError}, setUrl];
}

function MyHooksDataFetching() {

  const [{data, isLoading, isError}, doFetch] = useDataApi('http://localhost:8080/hello', null);

  return (
    <>
      {isLoading && <h1>Loading ...</h1>}
      <h1>{data}</h1>
    </>
  )
}

export default MyHooksDataFetching;
