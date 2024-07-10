# Mein Tool

## Überblick

Mein Tool ermöglicht es, außergewöhnliche Momente im Leben kurzerhand zu fotografieren und einige Daten dazu
aufzunehmen. Man kann auch auf die Fotobibliothek zugreifen, um ältere Momente zu erfassen.

### Funktionen

- **Bildaufnahme und Standorterfassung**: Neben dem Bild wird auch der Standort erfasst, um später zu sehen, wo das Bild
  aufgenommen wurde. Möchte man einen anderen Standort erfassen, ist das mit dem Namen der Stadt oder des Landes
  möglich (funktioniert so gut wie ohne Google-API-Auto-Completion).
- **Text und Zeitangabe**: Es ist möglich, einen Text zu erfassen, um den Moment zu beschreiben und die Zeit / das Datum
  anzugeben (oder es wird der aktuelle Moment genommen).
- **Speicherung und Verwaltung**: Der Moment wird in einer Datenbank notiert und kann jederzeit angeschaut oder gelöscht
  werden. Alle Momente werden auf der Startseite angezeigt und können auch dort gelöscht werden.
- **Bildvergrößerung**: Mit einem Klick auf das Bild in der Übersicht / Home kann das Bild vergrößert werden, und mit
  einem
  weiterem Klick auf den Bildschirm, wird das Bild wieder verkleinert.
- **Löschen**: Mit einem Swipe nach rechts, einem Klick auf den Mülleimer und nach Bestätigen des Popups kann der
  Eintrag gelöscht werden.

### Einstellungen

- **Darkmode**: Ein einfacher Switch, der eventuell zukünftig erweitert wird (heisst: funktioniert noch nicht).
- **Lokale Speicherung**: Entscheidung, ob das geschossene Bild in der lokalen Bibliothek gespeichert werden soll.
- **Standortdaten-Speicherung**: Entscheidung, ob die Standortdaten direkt nach dem Bestätigen gespeichert werden
  sollen (dieser Vorgang dauert etwas und ist deswegen optional).

### Zusätzliche Features

- **Schnelle Navigation**: Kleine Elemente im Projekt ermöglichen eine schnelle Navigation (z.B. Einstellungstext, falls
  nicht aktiviert, oder Upload von den Einstellungen aus zu Plus ->).

## Projektstruktur

Das Projekt ist in mehrere Hauptverzeichnisse und Dateien unterteilt, die eine klare und modulare Struktur für die
Entwicklung und Wartung der Anwendung bieten. Hier ist eine kurze Übersicht:

- `app/`: Enthält die Hauptkomponenten der Anwendung, einschließlich der Bildschirme und der Navigationslogik.
    - `(tabs)/`: Beinhaltet die verschiedenen Tabs der Anwendung, wie z.B. die Startseite (`Home.tsx`), die für die
      Anzeige und Verwaltung der Einträge zuständig ist.
- `components/`: Beherbergt wiederverwendbare UI-Komponenten, wie z.B. `FullScreenOverlay.tsx`, die für die
  Bildvergrößerungsfunktion verwendet wird.
- `assets/`: Enthält statische Ressourcen wie Bilder und Dokumentation (`docu/Dokumentation.md`), die die Funktionen und
  den Überblick über das Tool beschreiben.
- `styles/`: (Falls vorhanden) Würde Stylesheets für die Anwendung enthalten, um ein konsistentes Design über
  verschiedene Komponenten hinweg zu gewährleisten.

---

Natürlich, hier ist eine kurze Übersicht der wichtigsten Komponenten und der Projektstruktur auf Deutsch:

### Projektstruktur
1. **app**:
  - **tabs**:  Tab-Navigation der App.
    - **add**:
      - **_layout.tsx**: Eine Layout-Komponente für den "add" Tab. Sie Ermöglicht mir zwischen Kamera / Galerie und Details zu wechseln.
    - **Home.tsx**: Die Home-Screen-Komponente.
    - **Settings.tsx**: Die Einstellungen-Screen-Komponente.
    - **_layout.tsx**: Eine Layout-Komponente für den Tab unten

2. **assets**:
  - **docu**: Enthält Dokumentationsdateien.
    - **Dokumentation.md**: Eine Markdown-Datei mit der Projektdokumentation.

3. **components**:
  - **FullScreenOverlay.tsx**: Eine Komponente für ein Vollbild-Overlay.

4. **service**:
  - **service.ts**: Enthält API-Funktionen für meine Firebase Realtime Database.

5. **theme**:  Dateien, welche evtl irgendwann mal für Darkmode / Lightmode genutzt wird.
  - **theme.ts**:
  - **themeContext.ts**: 

### Wichtige Komponenten

- **Home.tsx**: Die Hauptansicht oder Startseite der App.
- **Settings.tsx**: Die Einstellungen-Seite der App.
- **FullScreenOverlay.tsx**: Eine Komponente, die ein Overlay im Vollbildmodus darstellt.
- **theme.ts** und **themeContext.ts**: Verwaltung und Bereitstellung von Thema und Stil der App.

ah und natürlich "CuStOm LoAdInG ScReEnS" :)


Figma  - App store : https://www.figma.com/design/Gv5cxNKs1cdVllpM4GJXnU/Remember-Me-AppStore?node-id=4-2997&t=YQPQIRp1eI6LptLH-0
Figma - App Over View: https://www.figma.com/design/cNL2BRSbUOkvhEl8H3cnil/Rember-Me?node-id=1-2&t=TwPqgaxA9yUu73SM-1
