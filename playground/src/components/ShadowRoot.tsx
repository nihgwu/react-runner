import React, { useEffect, useRef, useState, FC } from "react";
import { createPortal } from "react-dom";

type ShadowRootProps = JSX.IntrinsicElements["div"] & {
  styleSheets?: CSSStyleSheet[];
};

export const ShadowRoot: FC<ShadowRootProps> = ({
  children,
  styleSheets = [],
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();

  useEffect(() => {
    if (!shadowRoot) return;
    shadowRoot.adoptedStyleSheets = styleSheets;
  }, [styleSheets]);

  useEffect(() => {
    const root = ref.current?.attachShadow({ mode: "open" });
    if (root) {
      setShadowRoot(root);
      root.adoptedStyleSheets = styleSheets;
    }
  }, []);

  return (
    <div ref={ref} {...rest}>
      {shadowRoot && createPortal(children, shadowRoot as any)}
    </div>
  );
};
