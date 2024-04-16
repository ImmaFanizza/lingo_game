# lingo_game
Challenge di Frontenders
Web app che ricrea il gioco del Lingo
Nel lingo lo scopo è indovinare una parola sapendo solo la lettera iniziale e la lunghezza. Le parole da indovinare hanno una lunghezza di 5, 6, 7 o 8 caratteri. Abbiamo a disposizione un numero limitato di tentativi:

5 tentativi per le parole di 5 caratteri
6 tentativi per le parole di 6 caratteri
7 tentativi per le parole di 7 caratteri
6 tentativi per le parole di 8 caratteri
All’avvio viene mostrata nella prima riga la prima lettera della parola da indovinare e dei punti (.) nelle tessere successive.

L’utente può scrivere la sua parola nell’input e provarla cliccando sul pulsante oppure premendo Invio.

Ad ogni tentativo ci verranno mostrate:

in verde le lettere inserite dall’utente che sono presenti nella parola da indovinare e sono anche nella posizione giusta
in arancione / giallo le lettere inserite dall’utente che sono presenti nella parola da indovinare ma non sono nella posizione giusta
in blu le parole inserite dall’utente che non sono nella parola da indovinare
La parola inserita dall’utente è errata se:

è più corta della parola da indovinare
è più lunga della parola da indovinare.
In questo caso vengono mostrate le lettere in rosso e si passa al tentativo successivo.
Per ogni tentativo si ha a disposizione un tempo limitato (scegliete il tempo che preferite). Viene mostrato il tempo rimanente nella barra in basso, che decresce ogni secondo. Se il tempo è scaduto e l’utente non ha inserito nulla, si va al prossimo tentativo.

Dopo ogni tentativo e solo se ho ancora un tentativo a disposizione, nella riga successiva della griglia vedrò le lettere che ho indovinato e nelle tessere ancora vuote un punto (.).

Se ho finito i tentativi a disposizione e non ho indovinato la parola, viene creata una nuova riga con la parola che era da indovinare.

Al termine del lingo (che l’utente abbia vinto oppure no) viene mostrato il pulsante “Prossimo lingo” che permette di generare una nuova parola e ripartire da capo.
