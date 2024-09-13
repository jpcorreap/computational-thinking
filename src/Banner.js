import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import robotImg from './assets/banner_robot.png'

const Banner = () => (
    <Grid
      item
      xs={12}
    >
      <Paper
        sx={{
          position: 'relative',
          color: '#000',
          mb: 4,
          background: "rgb(255,255,255)",
          background: "linear-gradient(0deg, rgba(255,255,255,1) 25%, rgba(180,241,253,1) 100%)"
        }}
        variant='outlined'
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
        <Grid container>
          <Grid item xs={12} sm={2} style={{ padding: 20 }}>
            <img src={robotImg} alt={"post.imageText"} width={"100%"} />
          </Grid>
          <Grid item xs={12} sm={7} style={{ padding: 20 }}>
            <Box>
              <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                {"¿Máquina o humano?"}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {"¿Puedes identificar cuál escrito fue creado por una inteligencia artificial?"}
              </Typography>
              <Typography variant="p" color="inherit" paragraph>
                {"El objetivo de este experimento es que selecciones cuál de los textos crees que fue escrito por una inteligencia artificial y cuál fue escrito por un humano. Al final, te pediremos una breve retroalimentación de qué te pareció la actividad."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
);

export default Banner;
