import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { Container } from '@mui/system';

const steps = ['Pre-test', 'Serious game', 'Post-test'];


const stepComponents = {
  "en": {
  0: <Container style={{ paddingTop: 50 }}>
    <h1>Experiment on computational thinking</h1>
      <p style={{ fontSize: 22, lineHeight: 2 }}>The experiment consists of 3 stages of 20 minutes each. These stages and their steps must be completed in strict order and participation in the experiment will be valid when all steps have been completed.</p>
      <Alert severity="info" style={{fontSize: 22, lineHeight: 2}}>
        Jeanette Wing (2006) defined computational thinking as a set of skills that not only computer scientists but all should develop to face the complex challenges emerging in our society: these are decomposition, abstraction, pattern recognition and algorithm design. The objective of this experiment is to collect data about computational thinking in undergraduate and graduate students.
      </Alert>
      <p style={{fontSize: 22 }}>To complete this step please fill next forms:</p>
      <ol style={{fontSize: 22 }}>
        <li>
          <a style={{fontSize: 22 }} href="https://docs.google.com/forms/d/e/1FAIpQLSeN4CRyd7l6h3uzja0PKEkglxh1PJm7mEQdXx5mHyc0u06Y3Q/viewform?usp=sf_link" target="_blank">Consent Form for participating in the experiment</a>.
        </li>
        <li>
          <a style={{fontSize: 22 }} href="https://e4cct.mx/PC/pages/content/login.php" target="_blank">Pre-test (old)</a>.
        </li>
        <li>
          <a style={{fontSize: 22 }} href="?form=1" target="_blank">Pre-test</a>.
        </li>
      </ol>
    </Container>,
  1: <Container>
      <p style={{fontSize: 22 }}>Now play the serious game available at:</p>
      <a style={{fontSize: 22 }} href="https://jpcorreap.itch.io/serious-game" target="_blank">https://jpcorreap.itch.io/serious-game</a>
    </Container>,
  2: <Container>
      <p style={{fontSize: 22 }}>Finally, please fill next forms:</p>
      <ol style={{ fontSize: 22 }}>
        <li>
          <a style={{fontSize: 22 }} target="_blank" href="https://e4cct.mx/PC/pages/content/login.php">Post-test B.</a><br />
        </li>
        <li>
          <a style={{fontSize: 22 }} target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeiMkz5BXF8TZpGzWAVMyX4zkpqbzWQ7egr6sQCGOH24h8qfg/viewform?usp=sf_link">Feedback form.</a>
        </li>
      </ol>
    </Container>
    },
  "es": {
  0: <Container style={{ paddingTop: 50 }}>
    <h1>Experimento sobre el pensamiento computacional</h1>
      <p style={{ fontSize: 22, lineHeight: 2 }}>Este experimento consta de 3 etapas de 20 minutos cada una. Las etapas deben ser completadas en estricto orden, la participación en el experimento será tomada como válida una vez todos los pasos estén completos.</p>
      <Alert severity="info" style={{fontSize: 22, lineHeight: 2}}>
        Jeanette Wing (2006) definió el pensamiento computacional como un conjunto de habilidades (decomposición, abstracción, reconocimiento de patrones y diseño algorítmico) que no solo los científicos de la computación deben aprender, sino todos los profesionistas, para enfrentar los retos complejos que emergen en nuestra sociedad. El objetivo de este experimento es recolectar datos acerca del pensamiento computacional en estudiantes de licenciatura y posgrado.
      </Alert>
      <p style={{fontSize: 22 }}>Para completar este paso, asegúrate de llenar los siguientes formularios:</p>
      <ol style={{fontSize: 22 }}>
        <li>
          <a style={{fontSize: 22 }} href="https://docs.google.com/forms/d/e/1FAIpQLSeY76zI3mmSMPq8HblXzkM4a9ykxBexyXdAsDmfvpLLAQX19w/viewform?usp=sf_link" target="_blank">Consentimiento para participar en el experimento</a>.
        </li>
        <li>
          <a style={{fontSize: 22 }} href="https://e4cct.mx/PC/pages/content/login.php" target="_blank">Pre-test (anterior)</a>.
        </li>
        <li>
          <a style={{fontSize: 22 }} href="?form=1" target="_blank">Pre-test (nuevo)</a>.
        </li>
      </ol>
    </Container>,
  1: <Container>
      <p style={{fontSize: 22 }}>Now play the serious game available at:</p>
      <a style={{fontSize: 22 }} href="https://jpcorreap.itch.io/serious-game" target="_blank">https://jpcorreap.itch.io/serious-game</a>
    </Container>,
  2: <Container>
      <p style={{fontSize: 22 }}>Finally, please fill next forms:</p>
      <ol style={{ fontSize: 22 }}>
        <li>
          <a style={{fontSize: 22 }} target="_blank" href="https://e4cct.mx/PC/pages/content/login.php">Post-test B.</a><br />
        </li>
        <li>
          <a style={{fontSize: 22 }} target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeiMkz5BXF8TZpGzWAVMyX4zkpqbzWQ7egr6sQCGOH24h8qfg/viewform?usp=sf_link">Feedback form.</a>
        </li>
      </ol>
    </Container>
    },

}

export default function StepperInstructions({ lang }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


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

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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
          <p style={{fontSize: 22}}>
            All steps completed, thank you for participating!
          </p>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {stepComponents[lang][activeStep]}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
