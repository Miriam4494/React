import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { AccessAlarm, Favorite, EmojiObjects, RestaurantMenu } from '@mui/icons-material';

const About = () => {
  return (
    <Box sx={{ padding: 6, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{ marginBottom: 4, fontWeight: 'bold', textAlign: 'center', color: '#d32f2f' }}
        >
          Discover the Joy of Cooking!
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', color: '#555', marginBottom: 5 }}
        >
          Our recipe app brings together food lovers from around the world, offering a variety of recipes
          that cater to all skill levels. Whether you're a beginner or a seasoned chef, you'll find
          inspiration, guidance, and a supportive community to elevate your cooking experience.
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={4}
              sx={{ padding: 3, textAlign: 'center', backgroundColor: '#ffebee', borderRadius: '15px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <AccessAlarm sx={{ fontSize: 50, color: '#d32f2f' }} />
              <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Quick & Easy
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Explore simple recipes that save time without compromising on taste!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={4}
              sx={{ padding: 3, textAlign: 'center', backgroundColor: '#e3f2fd', borderRadius: '15px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Favorite sx={{ fontSize: 50, color: '#d32f2f' }} />
              <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Community Picks
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Share and try the most beloved recipes curated by fellow food lovers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={4}
              sx={{ padding: 3, textAlign: 'center', backgroundColor: '#e8f5e9', borderRadius: '15px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <EmojiObjects sx={{ fontSize: 50, color: '#d32f2f' }} />
              <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Creative Cooking
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Discover unique and innovative recipes to challenge your culinary skills.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={4}
              sx={{ padding: 3, textAlign: 'center', backgroundColor: '#fff3e0', borderRadius: '15px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <RestaurantMenu sx={{ fontSize: 50, color: '#d32f2f' }} />
              <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Gourmet Dishes
              </Typography>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Elevate your home dining experience with fine dining recipes.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
