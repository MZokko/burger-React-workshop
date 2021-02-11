export const updateObject = (oldObj, updatedProp) => {
  return {
    ...oldObj,
    ...updatedProp,
  };
};
