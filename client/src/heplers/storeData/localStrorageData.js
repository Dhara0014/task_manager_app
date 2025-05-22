

export const setDataToLocal = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const getDataFromLocal = (key) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      try {
        return JSON.parse(item);
      } catch (error) {
        return item;
      }
    }
  };
  
  export const removeDataFromLocal = (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  
  export const clearStorageData = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };
  