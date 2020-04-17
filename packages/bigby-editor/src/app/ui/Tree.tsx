import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React, { FC, useState } from "react";
import css from "./Tree.css";

const Tree: FC = (props) => <>{props.children}</>;

const TreeItem: FC<{
  title: string;
  icon?: string;
  highlighted?: boolean;
  onSelect?: Function;
  onDoubleClick?: Function;
}> = ({ title, icon, highlighted, onSelect, children, onDoubleClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleDoubleClick = () => {
    if (onDoubleClick) onDoubleClick();
  };

  return (
    <div className={css.tree}>
      <div className={classnames(css.treeItem, highlighted && css.highlighted)}>
        <div
          className={css.treeItemCollapser}
          onClick={() => setCollapsed((c) => !c)}
        >
          {children && (
            <span>
              <FontAwesomeIcon icon={collapsed ? faCaretRight : faCaretDown} />
            </span>
          )}
        </div>
        <div
          className={css.treeItemIcon}
          onDoubleClick={() => handleDoubleClick()}
          onClick={() => onSelect()}
        >
          {icon}
        </div>
        <div
          className={css.treeItemTitle}
          onDoubleClick={() => handleDoubleClick()}
          onClick={() => onSelect()}
        >
          {title}
        </div>
      </div>
      {!collapsed && <div className={css.treeItemChildren}>{children}</div>}
    </div>
  );
};

export { Tree, TreeItem };
