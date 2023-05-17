import { useCallback, useState } from "react";

export function useForm<T>(inicialData?: T) {
  const [data, setData] = useState(inicialData ?? ({} as T));

  const changeData = useCallback((data: T) => {
    setData(data);
  }, []);

  const changeAttribute = useCallback(
    (attribute: keyof Omit<T, "id">, fn?: Function) => (valueOrEvent: any) => {
      const value = valueOrEvent?.target?.value ?? valueOrEvent;
      setData({ ...data, [attribute]: fn?.(value) ?? value });
    },
    [data]
  );

  return {
    data,
    changeAttribute,
    changeData,
  };
}
