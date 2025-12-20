/**
 * Module Federation Type Declarations
 * Defines types for components exposed by remote micro-frontends
 */

declare module 'cv_portfolio/Header' {
  import { FC } from 'react';
  export const Header: FC;
}

declare module 'cv_portfolio/Footer' {
  import { FC } from 'react';
  export const Footer: FC;
}

declare module 'cv_portfolio/ChatWidget' {
  import { FC } from 'react';
  export const ChatWidget: FC;
}
