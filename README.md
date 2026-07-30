# Aetherium Remote-Viewing Trainer

![Aetherium remote-viewing trainer cover](assets/recruiter/cover.png)

> **Portfolio lens:** A staged practice experience that guides attention from onboarding through feedback, while staying candid about its client-side limitations.

Aetherium is a React/Vite exercise app for running a remote-viewing session from onboarding to feedback. It supports configured targets, timed or self-paced sessions, note-taking, and Gemini-assisted feedback at the reveal stage.

The target identifier and entropy score are session values. This is a client-side practice tool, not a cryptographic target-sealing system, and it does not keep a server-side training history.

## Local run

```bash
npm install
```

Create `.env.local` beside `package.json`:

```env
GEMINI_API_KEY=your_key
```

Run `npm run dev` while working on the app. `npm run build` produces a production bundle and `npm run preview` serves that bundle locally.

The key is exposed to the browser by the Vite configuration, so use a restricted Gemini key and keep `.env.local` out of version control.
