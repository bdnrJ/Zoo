import React, { ReactNode } from 'react';

type props = {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode
}

const Tooltip = ({ content, position = 'top', children }: props) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip-container-children">{children}</div>
      <div className={`tooltip ${position}`}>{content}</div>
    </div>
  );
};

export default Tooltip;
