import { useState } from "react";

export function useForm<T>(inicialData: T) {
  const [data, setData] = useState(inicialData);

  return {
    data,
    setData,
  };
}
