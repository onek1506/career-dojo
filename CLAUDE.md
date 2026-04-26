@AGENTS.md

# Projekt-Regeln & Workflow

## 1. Sicherheit (Strikte Einschränkungen)
Du hast weitreichende Rechte, aber folgende Aktionen sind **ohne explizite Bestätigung** untersagt:
- **Löschen:** `rm`, `rmdir` oder das Überschreiben von Dateien durch Umleitungen (`>`).
- **Git:** `git commit`, `git push`, `git merge`. (Status-Abfragen und Diff sind erlaubt).
- **Infrastruktur:** Änderungen an `.env`, `.gitignore` oder Systemkonfigurationen.

## 2. Der synchronisierte Todo-Workflow (Git-Loop)
Ausnahme von den Sicherheitsregeln: Für diesen Workflow bist du autorisiert, `git add`, `git commit` und `git push` eigenständig auszuführen.

Wenn ich sage "Setz dich an die Todos" oder ähnlich, folge exakt diesem Ablauf:
1. **Sync (Pull):** Führe `git pull` aus, um den neuesten Projektstand zu holen.
2. **Prüfen:** Lies die `TODO.md` und analysiere, ob es neue Aufgaben oder Statusänderungen gibt.
3. **Auswählen:** Wähle die oberste, nicht erledigte Aufgabe (`[ ]`).
4. **Lock (Status-Update):** Ändere das Symbol der gewählten Aufgabe in der `TODO.md` auf `[~]` (In Arbeit).
5. **Sync (Push Lock):** Führe `git add TODO.md` aus, dann `git commit -m "chore: start working on [Name der Aufgabe]"` und anschließend `git push`.
6. **Bearbeiten:** Erledige die Aufgabe im Code. Fokussiere dich nur auf diese eine Aufgabe.
7. **Abschluss (Status-Update):** Ändere das Symbol in der `TODO.md` auf `[x]` (Erledigt).
8. **Sync (Push Work):** Führe `git add .` aus, dann `git commit -m "feat/fix: completed [Name der Aufgabe]"` und anschließend `git push`. 
9. **Pause:** Warte danach auf mein Feedback oder die explizite Freigabe für das nächste Todo.

## 3. Technischer Standard & Architektur
- **Erweiterbarkeit (Modularity):** Schreibe modularen, stark entkoppelten Code. Baue Funktionen und Klassen so auf, dass neue Features in Zukunft hinzugefügt werden können, ohne die bestehende Kernlogik umbauen zu müssen (Open/Closed-Prinzip). 
- **Trennung der Zuständigkeiten:** Trenne Datenverarbeitung/Logik immer sauber von der Benutzeroberfläche (UI).
- **Clean Code:** Bevorzuge modernen, lesbaren Code. Vermeide Codeduplikate (DRY - Don't Repeat Yourself).
- **Sprache im Code:** Schreibe ALLE Code-Kommentare, Variablen, Funktionsnamen und Commit-Messages ausschließlich auf **Englisch**. (Unsere Konversation im Chat bleibt auf Deutsch).
- **Fehlerbehandlung:** Wenn ein Befehl fehlschlägt, analysiere den Error-Log selbstständig und versuche, das Problem zu beheben, bevor du mich fragst.
