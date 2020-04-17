import React, { FC } from "react";
import styles from "./Area.css";

const Area: FC<{ flex?: string }> = ({ children, flex = "1" }) => (
  <div className={styles.area} style={{ flex }}>
    {children}
  </div>
);

export { Area };
