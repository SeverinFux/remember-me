# Testdokumentation

## Überblick

Diese Testdokumentation beschreibt die Testfälle und Szenarien für das Tool, das außergewöhnliche Momente im Leben
fotografiert und Daten dazu erfasst. Die Tests decken verschiedene Funktionen der Anwendung ab, einschließlich
Bildaufnahme, Standorterfassung, Text- und Zeitangabe, Speicherung und Verwaltung, Bildvergrößerung, Löschen von
Einträgen und Einstellungen.

## Testumgebung

- **Plattform**: iOS und Android
- **Geräte**: Im besten Fall verschiedene Modelle von Smartphones und Tablets

## Testfälle

### 1. Bildaufnahme und Standorterfassung

#### Testfall 1.1: Bildaufnahme

- **Beschreibung**: Testen, ob die Kamera richtig funktioniert und ein Bild aufgenommen werden kann.
- **Schritte**:
    1. Öffne die Anwendung.
    2. Navigiere zum "add" Tab.
    3. Wähle die Kameraoption.
    4. Mache ein Foto.
- **Erwartetes Ergebnis**: Das Foto wird korrekt aufgenommen und angezeigt.

#### Testfall 1.2: Standorterfassung - default

- **Beschreibung**: Testen, ob der Standort korrekt erfasst wird.
- **Schritte**:
    1. In den Einstellungen setzten, das Location per Default gesetzt wird (ist default).
    2. Mache ein Foto wie in Testfall 1.1 beschrieben.
    3. Überprüfe die Standortdaten (Hier für die richtigen Einstellungen. Default: true).
- **Erwartetes Ergebnis**: Die Standortdaten werden korrekt erfasst und angezeigt.

#### Testfall 1.3: Standortänderung - eigenen

- **Beschreibung**: Testen, ob der Standort manuell geändert werden kann.
- **Schritte**:
    1. In den Einstellungen setzten, das Location nicht per Default gesetzt wird.
    2. Mache ein Foto wie in Testfall 1.1 beschrieben.
    3. Ändere den Standort manuell in der Standort Ansicht.
- **Erwartetes Ergebnis**: Der Standort wird korrekt geändert und gespeichert.
-

#### Testfall 1.3: Standortänderung - keinen

- **Beschreibung**: Testen, ob der Standort manuell geändert werden kann.
- **Schritte**:
    1. In den Einstellungen setzten, das Location nicht per Default gesetzt wird.
    2. Mache ein Foto wie in Testfall 1.1 beschrieben.
    3. Speichere.
    4. Abfrage bestätigen
- **Erwartetes Ergebnis**: Es wird abgefragt ob wirklich kein Standort gesichert werden soll. Es gibt keine
  Fehlermeldung und im Frontend wird "Unknown Location" angezeigt.

### 2. Text und Zeitangabe

#### Testfall 2.1: Text hinzufügen

- **Beschreibung**: Testen, ob ein Text zu einem Moment hinzugefügt werden kann.
- **Schritte**:
    1. Mache ein Foto wie in Testfall 1.1 beschrieben.
    2. Füge einen Text hinzu.
- **Erwartetes Ergebnis**: Der Text wird korrekt hinzugefügt und gespeichert.

#### Testfall 2.2: Zeitangabe

- **Beschreibung**: Testen, ob die Zeitangabe korrekt erfasst wird.
- **Schritte**:
    1. Mache ein Foto wie in Testfall 1.1 beschrieben.
    2. Bearbeite die Zeitangabe.
- **Erwartetes Ergebnis**: Die aktuelle Zeit wird korrekt erfasst und angezeigt.

#### Testfall 2.3: Datum angabe

- **Beschreibung**: Testen, ob die Datum angabe korrekt erfasst wird.
- **Schritte**:
    1. Mache ein Foto wie in Testfall 1.1 beschrieben.
    2. Setze ein Datum.
- **Erwartetes Ergebnis**: Das aktuelle Datum wird korrekt erfasst und angezeigt.

### 3. Speicherung und Verwaltung

#### Testfall 3.1: Eintrag speichern

- **Beschreibung**: Testen, ob ein Moment korrekt in der Datenbank gespeichert wird.
- **Schritte**:
    1. Mache ein Foto und füge alle nötigen Daten hinzu.
    2. Speichere den Eintrag.
- **Erwartetes Ergebnis**: Der Eintrag wird korrekt gespeichert und in der Home-Ansicht angezeigt.

#### Testfall 3.2: Eintrag löschen

- **Beschreibung**: Testen, ob ein Moment korrekt gelöscht werden kann.
- **Schritte**:
    1. Speichere einen Eintrag wie in Testfall 3.1 beschrieben.
    2. Lösche den Eintrag.
- **Erwartetes Ergebnis**: Der Eintrag wird korrekt gelöscht und verschwindet aus der Home-Ansicht.

#### Testfall 3.2: Eintrag mit unvollständigen Daten speichern

- **Beschreibung**: Testen, ob ein Moment auch mit unvollständigen Daten korrekt in der Datenbank gespeichert wird, ohne
  dass die Anwendung abstürzt.
- **Schritte**:
    1. Mache ein Foto.
    2. Füge nur teilweise Daten hinzu (z.B. nur Text oder nur Standort).
    3. Speichere den Eintrag.
- **Erwartetes Ergebnis**: Der Eintrag wird mit den vorhandenen Daten korrekt gespeichert und in der Home-Ansicht
  angezeigt. Die Anwendung stürzt nicht ab und zeigt eventuell eine Warnung oder Information über fehlende Daten an.
-

### 4. Bildvergrößerung

#### Testfall 4.1: Bild vergrößern

- **Beschreibung**: Testen, ob ein Bild in der Home-Ansicht vergrößert werden kann.
- **Schritte**:
    1. Speichere einen Eintrag wie in Testfall 3.1 beschrieben.
    2. Klicke auf das Bild in der Home-Ansicht.
- **Erwartetes Ergebnis**: Das Bild wird im Vollbildmodus angezeigt.

#### Testfall 4.2: Bild verkleinern

- **Beschreibung**: Testen, ob das vergrößerte Bild wieder verkleinert werden kann.
- **Schritte**:
    1. Vergrößere ein Bild wie in Testfall 4.1 beschrieben.
    2. Klicke erneut auf das Bild.
- **Erwartetes Ergebnis**: Das Bild wird wieder verkleinert und zur ursprünglichen Ansicht zurückgekehrt.

### 5. Einstellungen

#### Testfall 5.1: Darkmode aktivieren

- **Beschreibung**: Testen, ob der Darkmode-Switch funktioniert.
- **Schritte**:
    1. Navigiere zu den Einstellungen.
    2. Aktiviere den Darkmode-Switch.
- **Erwartetes Ergebnis**: Der Darkmode wird aktiviert (aktuell ohne Funktion).

#### Testfall 5.2: Lokale Speicherung aktivieren

- **Beschreibung**: Testen, ob der Switch zur lokalen Speicherung funktioniert.
- **Schritte**:
    1. Navigiere zu den Einstellungen.
    2. Aktiviere den Switch zur lokalen Speicherung.
- **Erwartetes Ergebnis**: Die Option zur lokalen Speicherung wird aktiviert.

#### Testfall 5.3: Standortdaten-Speicherung aktivieren

- **Beschreibung**: Testen, ob der Switch zur Speicherung von Standortdaten funktioniert.
- **Schritte**:
    1. Navigiere zu den Einstellungen.
    2. Aktiviere den Switch zur Speicherung von Standortdaten.
- **Erwartetes Ergebnis**: Die Option zur Speicherung von Standortdaten wird aktiviert.

### 6. Zusätzliche Features

#### Testfall 6.1: Schnelle Navigation

- **Beschreibung**: Testen, ob die schnelle Navigation funktioniert.
- **Schritte**:
    1. Navigiere zu den Einstellungen.
    2. Verwende die Schnellnavigationselemente.
- **Erwartetes Ergebnis**: Die Schnellnavigation funktioniert und ermöglicht den schnellen Zugriff auf verschiedene
  Funktionen.

## Fazit

Diese Testdokumentation bietet eine umfassende Übersicht über die Tests, die durchgeführt werden müssen, um
sicherzustellen, dass das Tool korrekt funktioniert und eine reibungslose Benutzererfahrung bietet. Alle beschriebenen
Testfälle sollten regelmäßig durchgeführt werden, insbesondere nach größeren Änderungen oder Updates der Anwendung, um
die Qualität und Zuverlässigkeit sicherzustellen.