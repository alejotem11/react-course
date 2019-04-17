export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues // Overwriting props of the oldObject
  };
};