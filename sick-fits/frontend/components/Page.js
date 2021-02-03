import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h1>I'm the page component</h1>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
