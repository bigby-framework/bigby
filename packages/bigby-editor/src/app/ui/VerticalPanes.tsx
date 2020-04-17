import React from "react";

import css from "./VerticalPanes.css";

const VerticalPanes: React.FC = ({ children }) => (
  <div className={css.verticalPanes}>{children}</div>
);

export { VerticalPanes };
