import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, TextareaAutosize } from '@mui/material';
import Banner from './Banner';

const steps = ['Presentación', 'Comparación', 'Retroalimentación'];

const iframe_urls = {
  1: {
    "A": "https://docs.google.com/document/d/e/2PACX-1vRxiiV26WiLpcX_POKP11rvW48AJJAAbX0P_fllX0mCiU4Bz4M-t9qSZTBALc70Dg/pub?embedded=true",
    "B": "https://docs.google.com/document/d/e/2PACX-1vQ04UlFyIltHjQs45SfvVYCcWQqbpMErRmkk_JfhLUPWgPQkG6lox24LjQXwKX0Lg/pub?embedded=true"
  },
  2: {
    "A": "https://docs.google.com/document/d/e/2PACX-1vS9p4Oh8lEx-eeg77TtXMEzVbk18GXeQJAnmCvSQ9aSiZnSGaIKwG04N9CjE-2gbVrLbgU8oyUEMXSU/pub?embedded=true",
    "B": "https://docs.google.com/document/d/e/2PACX-1vTMiWyzXba0_k3FblnSxnb-fEV4VHLyA5EZhtgjEGsBIBCWwjPtnDdHmfqOyDpYXc_QXNTK-JaSpuCW/pub?embedded=true"
  },
  3: {
    "A": "https://docs.google.com/document/d/e/2PACX-1vRTzsDESX6HSbm6ZSSEBNLiQzVb0h1hq9Jo-ojS4hnsbnf_oErJcXkV7riojkIjq02A0IUrTWgobnuF/pub?embedded=true",
    "B": "https://docs.google.com/document/d/e/2PACX-1vStqLxMt9CSVWZSMx4pGbV7-DXgc3FYvv0rQ9n_v8xS0FunJacytjeeY6h-la_NSP2YZlB550LQCYxs/pub?embedded=true"
  }
}


export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [userFullName, setUserFullName] = React.useState("");
  const [userAge, setUserAge] = React.useState("");
  const [userStudyArea, setUserStudyArea] = React.useState("");
  const [textType, setTextType] = React.useState(1);
  const [createdByAi, setCreatedByAi] = React.useState();

  const getIframe = React.useCallback((version) => {
    return <iframe src={iframe_urls[textType][version]} width={"100%"}></iframe>
  }, [textType]);

  const getFormIframe = React.useCallback(() => {
    let url = "https://docs.google.com/forms/d/e/1FAIpQLScX_8nuHq4qxIWq9phPQCMMjlpt5B5wn1VkKq9EL11nMDFKNw/viewform?embedded=true&usp=pp_url&entry.366340186=";

    url += encodeURIComponent(userFullName);
    url += `&entry.1414147444=${encodeURIComponent(userAge)}`;
    url += `&entry.372782890=${encodeURIComponent(userStudyArea)}`;
    url += `&entry.1718468401=${encodeURIComponent('Tipo ' + textType)}`;
    url += `&entry.118989389=${encodeURIComponent(createdByAi)}`;
                  
    return <iframe src={url} width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
  }, [userFullName, userStudyArea, textType, createdByAi]);

  const handleTextTypeChange = (event) => {
    setTextType(event.target.value);
  };

  const handleCreatedByAi = (event) => {
    setCreatedByAi(event.target.value);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Todos los pasos han sido completados exitosamente
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid xs={12} container={true} style={{ padding: 20 }}>
            {activeStep == 0 
            ?
              <Grid xs={12}>
                <Banner />

                <p>Al continuar estás de acuerdo con que almacenemos tu información de manera anónima y con fines únicamente académicos.</p>
                <p>En cualquier momento puedes desistir de participar de la actividad.</p>
                
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  xs={12}
                >
                  <Grid xs={12} md={10}>
                <Box
                  sx={{
                    maxWidth: '100%',
                  }}
                >
                  <TextField fullWidth label="Nombre" id="fullWidth" value={userFullName} onChange={(event) => setUserFullName(event.target.value)} />
                  <div style={{ height: 10 }} />
                  <TextField fullWidth label="Edad" id="fullWidth" value={userAge} onChange={(event) => setUserAge(event.target.value)} />
                  <div style={{ height: 10 }} />
                  <TextField fullWidth label="Área de estudio" id="fullWidth" value={userStudyArea} onChange={(event) => setUserStudyArea(event.target.value)} />
                </Box>

              </Grid>
              </Grid>
              </Grid>

              : activeStep == 1 ?
              
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>

                  <Grid item xs={12} md={6}> 
                    <FormControl style={{ paddingLeft: 20, paddingTop: 10 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Selecciona un tipo de texto para leer.</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={textType}
                        onChange={handleTextTypeChange}
                      >
                        <FormControlLabel value={1} control={<Radio />} label="Tipo 1" />
                        <FormControlLabel value={2} control={<Radio />} label="Tipo 2" />
                        <FormControlLabel value={3} control={<Radio />} label="Tipo 3" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}
                  
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  >
                    <FormControl style={{ paddingLeft: 20, paddingTop: 10 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">¿Cuál es el creado por inteligencia artificial?</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={createdByAi}
                        onChange={handleCreatedByAi}
                      >
                        <FormControlLabel value={"El primer texto"} control={<Radio />} label="El primero" />
                        <FormControlLabel value={"El segundo texto"} control={<Radio />} label="El segundo" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        
                        <Grid item sm={12} md={6}>
                          <Paper
                            sx={{
                              height: "100%",
                            }}
                          >
                            <Grid container height={"60vh"} width={"100%"} style={{ overflowY: "scroll" }}>
                              {getIframe("A")}
                            </Grid>
                          </Paper>
                        </Grid>
                        
                        <Grid item sm={12} md={6}>
                          <Paper
                            sx={{
                              height: "100%",
                            }}
                          >
                            <Grid container height={"60vh"} width={"100%"} style={{ overflowY: "scroll" }}>
                              {getIframe("B")}
                            </Grid>
                          </Paper>
                        </Grid>
                        
                    </Grid>
                  </Grid>
                </Grid>

              : activeStep == 2 ?
                <Grid xs={12} container height={"70vh"} width={"100%"} style={{ overflowY: "scroll" }}>
                  {getFormIframe()}
                </Grid>
              : <></>
            }

          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {
              activeStep !== steps.length - 1
              ? (<Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                  Siguiente
                </Button>)
              : <></>
            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
