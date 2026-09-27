# Wunschkiste - Frontend

Eine digitale Wunschliste als Webanwendung. Mit der Wusnchkiste können Nutzer:innen sich registrieren, einloggen und ihre persönliche Wünsche
(z. B. für Geburtstage oder Feiertage) verwalten.

## Beschreibung

Die Wunschkiste ist eine persönliche, geschützte Wunschliste:
 - **Login & Registrierung**: Nutzer:innen registrieren sich mit Vorname, Nachname, Benutzername und Passwort und melden sich anschließend mit  Benutzername und Passwort an. Nach dem Login wird die Wunschliste personalisiert.
 -**Wünsche verwalten (CRUD)**: Neue Wünsche anlegen, bestehende bearbeiten und löschen.
 -**Bild-Upload**: Man kann eine Bilddatei hochladen.
 -**Kategorien & Filter**: Die Wünsche lassen sich über eine Filterleiste nach Kategorie sortieren (z. B. "Schmuck", "Kleidung",...) oder per  Suchleiste nach Titel durchsuchen.
 -**Responsive Kartenansicht**: Die Wünsche werden als einheitlich große Karten mit Bild, Titel, Preis und Aktionen angezeigt.
 -**Datenschutz pro Nutzer**: jeder Wunsch ist über den eingeloggten Account geschützt (JWT-Authentifizierung) 

## Verwendete Technologien

-**Angular**
-**HTML**
-**CSS**
-**Bootstrap**
-**TypeScript**
-**RxJS / HttpClient**

## Installation & Start

### Schritte

1. Repository klonen:
```bash
git clone https://github.com/bngapinsi/Wunschkiste-frontend.git
cd Wunschkiste-frontend
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3.Entwicklungsserver starten:
```bash
ng serve
```

4.Im Browser öffnen:
http://localhost:4200

## Verwendung von KI-Tools

Bei diesem Projekt wurden KI-Tools unterstützend eingesetzt:
-**Claude (Anthropic)**:
Konzeptverständnis: Erklärungen zu Angular-Grundlagen (Komponenten, Signals, Property Binding, Routing-Parameter) und TypeScript-Konzepten während der Entwicklung
Debugging: Fehlersuche bei TypeScript-/Angular-Fehlern (fehlende Imports, falsche Parameterübergabe, Typkonflikte im Service), sowie bei Git- und Terminal-Problemen (Port-Konflikte, fehlender Remote)
Frontend: Aufbau der Angular-Komponenten (Login mit Anmelden/Registrieren, Suche und Kategorie-Filter)
-**Gemini (Google)**:
Bootstrap & CSS-Styling: Einsatz von Bootstrap Spacing Utilities (gap, Margins) und Abstandsregeln.
Login-Screen: Layout und Styling der Login- und Registrierungskarte im Holz- und Kisten-Look (braune Farbverläufe, Kisten-Form).





