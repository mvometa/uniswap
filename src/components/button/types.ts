export type ButtonProps = {
  type: 'button' | 'submit';
  text?: string;
  isDisabled?: boolean;
  link?: string;
  onPointerDown?: ()=>void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
