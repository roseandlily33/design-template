import { useState, useMemo } from "react";
const useTestimonialState = () => {
  const [testimonialQuote, setTestimonialQuote] = useState(
    "Working with this company was a fantastic experience. Their team went above and beyond to deliver results.",
  );
  const [testimonialAuthor, setTestimonialAuthor] = useState(
    "— Jennie J., CEO of Jenn Corp",
  );
  const testimonialState = useMemo(
    () => ({
      testimonialQuote,
      setTestimonialQuote,
      testimonialAuthor,
      setTestimonialAuthor,
    }),
    [testimonialQuote, testimonialAuthor],
  );
  return testimonialState;
};
export default useTestimonialState;
