import React, { FC, ReactNode } from "react";

import styles from "./Pane.css";

interface IProps {
  title: string;
  icons?: ReactNode;
  flex?: string;
}

const Pane: FC<IProps> = ({ title, flex = "1", children, icons }) => (
  <div className={styles["pane"]} style={{ flex }}>
    <div className={styles["pane-title-bar"]}>
      <div className={styles["pane-title"]}>{title}</div>
      {icons && <div className={styles["pane-icons"]}>{icons}</div>}
    </div>
    <div className={styles["pane-main"]}>{children}</div>
  </div>
);

export { Pane };
