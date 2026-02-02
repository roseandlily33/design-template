import {useState, useMemo} from "react";

const useContactState = () => {
    const [contact, setContact] = useState({
      title: "Contact Us",
      desc: "We'd love to hear from you! Fill out the form below and our team will get back to you soon.",
      name: "",
      email: "",
      message: "",
    });
    const contactState = useMemo(
      () => ({
        contact,
        setContact,
      }),
      [contact],
    );
    return contactState;

}
export default useContactState;