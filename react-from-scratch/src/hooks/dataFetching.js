import {useEffect, useReducer, useState} from "react";

const DOMAIN = 'http://localhost:8080'
export const helloApi = () => {
  return fetch(`${DOMAIN}/hello`).then(resp => resp.json());
}

export const byeApi = () => {
  return fetch(`${DOMAIN}/bye`).then(resp => resp.json());
}

export const greetApi = () => {
  return fetch(`${DOMAIN}/greet2`).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    /*
    - We expect a json error object from the server
    - We want the promise to reject any future calls if available
     */
    return resp.json().then(resp => Promise.reject(resp));
  });
}

/*
dataFetchReducer
* reducer is used with useReducer hook in useDataApi and useDataApi2
* reducer is used to update state of response from fetch
 */
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      console.log('[dataFetchReducer] FETCH_INIT', state, action);
      return {...state, isLoading: true, isError: false};
    case 'FETCH_SUCCESS':
      return {...state, data: action.payload, isLoading: false, isError: false};
    case 'FETCH_ERROR':
      return {...state, isError: true, isLoading: false, data: action.payload};
    default:
      throw new Error();
  }
}

/*
useDataApi
* custom hook to fetch data
* hook reacts to changes in initial url
* uses useReducer to update state of the response from fetch
 */
export const useDataApi = (initialUrl, initialData) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {isLoading: false, isError: false, data: initialData});
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});
      try {
        const result = await fetch(`${DOMAIN}/${url}`).then(resp => resp.json());
        if (!didCancel)
          dispatch({type: 'FETCH_SUCCESS', payload: result});
      } catch (error) {
        if (!didCancel)
          dispatch({type: 'FETCH_ERROR'});
      }
    }

    fetchData();
  }, [url]);

  return [state, setUrl];
}

/*
useDataApi2
* Same as above except it takes an apiFunction that returns a promise
* reacts to changes in API promise
* apiFunction - must be a function that returns a promise for example it could be used like in a component
  const [state, setApi] = useDataApi2(() => helloApi()) // where helloApi returns a promise
  // to update api ex:
  setApi(() => byeApi())

 */
export const useDataApi2 = (apiFunction) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {isLoading: false, isError: false, data: null});
  const [api, setApi] = useState(apiFunction);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});
      try {
        const result = await api;
        dispatch({type: 'FETCH_SUCCESS', payload: result});
      } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error});
      }
    }
    if (api)
      fetchData();
  }, [api]);

  return [state, setApi];
}

/*
useDataApi3
* same as above except it doesn't use useReducer hook
 */
export const useDataApi3 = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        const result = await fetch(`${DOMAIN}/${initialUrl}`).then(resp => resp.json());
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url])

  return [{data, isLoading, isError}, setUrl];
}
