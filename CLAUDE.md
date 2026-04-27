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

1. **System-Agnostischer Sync:** Führe `git checkout master` und anschließend `git pull` aus. Verwende immer die nativen Git-Befehle des aktuellen Terminals.
2. **Abwarten bei Fehlern:** Wenn Git einen Fehler wirft, versuche NICHT, das Projekt anderweitig zu lesen. Brich ab und präsentiere mir den exakten Fehler.
3. **Aufgabe wählen (Strict Lock Rule):** Lies die `TODO.md`. 
   - Wähle **NUR** die oberste Aufgabe, die den Status `[ ]` (Offen) hat UND entweder das Tag `@Claude` trägt oder noch keinem zugewiesen ist.
   - **Rühre NIEMALS Aufgaben an, die auf `[~]` (In Arbeit) oder `[x]` (Erledigt) stehen.** 4. **Lock (Zuweisung & Status):** Trage `@Claude` hinter der gewählten Aufgabe ein und ändere das Symbol von `[ ]` auf `[~]`. 
5. **Push Lock:** Führe aus: `git add TODO.md`, gefolgt von `git commit -m "chore: Claude locked task"` und `git push`.
6. **Branch erstellen:** Erstelle einen neuen Zweig für deine Arbeit: `git checkout -b claude/feat-[kurzer-task-name]`
7. **Bearbeiten:** Erledige die Aufgabe im Code. Fokussiere dich ausschließlich auf diese eine Funktionalität.
8. **Abschluss & Push (Feature-Branch):** Ändere das Symbol in der `TODO.md` auf `[x]`. Führe aus: `git add .`, danach `git commit -m "feat: completed task"` und pushe den Branch mit `git push -u origin HEAD`.
9. **Review:** Warte auf mein Feedback oder meinen Test.
10. **Merge (NUR auf Bestätigung):** Wenn ich explizit sage "Sieht gut aus, merge das" oder ähnlich, führe aus: `git checkout master`, dann `git pull` (um Konflikte zu vermeiden), dann `git merge claude/feat-[kurzer-task-name]` und abschließend `git push`.

## 3. Technischer Standard & Architektur
- **Erweiterbarkeit (Modularity):** Schreibe modularen, stark entkoppelten Code. Baue Funktionen und Klassen so auf, dass neue Features in Zukunft hinzugefügt werden können, ohne die bestehende Kernlogik umbauen zu müssen (Open/Closed-Prinzip). 
- **Trennung der Zuständigkeiten:** Trenne Datenverarbeitung/Logik immer sauber von der Benutzeroberfläche (UI).
- **Clean Code:** Bevorzuge modernen, lesbaren Code. Vermeide Codeduplikate (DRY - Don't Repeat Yourself).
- **Sprache im Code:** Schreibe ALLE Code-Kommentare, Variablen, Funktionsnamen und Commit-Messages ausschließlich auf **Englisch**. (Unsere Konversation im Chat bleibt auf Deutsch).
- **Fehlerbehandlung:** Wenn ein Befehl fehlschlägt, analysiere den Error-Log selbstständig und versuche, das Problem zu beheben, bevor du mich fragst.

## 4. Workflow: Neue Todos hinzufügen
Wenn ich sage "Füge die folgende Todo ein: [Beschreibung]" oder ähnlich, folge diesem Ablauf:

1. **Sync:** Führe `git checkout master` und `git pull` aus.
2. **Doubletten-Check:** Lies die `TODO.md` und prüfe, ob bereits eine Aufgabe mit einer sehr ähnlichen Beschreibung existiert.
   - **Falls ja:** Nenne mir die existierende Aufgabe und frage explizit nach.
   - **Falls nein:** Fahre fort.
3. **Einfügen:** Füge die neue Aufgabe am Ende des passenden Abschnitts ein (Format: `- [ ] [Beschreibung]`).
4. **Sync & Push:** Führe `git add TODO.md`, `git commit -m "chore: add new todo: [Beschreibung]"` und `git push` aus.
5. **Bestätigung:** Gib mir eine kurze Rückmeldung.

## 5. Allgemeiner Feature-Workflow (Direkte Anweisungen)
Ausnahme von den Sicherheitsregeln bezüglich Git. Wenn ich dir eine direkte Anweisung gebe, etwas zu bauen (z.B. "Baue Feature X ein" oder "Passe das Layout an"), ohne den Todo-Workflow zu triggern, nutze diesen Ablauf:

1. **Sync:** Führe `git checkout master` und `git pull` aus.
2. **Branch erstellen:** Erstelle einen aussagekräftigen neuen Zweig: `git checkout -b claude/feat-[feature-name]`
3. **Bearbeiten:** Implementiere die gewünschte Änderung im Code.
4. **Push (Feature-Branch):** Führe `git add .`, gefolgt von `git commit -m "feat/fix: [kurze Beschreibung]"` und `git push -u origin HEAD` aus.
5. **Review:** Präsentiere mir die Änderungen und warte auf mein Feedback.
6. **Merge (NUR auf Bestätigung):** Nach meiner expliziten Freigabe zum Mergen, führe aus: `git checkout master`, danach `git pull`, `git merge claude/feat-[feature-name]` und schließlich `git push`.