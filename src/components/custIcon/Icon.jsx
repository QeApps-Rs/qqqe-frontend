import React, { MouseEventHandler, KeyboardEventHandler } from 'react';
import PropTypes from 'prop-types';

import svg from './svgs';
import './icons.css';


const Icon = React.forwardRef(
  ({ className, onClick, onKeyDown, type, title }, ref) => {
    const typeValue = svg.find((o) => o.name === (type ?? ''));
    return (
      <div>
        {typeValue && (
          <i
            className={`custIcon custIcon-${typeValue.name} ${className ?? ''}`}
            dangerouslySetInnerHTML={{ __html: typeValue.code }}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
            title={title ?? ' '}
            ref={ref}
            aria-label="icons"
          />
        )}
      </div>
    );
  }
);

export default Icon;

