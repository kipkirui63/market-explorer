import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    // Special handling for auth endpoints - they get extra retries
    const isAuthRequest = url.includes('/api/login') || url.includes('/api/register') || url.includes('/api/user');
    const maxRetries = isAuthRequest ? 2 : 0;
    let retries = 0;
    let lastError: Error | null = null;
    
    while (retries <= maxRetries) {
      try {
        // Update URL to point to Django backend
        const apiUrl = url.startsWith('/api') ? `http://localhost:8000${url}` : url;
        const res = await fetch(apiUrl, {
          method,
          headers: {
            ...(data ? { "Content-Type": "application/json" } : {}),
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest", // Helps identify AJAX requests
          },
          body: data ? JSON.stringify(data) : undefined,
          credentials: "include",
          // Use a cache-busting query parameter for auth requests when retrying
          ...(retries > 0 && { cache: 'no-store' })
        });

        // For auth endpoints during production builds, clone the response before reading
        // This preserves the response for later JSON parsing
        if (isAuthRequest) {
          const clonedRes = res.clone();
          
          // Check content type first
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            // Try to get the text to see what's being returned
            const text = await res.text();
            
            if (text.includes('<!DOCTYPE html>') || text.includes('<html>')) {
              // If we got HTML instead of JSON, retry or throw a clearer error
              if (retries < maxRetries) {
                console.warn(`Received HTML instead of JSON, retrying (${retries + 1}/${maxRetries})...`);
                retries++;
                await new Promise(r => setTimeout(r, 500)); // Add a small delay before retrying
                continue;
              }
              throw new Error('Authentication service temporarily unavailable. Please try again later.');
            }
            
            throw new Error('Server returned invalid response format. Please try again later.');
          }
          
          // Check for error status codes and handle them appropriately
          if (!res.ok) {
            try {
              const errorData = await clonedRes.json();
              throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
            } catch (jsonError) {
              throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
          }
          
          return clonedRes;
        }
        
        // Regular non-auth endpoint handling
        if (!res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && !contentType.includes('application/json')) {
            throw new Error('Server returned invalid response format. Please try again later.');
          } else {
            try {
              const errorData = await res.json();
              throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
            } catch (jsonError) {
              throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
          }
        }
        
        return res;
      } catch (error) {
        lastError = error as Error;
        if (retries >= maxRetries) break;
        retries++;
        await new Promise(r => setTimeout(r, 500)); // Add a small delay before retrying
      }
    }
    
    // If we've exhausted retries, throw the last error
    if (lastError) throw lastError;
    
    // This should never happen, but TypeScript wants a return value here
    throw new Error('Unknown error occurred during API request');
  } catch (error) {
    console.error(`API request error (${method} ${url}):`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Update URL to point to Django backend  
      const url = queryKey[0] as string;
      const apiUrl = url.startsWith('/api') ? `http://localhost:8000${url}` : url;
      const res = await fetch(apiUrl, {
        credentials: "include",
        headers: {
          "Accept": "application/json"
        }
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      
      // Check if the response is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      } else {
        const text = await res.text();
        throw new Error("Expected JSON response but got: " + 
          (text.length > 100 ? text.substring(0, 100) + "..." : text));
      }
    } catch (error) {
      console.error(`Query error (${queryKey[0]}):`, error);
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
