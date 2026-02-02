import { useState, useMemo } from "react";

const useHeroImgState = () => {
    const [heroTitle, setHeroTitle] = useState("ABC Company");
    const [heroSubtitle, setHeroSubtitle] = useState("Your success is our priority");

    // Memoize the state object so it only changes when state changes
    const heroImgState = useMemo(() => ({
        heroTitle,
        setHeroTitle,
        heroSubtitle,
        setHeroSubtitle,
    }), [heroTitle, heroSubtitle]);

    return heroImgState;
};

export default useHeroImgState;