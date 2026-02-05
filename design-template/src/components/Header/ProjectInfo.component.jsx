import React, { useState } from "react";
import Cards from "@/components/Cards/Cards.component";
import Layouts from "@/components/Layouts/Layouts.component";
import TertiaryButtonMain from "../../app/buttons/TertiaryButton/TertiaryButton.component";
const ProjectInfo = ({ selected, selectedFontSet, radius, heroImgUrl, spacingBase, spacingUnit, primaryProps, secondaryProps, tertiaryProps }) => {
  const [cardsOpen, setCardsOpen] = useState(false);
  const [layoutsOpen, setLayoutsOpen] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "flex-end",
          padding: "12px 32px 0 32px",
        }}
      >
        <TertiaryButtonMain
          functionName={() => setCardsOpen(true)}
          span="Cards"
        />
        <TertiaryButtonMain
          functionName={() => setLayoutsOpen(true)}
          span="Layouts"
        />
      </div>
      {cardsOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setCardsOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px #0002",
              padding: 32,
              maxWidth: 1200,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TertiaryButtonMain
              span="Close"
              functionName={() => setCardsOpen(false)}
            />
            <Cards
              colours={selected}
              fonts={selectedFontSet}
              borderRadius={radius}
              heroImgUrl={heroImgUrl}
              spacingBase={spacingBase}
              spacingUnit={spacingUnit}
              primaryButtonProps={primaryProps}
              secondaryButtonProps={secondaryProps}
              tertiaryButtonProps={tertiaryProps}
            />
          </div>
        </div>
      )}

      {layoutsOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLayoutsOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px #0002",
              padding: 32,
              maxWidth: 1200,
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TertiaryButtonMain
              functionName={() => setLayoutsOpen(false)}
              span="Close"
            />
            <Layouts
              colours={selected}
              fonts={selectedFontSet}
              borderRadius={radius}
              heroImgUrl={heroImgUrl}
              spacingBase={spacingBase}
              spacingUnit={spacingUnit}
              primaryButtonProps={primaryProps}
              secondaryButtonProps={secondaryProps}
              tertiaryButtonProps={tertiaryProps}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectInfo;
