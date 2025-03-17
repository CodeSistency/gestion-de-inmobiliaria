"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchClientFunc } from "../../fetchClient";

export const useQueryWithFetchHook = <T>({
	key,
	url,
	enabled = true,
	staleTime = 1000,
	queryParams = {},
	effect = [],
  }: {
	key: string;
	url: string;
	enabled?: boolean;
	staleTime?: number;
	queryParams?: Record<string, any>;
	effect?: any[];
  }) => {
	const getData = async () => {
	const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'; // Fallback for SSR/testing
    const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    const urlWithParams = new URL(absoluteUrl);

    Object.entries(queryParams).forEach(([key, value]) => {
      urlWithParams.searchParams.append(key, JSON.stringify(value));
    });

    return fetchClientFunc<T>({ 
      method: 'GET', 
      url: urlWithParams.toString(), 
      cache: 'no-cache' 
    });
  };
  
	return useQuery<T, Error>({
	  queryKey: [`${key}Get`, ...effect],
	  queryFn: getData,
	  refetchOnWindowFocus: false,
	  enabled,
	  staleTime,
	});
  };
