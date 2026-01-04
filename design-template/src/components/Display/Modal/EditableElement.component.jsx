import React, { useEffect, useState } from "react";
import Modal, { EditButton } from "./Modal.component";

const EditableWithColor = ({
  children,
  palettes = [],
  initialColor,
  onSelect,
}) => {
  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handlePick = (c) => {
    setColor(c);
    if (typeof onSelect === "function") onSelect(c);
    setModalOpen(false);
  };

  // ensure there's exactly one React element child
  const child = React.Children.only(children);
  const cloned = React.cloneElement(child, {
    style: { ...(child.props.style || {}), color },
  });

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {cloned}

      <div
        style={{
          position: "absolute",
          right: 8,
          top: 4,
          pointerEvents: hover ? "auto" : "none",
        }}
      >
        <EditButton
          visible={hover && !modalOpen}
          onClick={() => {
            setModalOpen(true);
            setHover(false);
          }}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        palettes={
          Array.isArray(palettes)
            ? palettes
            : palettes && typeof palettes === "object"
            ? Object.values(palettes)
            : []
        }
        initialColor={color}
        onSelect={handlePick}
        title="Pick a color"
      />
    </div>
  );
};

export default EditableWithColor;
