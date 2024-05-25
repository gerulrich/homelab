import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import DarkLogo from '@app/assets/logos/dark-logo.svg';
import LightLogo from '@app/assets/logos/light-logo.svg';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

    return (
      <LinkStyled to="/">
        {customizer.activeMode === 'dark' ? (
          <LightLogo height={customizer.TopbarHeight} />
        ) : (
          <DarkLogo height={customizer.TopbarHeight} />
        )}
      </LinkStyled>
    );
};

export default Logo;