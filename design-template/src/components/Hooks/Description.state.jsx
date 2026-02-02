import { useMemo, useState } from "react";

const useDescriptionState = () => {
  const [descriptionTitle, setDescriptionTitle] = useState("About Our Company");
  const [descriptionDesc, setDescriptionDesc] = useState(
    "We are dedicated to delivering innovative solutions and exceptional service to help your business thrive in a dynamic world.",
  );
  const descriptionState = useMemo(
    () => ({
      descriptionTitle,
      descriptionDesc,
      setDescriptionTitle,
      setDescriptionDesc,
    }),
    [descriptionTitle, descriptionDesc],
  );
  return descriptionState;
};
export default useDescriptionState;
