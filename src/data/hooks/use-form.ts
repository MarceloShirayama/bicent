import { useState } from "react";

export function useForm<T>(inicialData: T) {
  const [data, setData] = useState(inicialData);

  const changeAttribute =
    (attribute: keyof Omit<T, "id">, fn?: Function) => (valueOrEvent: any) => {
      const value = valueOrEvent?.target?.value ?? valueOrEvent;
      setData({ ...data, [attribute]: fn?.(value) ?? value });
    };

  return {
    data,
    changeAttribute,
  };
}
