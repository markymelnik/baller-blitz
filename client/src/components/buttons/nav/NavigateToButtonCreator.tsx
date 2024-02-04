import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';

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
  const delayNavigate = useDelayNavigate();
  
  const handleClick = () => {
    delayNavigate(toRoute);
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {buttonText}
    </button>
  );
};
