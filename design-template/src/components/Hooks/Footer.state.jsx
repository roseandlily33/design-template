import { useState, useMemo } from "react";

const useFooterState = () => {
  const [footerCopyright, setFooterCopyright] = useState(
    `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  );
  const [footerLinks, setFooterLinks] = useState([
    "Home",
    "About",
    "Contact",
    "Privacy Policy",
    "Terms & Conditions",
  ]);

  const footerState = useMemo(
    () => ({
      footerCopyright,
      setFooterCopyright,
      footerLinks,
      setFooterLinks,
    }),
    [footerCopyright, footerLinks],
  );
  return footerState;
};
export default useFooterState;
