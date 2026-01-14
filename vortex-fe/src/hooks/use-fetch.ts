import type { BaseResponse } from '@/model/base.api.model';
import { toast } from "sonner"; // Shadcn hook
import { useState, useEffect, useCallback } from 'react';

export function useFetch<T>(
  apiCall: () => Promise<BaseResponse<T>>,
  options = { immediate: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(options.immediate);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiCall();
      setData(result.data);
      if (result.success) toast.success(result.message);
      toast.error(result.message)
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiCall, toast]);

  useEffect(() => {
    if (options.immediate) execute();
  }, [execute, options.immediate]);

  return { data, loading, refresh: execute };
}
