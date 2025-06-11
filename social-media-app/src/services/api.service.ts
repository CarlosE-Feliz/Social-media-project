interface ApiResponse<T> {
  data: {
    [key: string]: T[];
  };
}

export const getData = async <T>(endpoint: string, resourceKey: string): Promise<T[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json() as ApiResponse<T>;
    return data.data[resourceKey] || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};