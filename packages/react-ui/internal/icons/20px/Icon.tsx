import React from 'react';
import PropTypes from 'prop-types';

import { jsStyles } from './icon.styles';

const MAP = {
  circle: '\ue001',
  baseline: '\ue003',
  warning: '\ue005',
  ok: '\ue006',
  gear: '\ue018',
  user: '\ue020',
  wait: '\ue021',
  clear: '\ue030',
  grid: '\ue03e',
  money: '\ue046',
  'help-circle': '\ue055',
  kebab: '\ue0c9',
};

export interface IconProps {
  name: keyof typeof MAP;
  color: React.CSSProperties['color'];
}

export class Icon extends React.Component<IconProps> {
  public static __KONTUR_REACT_UI__ = 'Icon20px';

  public static propTypes = {
    color: PropTypes.string,

    /**
     * Icon id.
     */
    name: PropTypes.oneOf(Object.keys(MAP)),
  };

  public static getAllNames() {
    return Object.keys(MAP);
  }

  public render() {
    const style = {
      color: this.props.color,
    };
    return (
      <span className={jsStyles.root()} style={style}>
        {MAP[this.props.name]}
      </span>
    );
  }
}
