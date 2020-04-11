import React from "react";

import css from "./HorizontalPanes.css";

const HorizontalPanes: React.FC = ({ children }) => (
  <div className={css.horizontalPanes}>{children}</div>
);

export { HorizontalPanes };
