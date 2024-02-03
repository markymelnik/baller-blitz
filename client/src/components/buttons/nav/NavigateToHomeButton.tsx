import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx"

export const NavigateToHomeButton = () => {
  return <NavigateToButtonCreator toRoute={'/'} buttonText={'Home'} className='nav-to-home-btn' />;
};
