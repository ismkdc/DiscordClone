import React from 'react';
import TooltipsContainer from './TooltipsContainer';

const TooltipWrapper = ({ direction, content, children }) => {
  const handleMouseEnter = element => {
    const { currentTarget: target } = element;
    const targetRect = target.getBoundingClientRect();

    let x, y;

    if (direction === 'right') {
      x = targetRect.left + targetRect.width + 8;
      y = targetRect.top + targetRect.height / 2;
    }

    if (direction === 'bottom') {
      x = targetRect.left + targetRect.width / 2;
      y = targetRect.top + targetRect.height + 8;
    }

    if (direction === 'top') {
      x = targetRect.left + targetRect.width / 2;
      y = targetRect.top - 8;
    }

    TooltipsContainer.show({
      position: { x, y },
      direction,
      content
    });
  };

  const handleMouseLeave = () => {
    TooltipsContainer.hide();
  };

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    })
  );
};

export default TooltipWrapper;
