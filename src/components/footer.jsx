// import React from 'react';

// const Footer = () => {
//   const footerStyle = {
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//   };

//   return (
//     <footer className="bg-light text-center text-lg-start">
//       <div className="text-center p-3" style={footerStyle}>
//         © 2023 Copyright:
//         <a className="text-dark" href="https://github.com/cakajervisa">Ervisa</a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  };

  return (
    <footer className="bg-light text-center text-lg-start" style={footerStyle}>
      <div className="text-center p-3">
        © 2023 Copyright:
        <a className="text-dark" href="https://github.com/cakajervisa">Ervisa</a>
      </div>
    </footer>
  );
};

export default Footer;

