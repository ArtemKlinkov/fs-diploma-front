import { useState, useEffect } from "react";

function useStorage(storage, key) {
  const [value, setValue] = useState(storage.getItem(key));

  useEffect(() => {
    if (value === null) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, value);
  }, [value, storage, key]);

  return [value, setValue];
   
}

export default useStorage;