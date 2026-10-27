Idea Board

App mobile per annotare e organizzare le proprie idee, costruita con React Native ed Expo. I dati restano salvati sul telefono, anche dopo aver chiuso l'app.

Screenshot

Elenco idee con filtro per tag Pannello per aggiungere un'idea

Funzionalità
Aggiunta, modifica ed eliminazione delle idee (con conferma prima di eliminare)
Segna un'idea come completata con una checkbox
Filtro per tag con pillole colorate: ogni tag ha sempre lo stesso colore
Emoji scelta nel form e mostrata su card e filtri
Descrizione su più righe
Data di creazione su ogni card
Validazione del form: titolo e tag obbligatori, descrizione facoltativa, con messaggio d'errore sotto il campo
Form in un pannello a scorrimento (bottom sheet) aperto da un pulsante flottante, che si adatta alla tastiera
Tema scuro, anche nelle barre di sistema
Salvataggio automatico sul dispositivo
Tecnologie
React Native con Expo
JavaScript
@react-native-async-storage/async-storage per il salvataggio dei dati
@gorhom/bottom-sheet, react-native-reanimated e react-native-gesture-handler per il pannello del form
@expo/vector-icons per le icone
Struttura del progetto
idea-board-native/
  App.js          stato, funzioni e struttura della schermata
  theme.js        colori, palette dei tag, funzione dei colori
  app.json        configurazione Expo
  eas.json        profili di build
  Components/
    Header.js     titolo
    FilterBar.js  pillole dei tag
    IdeaList.js   elenco scorrevole delle idee
    IdeaCard.js   singola idea
    AddIdeaForm.js  form di aggiunta e modifica
Come avviarla

Servono Node.js e l'app Expo Go sul telefono.

bash
npm install
npx expo start

Inquadra il QR code con Expo Go per provare l'app sul telefono. Se qualcosa non si aggiorna, npx expo start -c svuota la cache.

Creare l'APK per Android
bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
Cosa ho imparato
Gestire lo stato con useState e portarlo nel componente padre per condividerlo tra più componenti
Salvare i dati con AsyncStorage e useEffect
Dividere l'interfaccia in componenti riutilizzabili e passare i dati con le props
Validare un form e mostrare gli errori all'utente
Le differenze tra sviluppo web e sviluppo mobile, dagli stili alla gestione della tastiera
Preparare un'app per l'installazione con EAS Build
Idee future
Ricerca testuale e filtro per data
Checkbox dentro la descrizione
Note vocali
Supporto a più lingue
Autore

Stefano Santulli, in transizione verso il web design e lo sviluppo front-end. Questo è il secondo di tre progetti di portfolio.
