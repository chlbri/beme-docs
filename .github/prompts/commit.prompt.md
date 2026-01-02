# Commit Message Generator Prompt

This prompt helps generate commit messages that comply with the project's
conventions.

## Context

The project follows strict commit conventions defined in
`.github/copilot-instructions.md`.

### Available commit types

- **feat**: new feature (minor version)
- **fix**: bug fix (patch version)
- **hot-fix**: critical bug fix (patch version)
- **docs**: documentation changes/additions (patch version)
- **build**: changes to build files (no versioning)
- **style**: code style changes (no versioning)
- **test**: add/remove tests (patch version)
- **revert**: revert to a previous commit (patch version)

### Structure du message de commit

```
<type>(<scope>): <title in english>

<body in any language, max 200 words>

[BREAKING CHANGE] (if applicable)
chlbri: bri_lvi@icloud.com
```

## Important Rules

1. **Title** (first line):
   - In English
   - Maximum 50 characters
   - Imperative mood: "Add", "Fix", "Update"
   - No period at the end
   - Format: `type(scope): description`

2. **Scope**:
   - In parentheses after the type
   - Name of the affected module/feature/component
   - Examples: `(auth)`, `(ui)`, `(guard)`, `(assets)`

3. **Body** (optional):
   - Blank line after the title
   - In any language (preferably French)
   - Maximum 200 words
   - Explains the WHY, not the how
   - Describes the impact and context

4. **BREAKING CHANGE** (if applicable):
   - Add `[BREAKING CHANGE]` on a new line
   - Describes the compatibility break

5. **Signature** (MANDATORY):
   - Always add on the last line
   - Exact format: `chlbri: bri_lvi@icloud.com`

## Examples of good commits

### Simple feature commit

```
feat(auth): Add email verification flow

Ajout d'un système de vérification par email pour les nouveaux utilisateurs.
Le flow inclut l'envoi d'un email avec un lien de confirmation et la validation
du token.

chlbri: bri_lvi@icloud.com
```

### Fix commit

```
fix(ui): Correct button hover state in dark mode

Le hover sur les boutons primaires n'était pas visible en mode sombre.
Ajustement des couleurs pour améliorer le contraste.

chlbri: bri_lvi@icloud.com
```

### Breaking change

```
feat(api): Update authentication API to use JWT tokens

Migration du système d'authentification de sessions vers JWT.
Tous les clients doivent maintenant inclure le token dans les headers.

[BREAKING CHANGE]
chlbri: bri_lvi@icloud.com
```

### Documentation

```
docs(readme): Update installation instructions

Mise à jour des instructions d'installation pour inclure les nouvelles
dépendances et la configuration de l'environnement.

chlbri: bri_lvi@icloud.com
```

### Style commit

```
style(components): Format code with Prettier

Application des règles de formatage Prettier sur tous les composants
de la feature auth.

chlbri: bri_lvi@icloud.com
```

### Test commit

```
test(auth): Add unit tests for login flow

Ajout de tests unitaires couvrant les cas normaux et les erreurs
du processus de connexion.

chlbri: bri_lvi@icloud.com
```

## Bad examples (to avoid)

❌ **Titles in french**

```
feat(auth): Ajout de la connexion
```

❌ **No scope**

```
feat: Add login
```

❌ **Title too long (> 10 words)**

```
feat(auth): Add a new authentication system with email verification and password reset functionality
```

❌ **Body too long (> 200 words)**

```
feat(auth): Add login

Lorem ipsum dolor sit amet... (300 words)

chlbri: bri_lvi@icloud.com
```

❌ **Missing or incorrect signature**

```
feat(auth): Add login

Ajout de la connexion utilisateur.
```

## Task

When this prompt is invoked:

1. **Analyze** the changes made (staging area)
2. **Identify** the appropriate commit type
3. **Determine** the main scope
4. **Generate** a commit message following EXACTLY the format above
5. **Verify** that all rules are respected

## Questions to ask

- What is the type of change? (feat, fix, docs, etc.)
- Which module/feature is impacted? (scope)
- What is the most concise description in English?
- Why is this change necessary? (body in French)
- Is there a breaking change?

## Expected Output

Display only the formatted commit message, ready to be copy-pasted.

Format:

```
type(scope): Short title in english

Corps explicatif en français si nécessaire.

[BREAKING CHANGE]
chlbri: bri_lvi@icloud.com
```

## N.B: No comments before or after, the commit must be ready to be copy-pasted.
