import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface FsUnderlineProps {
  isEllipsis?: boolean;
}

const FuelUnderline: React.FC<FsUnderlineProps> = ({ isEllipsis = true, children }) => {
  const [domId, setDomId] = useState<any>(Number(Math.random().toString().substr(3, 9) + Date.now()).toString(36));
  const [isToolTip, setIsToolTip] = useState<boolean>(false);
  let sw = 0;
  let cw = 0;
  if (document.getElementById(domId)!) {
    const { scrollWidth, clientWidth } = document.getElementById(domId)!;
    sw = scrollWidth;
    cw = clientWidth;
  }

  useEffect(() => {
    // 如果超出长度则需要显示...，切增加Tooltip
    if (document.getElementById(domId)!) {
      const { scrollWidth, clientWidth } = document.getElementById(domId)!;
      if (scrollWidth > clientWidth) {
        setIsToolTip(true);
      } else {
        setIsToolTip(false);
      }
    }
  }, [children, sw, cw]);

  return isEllipsis ? (
    <div id={domId} className="fs-underline fs-underline-ellipsis">
      {isToolTip ? (
        <Tooltip placement="topLeft" title={children}>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </div>
  ) : (
    <div id={domId} className="fs-underline">
      {children}
    </div>
  );
};

export default FuelUnderline;
