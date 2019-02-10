import { useEffect, useState } from "react";

export const useStore = (initialValue: any) => {
  let value = initialValue;
  let forceUpdates: any[] = [];

  return () => {
    const [, forceUpdate] = useState(initialValue);
    useEffect(() => {
      if (!forceUpdates.includes(forceUpdate)) {
        forceUpdates.push(forceUpdate);
      }
      return () => {
        forceUpdates = forceUpdates.filter(x => x !== forceUpdate);
      };
    });

    return [
      value,
      (newValue: any) => {
        value = newValue;
        forceUpdates.forEach(x => x(newValue));
      }
    ];
  };
};
