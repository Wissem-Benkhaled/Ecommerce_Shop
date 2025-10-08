import { Box, Container, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    // <FooterWrapper className="footer-wrapper">
    //   <Box
    //     pb={4}
    //     display={{ xs: 'block'}}
    //     alignItems="center"
    //     textAlign="center"
    //     justifyContent="space-between"
    //   >
    //     <Box>
    //       <Typography variant="subtitle1">
    //         &copy; 2025- Application / All Rights Reserved.   Designed by Wissem BEN
    //         KHALED 
    //       </Typography>
    //     </Box>
    //   </Box>
    // </FooterWrapper>
    <FooterWrapper
      className="footer-wrapper"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'transparent', // ou la couleur de ton footer
        zIndex: 1000,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',


      }}
    >
      <Box
        pb={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">
          &copy; 2025 - Application / All Rights Reserved. Designed by Wissem BEN KHALED
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
