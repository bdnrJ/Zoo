import React, { useState, ReactNode } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode
}

const Tooltip = ({ content, position = 'top', children }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`tooltip-container ${showTooltip ? 'show' : ''}`} onClick={() => setShowTooltip(!showTooltip)}>
      <div className={`tooltip-container-children ${showTooltip ? 'active' : ''}`}>{children}</div>
      <div className={`tooltip ${position}`}>{content}</div>
    </div>
  );
};

export default Tooltip;
