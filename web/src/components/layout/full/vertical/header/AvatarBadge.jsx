import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge, {
    shouldForwardProp: (prop) => prop !== "online"
})(({ theme, online = true }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: online ? '#44b700' : '#b70900',
        color: online ? '#44b700' : '#b70900',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const AvatarBadge = ({ children }) => {
    const isConnected = useSelector((state) => state.websocket.socket.isConnected);
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            online={isConnected}>
            {children}
        </StyledBadge>
    )
}
