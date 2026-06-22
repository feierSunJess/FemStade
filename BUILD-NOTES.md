# FEM Stade — OnePager · Build-Notizen

Statischer OnePager. Kein Framework, kein Build-Schritt. Einfach Dateien hochladen.

## Dateien
- `index.html` — die OnePager-Startseite (alle Inhalte)
- `style.css` — komplettes Design (Brand-Farben oben als CSS-Variablen)
- `main.js` — Smooth-Scroll (Lenis), Scroll-Reveal (GSAP), Preloader, Mobile-Nav, Formular
- `impressum.html` / `datenschutz.html` — Pflichtseiten (VORLAGEN mit Lückentext)
- `Femstade_Herobild.png` / `FEMStade_Logo.png` — Bilder
- `.github/workflows/deploy.yml` — Auto-Upload zu All-Inkl (Einrichtung siehe Datei)

## Brand-Farben (in style.css ganz oben änderbar)
- Violett `#5B1E8E` · Koralle `#E8542C` · BG `#FBFAFC` · Text `#2E2E2E`

## OFFENE PUNKTE (vor dem echten Live-Gang)

1. **Kontaktformular-Endpoint (nForms):**
   In `index.html` das `action="https://nforms.eu/PLATZHALTER-FORM-ID"` durch deine
   echte nForms-Form-URL ersetzen. Solange der Platzhalter drin steht, zeigt das
   Formular einen Hinweis statt zu senden (verschickt also nichts versehentlich).

2. **Impressum-Daten:** Alle `[in Klammern]` markierten Stellen in `impressum.html`
   füllen (Anschrift, vertretungsberechtigte Person(en), ggf. Registereintrag).

3. **Datenschutz:** `datenschutz.html` prüfen — besonders Abschnitt 4 (nForms-Angaben
   aus deinem nForms-/AV-Vertrag) und Abschnitt 6 (Google Fonts, siehe Punkt 4).
   Rechtlich prüfen lassen.

4. ~~Google Fonts lokal einbinden~~ ✓ **ERLEDIGT.** Fonts liegen in `/fonts/`, kein
   externer Google-Aufruf mehr. Datenschutzerklärung entsprechend aktualisiert.

5. **Instagram-Handle bestätigen:** Aktuell verlinkt auf `instagram.com/fem.stade`
   (Anzeige @FEM.STADE). Falls anderer Handle: in `index.html`, `impressum.html`,
   `datenschutz.html` ersetzen.

## Später erweiterbar
Aufbau ist sektionsbasiert. Für den Mehrseiter später: Sektionen aus `index.html`
in eigene Seiten auslagern, Navigation auf echte Seiten-Links umstellen. Die
Design-Bausteine (Buttons, Cards, Chips, Kicker) sind wiederverwendbar.

## Lokale Vorschau
Im Ordner: `python3 -m http.server 8000` und dann http://localhost:8000 öffnen.
