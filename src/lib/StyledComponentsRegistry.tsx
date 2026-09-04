"use client";

import { useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

type StyledComponentsRegistryProps = {
  children: ReactNode;
};

export default function StyledComponentsRegistry({
  children,
}: StyledComponentsRegistryProps) {
  const [styleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement();
    styleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styleSheet.instance}>{children}</StyleSheetManager>
  );
}
