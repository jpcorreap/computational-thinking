import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Image, Grid, TextField, Button, CardMedia, Card, Link, IconButton, Typography } from '@mui/material';
// Load the blocks
import imageUrl from "./assets/Vuelos.jpg";
import imageUrlYouAsk from "./assets/Youask.png";
import instructions from "./assets/instructions.png";


import { useCallback, useEffect, useMemo, useState } from 'react';
import { AutoscrollRunner } from '@tripetto/runner-autoscroll';
import StepperInstructions from './StepperInstructions';


import USAFlag from './assets/USA.png';
import MexicoFlag from './assets/Mexico.png';


const FETCH_URL = "https://kmw9s686g7.execute-api.us-east-2.amazonaws.com/default/collect";


function App() {
  let [lang, setLang] = useState();
  let [events, setEvents] = useState([]);

  let [sent, setSent] = useState(false);
  let [showHint, setShowHint] = useState(false);

  let [answer, setAnswer] = useState({
    email: "",
    answer: "",
    explanation: ""
  })

  let [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    searchParams.forEach((value, key) => params[key] = value);
    setQueryParams(params);

    if (params?.email) {
      setAnswer((oldParams) => ({ ...oldParams, "email": params.email }));
    }

    appendEvent(`type: start, time: ${new Date().toUTCString()}`);
  }, []);

  const handleLangChange = (selectedLang) => {
    setLang(selectedLang);
    // You can add more logic here, like storing the language in local storage or making API calls
  };

  const texts = useMemo(() => {
    if(queryParams.lang == "es" || queryParams.lang == "ES") {
      switch (queryParams.id) {
        case "1":
          return {
            "text": "Las aerolíneas mexicanas establecieron varias rutas, como se muestra en la figura. En respuesta a los requisitos de conservación de energía y reducción de emisiones, una empresa planea cancelar algunas rutas con la premisa de garantizar que los pasajeros puedan llegar a todas las ciudades (los pasajeros deben llegar a las ciudad de destino mediante vuelos de conexión). ¿Cuántas rutas se pueden cancelar como máximo?",
            "hint": "Garantiza que todas las ciudades estén conectadas aunque sea con conexiones en otras ciudades.",
            "img": imageUrl
          }
        case "2":
          return {
            "text": "Un rey posee un conjunto de 8 cubos muy similares entre sí, son del mismo tamaño. Todos pesan lo mismo, a excepción de uno solo de ellos que pesa más que todos los demás. El rey cuenta con una única balanza y solo puede usarla dos veces. ¿De qué manera podría el rey hallar el cubo más pesado?",
            "hint": "Piensa cómo descartar varios cubos en el menor número de mediciones posibles.",
            "img": "https://m.media-amazon.com/images/I/712myeXi4hL.jpg"
          }
        case "3":
          return {
            "text": "Imagina que existe un juego de 20 preguntas en donde un jugador está pensando en algo en su mente y otro jugador tiene que adivinar lo que el otro está pensando haciendo no más de 20 preguntas de verdadero / falso. Observa la imagen de la figura y responde: ¿cuál es el menor número de preguntas que puedes hacerle a la persona para determinar en qué animal está pensando?",
            "hint": "Busca atributos que tengan en común las imágenes para descartar más rápidamente.",
            "img": imageUrlYouAsk
          }
        case "4":
          return {
            "text": "Un profesor jugó un juego con sus alumnos al finalizar la clase y el ganador podía salir primero de la escuela. Las reglas del juego son las siguientes: la escuela tiene un pasillo con cinco puertas seguidas. Los estudiantes se forman y se turnan para caminar por este pasillo. Cuando un estudiante camina hacia una puerta abierta, debe cerrarla y caminar hacia la puerta de al lado. Al llegar a una puerta cerrada, el estudiante deberá abrirla y regresar al aula, dejando la puerta abierta hasta que el profesor los despida. Al iniciar el juego todas las puertas están cerradas. Si un estudiante descubre que todas las puertas están abiertas, gana el juego y puede irse a casa antes que los demás. Si los estudiantes están numerados del 1 al 35, ¿cuál estudiante sale primero de la escuela?",
            "hint": "Observa que una puerta puede estar en dos estados: abierta o cerrada.",
            "img": "https://static.wixstatic.com/media/cd39f4_325bfeed938946f6aa1461abba111108~mv2.jpg/v1/crop/x_0,y_156,w_538,h_409/fill/w_560,h_400,al_c,lg_1,q_80,enc_auto/Slayt16_JPG.jpg"
          }
        default:
          break;
      }
    }
      else {
          switch (queryParams.id) {
            case "1":
              return {
                "text": "Mexican airlines established several routes, as shown in the figure. In response to energy conservation and emission reduction requirements, a company plans to cancel some routes on the premise of ensuring that passengers can reach all cities (passengers must reach destination cities via connecting flights). How many routes can be canceled at most?",
                "hint": "Ensure that all cities are connected even with connections in other cities.",
                "img": imageUrl
              }
            case "2":
              return {
                "text": "A king has a set of 8 cubes that are very similar to each other, they are the same size. They all weigh the same, except for one of them, which weighs more than all the others. The king has only one set of scales and he can only use it twice. In what way could the king find the heaviest cube?",
                "hint": "Think about how to discard several cubes in as few measurements as possible.",
                "img": "https://m.media-amazon.com/images/I/712myeXi4hL.jpg"
              }
            case "3":
              return {
                "text": "Imagine there is a 20-question game where one player is thinking about something in his mind and another player has to guess what the other player is thinking by asking no more than 20 true/false questions. Look at the picture in the figure and answer: what is the least number of questions you can ask the person to determine what animal they are thinking about?",
                "hint": "Look for attributes that the images have in common to discard more quickly.",
                "img": imageUrlYouAsk
              }
            case "4":
              return {
                "text": "A teacher played a game with his students at the end of class and the winner could leave the school first. The rules of the game are as follows: the school has a hallway with five doors in a row. Students form up and take turns walking down this hallway. When a student walks to an open door, he or she must close it and walk to the next door. Upon reaching a closed door, the student must open it and walk back into the classroom, leaving the door open until the teacher dismisses them. At the start of the game all doors are closed. If a student discovers that all the doors are open, he/she wins the game and can go home before the others. If the students are numbered from 1 to 35, which student leaves the school first?",
                "hint": "Note that a door can be in two states: open or closed.",
                "img": "https://static.wixstatic.com/media/cd39f4_325bfeed938946f6aa1461abba111108~mv2.jpg/v1/crop/x_0,y_156,w_538,h_409/fill/w_560,h_400,al_c,lg_1,q_80,enc_auto/Slayt16_JPG.jpg"
              }
            default:
              break;
          }
      }
  }, [lang, queryParams]);

  const sendResults = useCallback(() => {
    appendEvent(`type: submit, time: ${new Date().toUTCString()}`);

    fetch(
      FETCH_URL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ ...queryParams, ...answer, events: [...events] }), // body data type must match "Content-Type" header
    }).then(_ => setSent(true));
  }, [queryParams, answer]);

  const appendEvent = useCallback((newEvent) => {
    setEvents((oldEvents) => [...oldEvents, `${newEvent}`])
  }, [events]);

  if(!lang && !queryParams.lang) 
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <IconButton onClick={() => handleLangChange('en')}>
          <img src={USAFlag} alt="English" width={80} />
        </IconButton>
        <Typography variant="subtitle1" align="center">English</Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={() => handleLangChange('es')}>
          <img src={MexicoFlag} alt="Español" width={80} />
        </IconButton>
        <Typography variant="subtitle1" align="center">Español</Typography>
      </Grid>
    </Grid>
    )

  return (
    <>
      {
        queryParams?.form
        ? (
          <Container>
            <AutoscrollRunner
                definition={
                  {
                    "epilogue": {
                      "title": "Thank you for submitting your answer!"
                    },
                    "clusters": [
                      {
                        "id": "4e1338fc4f32a0d7e5b31438e8eb9db1496d4c556d1db02e0454501fbe00451e",
                        "nodes": [
                          {
                            "id": "524be285e6127cb3041783274b73d4508c2b6f7b7adadf65ff6b26a55bdc05e5",
                            "name": "Pre-test on Computational Thinking Skills",
                            "nameVisible": true,
                            "description": "You will be presented with a series of questions, you must identify in the answer options, which image corresponds to the question marked with a question mark ?."
                            + " You will find the correct answer horizontally and vertically."
                            + " You should only look horizontally and vertically to find the answer. Do not look diagonally."
                            + " Answer as quickly as possible, you only have 30 seconds per item.",
                            "block": {
                              "type": "tripetto-text",
                              "version": "7.1.0"
                            }
                          },
                          {
                            "id": "d71ae07e7b906ae00de59f71597329855a101ca376e016c661896c80e8875ec7",
                            "name": "How did you get to that answer?",
                            "nameVisible": true,
                            "slots": [
                              {
                                "id": "fb8cdbc52be26c5a2af3c79122f6eed71374408104b5418421802ed0bcdd248e",
                                "type": "text",
                                "kind": "static",
                                "reference": "value",
                                "label": "Multi-line text"
                              }
                            ],
                            "block": {
                              "type": "tripetto-block-textarea",
                              "version": "5.2.1"
                            }
                          }
                        ]
                      }
                    ],
                    "builder": {
                      "name": "tripetto",
                      "version": "4.5.1"
                    }
                  }
                }
            />

          <div width="100">
            <CardMedia
              component="img"
              width="100"
              image={instructions}
            />
            <h2>Select 3 pieces that together make up the puzzle. Do not overlap them.</h2>
          </div>
          </Container>
        )
        : 
        queryParams["id"] ? 
        (
          <>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              <Grid item xs={12} md={6} padding={5}>
                <Card>
                  <CardMedia
                    component="img"
                    width="300"
                    image={texts.img}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={6} padding={5}>

                {
                  queryParams?.id ? <>
                    <p style={{ fontSize: 24 }}>
                      {texts.text}
                      {" "}
                      {
                        showHint ? texts.hint : <Link onClick={() => {
                          setShowHint(true);
                          appendEvent(`type: hint, time: ${new Date().toUTCString()}`);
                        }}>
                          {queryParams.lang == "EN" ? "Show hint" : "Mostrar pista"}
                        </Link>
                      }
                      {"."}
                    </p>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"

                    >
                      <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value={answer.email} onChange={(e) => setAnswer((oldParams) => ({ ...oldParams, "email": e.target.value }))} fullWidth />
                      <p></p>
                      <TextField id="outlined-basic" label="Respuesta" variant="outlined" onChange={(e) => setAnswer((oldParams) => ({ ...oldParams, "answer": e.target.value }))} fullWidth />
                      <p></p>
                      <TextField id="outlined-basic" label="¿Cómo llegaste a esa respuesta?" variant="outlined" onChange={(e) => setAnswer((oldParams) => ({ ...oldParams, "explanation": e.target.value }))} fullWidth />
                      <p>{" "}</p>
                      <Button variant="contained" onClick={() => sendResults()} disabled={sent}>{sent ? "Se registró tu respuesta" : "Enviar"}</Button>
                    </Grid>

                  </>

                    : <></>
                }

              </Grid>

            </Grid>
          </>
        ) : (
          <Container style={{ marginTop: 50 }}><StepperInstructions lang={lang} /></Container>
        )
      }
    </>
  );
}

export default App;
