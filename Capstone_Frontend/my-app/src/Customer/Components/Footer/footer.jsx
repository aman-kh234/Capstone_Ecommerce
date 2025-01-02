import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2C2C2C', color: '#FFFFFF', padding: '40px 0', marginTop: '40px' }}>
      <Box className="container mx-auto" style={{ maxWidth: '1200px', padding: '0 20px' }}>
        {/* Footer Content */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" marginBottom="40px">

          {/* Column 1: Quick Links */}
          <Box width={{ xs: '100%', sm: '30%' }} marginBottom={{ xs: '20px', sm: '0' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '16px' }}>Quick Links</Typography>
            <Box>
              <Link href="#" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px', '&:hover': { color: '#FF6F61' } }}>Home</Link>
              <Link href="#" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px', '&:hover': { color: '#FF6F61' } }}>Shop</Link>
              <Link href="#" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px', '&:hover': { color: '#FF6F61' } }}>Contact Us</Link>
              <Link href="#" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px', '&:hover': { color: '#FF6F61' } }}>FAQ</Link>
            </Box>
          </Box>

          {/* Column 2: Contact */}
          <Box width={{ xs: '100%', sm: '30%' }} marginBottom={{ xs: '20px', sm: '0' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '16px' }}>Contact</Typography>
            <Typography style={{ marginBottom: '8px' }}>Email: support@trendly.com</Typography>
            <Typography style={{ marginBottom: '8px' }}>Phone: +123 456 7890</Typography>
            <Typography>Address: 123 Trendly St, City, Country</Typography>
          </Box>

          {/* Column 3: Social Media */}
          <Box width={{ xs: '100%', sm: '30%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '16px' }}>Follow Us</Typography>
            <Box display="flex" justifyContent="space-between">
              <Link href="#" target="_blank">
                <Facebook style={{ color: '#FFFFFF', '&:hover': { color: '#FF6F61' } }} />
              </Link>
              <Link href="#" target="_blank">
                <Twitter style={{ color: '#FFFFFF', '&:hover': { color: '#FF6F61' } }} />
              </Link>
              <Link href="#" target="_blank">
                <Instagram style={{ color: '#FFFFFF', '&:hover': { color: '#FF6F61' } }} />
              </Link>
              <Link href="#" target="_blank">
                <LinkedIn style={{ color: '#FFFFFF', '&:hover': { color: '#FF6F61' } }} />
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box textAlign="center">
          <Typography variant="body2" style={{ marginBottom: '16px' }}>
            &copy; {new Date().getFullYear()} Trendly. All rights reserved.
          </Typography>
          <Button
            href="#"
            variant="outlined"
            style={{
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              '&:hover': { borderColor: '#FF6F61', color: '#FF6F61' }
            }}
          >
            Privacy Policy
          </Button>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
