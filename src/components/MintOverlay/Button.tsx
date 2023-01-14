import { CSSProperties, FC, ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  block?: boolean;
  onClick?: () => any;
  children: ReactNode;
};
export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.button<ButtonProps>`
  padding: 0 20px;
  height: 44px;
  border: 1px solid #fff;
  font-weight: normal;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  width: ${({ block }) => (block ? '100%' : 'auto')};
  background-color: ${({ outline }) => (outline ? '#000' : '#fff')};
  color: ${({ outline }) => (outline ? '#fff' : '#000')};
  transition: all ease 0.3s;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 'pointer')};
  &:hover {
    color: #99ff66;
    border-color: ${({ outline }) => (outline ? '#99ff66' : '#fff')};
  }
`;
