import { useState, useMemo } from "react";

const useThreeIconState = () => {
  const [threeIcons, setThreeIcons] = useState([
    {
      label: "Fast Delivery",
      desc: "We ensure quick and reliable delivery for all your needs.",
    },
    {
      label: "Quality Service",
      desc: "Our team is dedicated to providing top-notch service every time.",
    },
    {
      label: "Support 24/7",
      desc: "We are here to help you around the clock, whenever you need us.",
    },
  ]);
  const threeIconState = useMemo(
    () => ({
      threeIcons,
      setThreeIcons,
    }),
    [threeIcons],
  );
  return threeIconState;
};
export default useThreeIconState;
