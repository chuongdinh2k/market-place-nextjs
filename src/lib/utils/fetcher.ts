/**
 * Fetcher function for SWR
 * Handles API responses and errors
 */
export async function fetcher<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url);

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    // Try to parse the error response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error: ${response.status}`);
    } catch {
      // If parsing fails, throw a generic error with the status code
      throw new Error(`API error: ${response.status}`);
    }
  }

  // Parse and return the successful response
  return response.json();
}

/**
 * POST request fetcher for SWR
 * @param url API endpoint URL
 * @param data Request body data
 * @returns JSON response
 */
export const postFetcher = async <T, D>(
  url: string,
  { arg }: { arg: D }
): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const error = new Error(
      "An error occurred while posting the data."
    ) as Error & {
      info?: Record<string, unknown>;
      status?: number;
    };
    const info = await res.json().catch(() => ({}));
    error.info = info;
    error.status = res.status;
    throw error;
  }

  return res.json();
};
