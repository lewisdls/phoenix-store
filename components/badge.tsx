type BadgeProps = {
  text: string;
  className: string;
};

const Badge = ({ text, className }: BadgeProps) => (
  <span
    className={`absolute top-0 left-0 bg-white text-blue-500 text-sm px-2 py-1 m-2 rounded-sm ${className}`}
  >
    {text}
  </span>
);

export default Badge;
