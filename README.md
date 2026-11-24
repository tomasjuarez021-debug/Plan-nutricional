# Plan — plan nutricional semanal

App Expo (web + iOS/Android) para seguir el plan ovolactovegetariano de 2 personas.

- **Hoy**: últimos 7 días en círculos (se llenan a medida que marcás comidas), selector Él/Ella y las comidas del día con su porción. Tocar una comida abre el detalle con porciones de ambos e ingredientes.
- **Semana**: el plan completo por día, reglas, suplementación y ajustes.
- **Compras**: lista generada del plan por **Verdulería / Supermercado / Dietética**, para los días y personas que elijas. Legumbres y cereales se pasan a seco. Se puede tachar y compartir (WhatsApp, etc.).

Los datos del plan están en `src/data/plan.ts`; si cambia el plan, se edita ahí.

```bash
npm install
npm run web      # o: npx expo start
```

Deploy en Vercel: importar el repo tal cual (ya trae `vercel.json`).
