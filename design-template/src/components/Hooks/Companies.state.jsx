import { useState, useMemo } from "react";

const useCompaniesState = () => {
  const [companiesTrustedText, setCompaniesTrustedText] = useState(
    "Trusted by 10+ companies",
  );
  const companiesState = useMemo(
    () => ({
      companiesTrustedText,
      setCompaniesTrustedText,
    }),
    [companiesTrustedText],
  );
  return companiesState;
};
export default useCompaniesState;
