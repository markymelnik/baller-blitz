import { useNavigate } from 'react-router-dom';

interface NavigateToButtonCreator {
  toRoute: string;
  buttonText: string;
  className?: string;
}

export const NavigateToButtonCreator = ({
  toRoute,
  buttonText,
  className,
  ...props
}: NavigateToButtonCreator) => {
  const navigate = useNavigate();
  const delay: number = 125;
  
  const handleClick = () => {

    setTimeout(() => {
      navigate(toRoute);
    }, delay);
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {buttonText}
    </button>
  );
};
