@AGENTS.md

# Projekt-Regeln & Workflow

## 1. Sicherheit (Strikte Einschränkungen)
Du hast weitreichende Rechte, aber folgende Aktionen sind **ohne explizite Bestätigung** untersagt:
- **Löschen:** `rm`, `rmdir` oder das Überschreiben von Dateien durch Umleitungen (`>`).
- **Git:** `git commit`, `git push`, `git merge`. (Status-Abfragen und Diff sind erlaubt).
- **Infrastruktur:** Änderungen an `.env`, `.gitignore` oder Systemkonfigurationen.

## 2. Der Team-Workflow (Git & Todos)
Ausnahme von den Sicherheitsregeln: Für diesen Workflow bist du autorisiert, Git-Befehle eigenständig auszuführen. Beachte, dass dieses Projekt plattformübergreifend (Windows & WSL/Linux) entwickelt wird.

Wenn ich sage "Setz dich an die Todos" oder ähnlich, folge exakt diesem Ablauf:

1. **System-Agnostischer Sync:** Führe `git checkout main` und anschließend `git pull` aus. Verwende immer die nativen Git-Befehle des aktuellen Terminals, versuche keine OS-spezifischen Hacks.
2. **Abwarten bei Fehlern:** Wenn Git einen Fehler wirft (z.B. "dubious ownership", fehlende SSH-Keys oder Merge-Konflikte), versuche NICHT, das Projekt anderweitig zu lesen. Brich ab und präsentiere mir den exakten Fehler, damit ich ihn auf Betriebssystem-Ebene lösen kann.
3. **Aufgabe wählen (Strict Lock Rule):** Lies die `TODO.md`. 
   - Wähle **NUR** die oberste Aufgabe, die den Status `[ ]` (Offen) hat UND entweder das Tag `@Claude` trägt oder noch keinem zugewiesen ist.
   - **Rühre NIEMALS Aufgaben an, die auf `[~]` (In Arbeit) oder `[x]` (Erledigt) stehen.** Ein `[~]` bedeutet, dass eine andere Instanz oder ein menschlicher Entwickler daran arbeitet. Finger weg!
4. **Lock (Zuweisung & Status):** Trage `@Claude` hinter der gewählten Aufgabe ein und ändere das Symbol von `[ ]` auf `[~]`. 
5. **Push Lock:** Führe aus: `git add TODO.md`, gefolgt von `git commit -m "chore: Claude locked task"` und `git push`.
6. **Branch erstellen:** Erstelle einen neuen Zweig für deine Arbeit: `git checkout -b claude/feat-task`
7. **Bearbeiten:** Erledige die Aufgabe im Code. Fokussiere dich ausschließlich auf diese eine Funktionalität.
8. **Abschluss & Push:** Ändere das Symbol in der `TODO.md` auf `[x]`. Führe aus: `git add .`, danach `git commit -m "feat: completed task"` und pushe den Branch mit `git push -u origin HEAD`.
9. **Pause:** Warte auf mein Feedback.

## 3. Technischer Standard & Architektur
- **Erweiterbarkeit (Modularity):** Schreibe modularen, stark entkoppelten Code. Baue Funktionen und Klassen so auf, dass neue Features in Zukunft hinzugefügt werden können, ohne die bestehende Kernlogik umbauen zu müssen (Open/Closed-Prinzip). 
- **Trennung der Zuständigkeiten:** Trenne Datenverarbeitung/Logik immer sauber von der Benutzeroberfläche (UI).
- **Clean Code:** Bevorzuge modernen, lesbaren Code. Vermeide Codeduplikate (DRY - Don't Repeat Yourself).
- **Sprache im Code:** Schreibe ALLE Code-Kommentare, Variablen, Funktionsnamen und Commit-Messages ausschließlich auf **Englisch**. (Unsere Konversation im Chat bleibt auf Deutsch).
- **Fehlerbehandlung:** Wenn ein Befehl fehlschlägt, analysiere den Error-Log selbstständig und versuche, das Problem zu beheben, bevor du mich fragst.
