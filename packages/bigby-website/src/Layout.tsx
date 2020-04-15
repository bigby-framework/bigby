import css from "./Layout.module.css";

export default ({ children }) => (
  <div className={css.container}>{children}</div>
);
