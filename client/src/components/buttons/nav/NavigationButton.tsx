import { useNavigate } from 'react-router-dom';

interface NavigationButton {
  toRoute: string;
  buttonText: string;
  className?: string;
}

export const NavigationButton = ({
  toRoute,
  buttonText,
  className,
  ...props
}: NavigationButton) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(toRoute);
  };

  return (
    <button onClick={handleClick} className={className} {...props} style={{ padding: '1rem 2rem' }}>
      {buttonText}
    </button>
  );
};
