import { ThreeCircles } from 'react-loader-spinner';
import css from '../styles/Loader.module.css';

export const Loader = () => {
  return (
    <ThreeCircles
      className={css.loader}
      visible={true}
      width="auto"
      color="#0066CC"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
