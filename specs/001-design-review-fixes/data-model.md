# Data Model: Design Review Fixes

**Branch**: `001-design-review-fixes` | **Date**: 2026-03-14

## Overview

This feature does not introduce new data entities. All changes affect existing UI components, translation strings, and CSS tokens. This document captures the translation key additions that extend the existing i18n data structure.

## Translation Key Additions

### Entity: Translation Object (`lib/translations.ts`)

The translation object is a nested TypeScript record keyed by language code (es, en, fr). Each key maps to a string value.

**New keys to add** (shown with ES values as reference):

| Key Path | ES | EN | FR | Source Requirement |
|----------|----|----|----|--------------------|
| `contact.header` | "Contáctenos" | "Contact Us" | "Contactez-nous" | FR-006 (typo fix) |
| `contact.sending` | "Enviando..." | "Sending..." | "Envoi en cours..." | FR-004 |
| `contact.toast.success` | "Mensaje enviado" | "Message sent!" | "Message envoyé" | FR-004 |
| `contact.toast.successDescription` | "Nos pondremos en contacto pronto." | "We'll get back to you soon." | "Nous vous répondrons bientôt." | FR-004 |
| `contact.toast.error` | "Error" | "Error" | "Erreur" | FR-004 |
| `contact.toast.errorDescription` | "Algo salió mal. Intente de nuevo." | "Something went wrong. Please try again." | "Une erreur est survenue. Réessayez." | FR-004 |
| `contact.toast.validationError` | "Revise los campos del formulario." | "Please check the form fields." | "Veuillez vérifier les champs." | FR-004 |
| `team.roles.ceo` | "CEO - Estrategia y Visión" | "CEO - Strategy & Vision" | "CEO - Stratégie et Vision" | FR-005 |
| `team.roles.cpo` | "CPO - Producto e Innovación" | "CPO - Product & Innovation" | "CPO - Produit et Innovation" | FR-005 |
| `team.roles.cdo` | "CDO - Ciencia de Datos e IA" | "CDO - Data Science & AI" | "CDO - Science des données et IA" | FR-005 |
| `team.roles.cco` | "CCO - Negocios y Crecimiento" | "CCO - Business & Growth" | "CCO - Commerce et Croissance" | FR-005 |
| `projects.status.inDevelopment` | "En Desarrollo" | "In Development" | "En développement" | FR-005 |
| `hero.floating.revenueValue` | "Geometría + atributos" | "Geometry + attributes" | "Géométrie + attributs" | FR-005 |
| `hero.floating.insightsValue` | "Capas · filtros" | "Layers · filters" | "Couches · filtres" | FR-005 |
| `hero.floating.dataValue` | "Consulta + visualización" | "Query + visualization" | "Requête + visualisation" | FR-005 |

### Entity: CSS Design Token (`globals.css`)

**Modified tokens** (no new tokens added):

| Token | Old Value | New Value | Scope |
|-------|-----------|-----------|-------|
| `--accent` | `#2EB1C3` | `oklch(0.69 0.11 200)` | `:root` and `.dark` |
| `--ring` | `#2EB1C3` | `oklch(0.69 0.11 200)` | `:root` and `.dark` |
| `--chart-1` | `#2EB1C3` | `oklch(0.69 0.11 200)` | `:root` and `.dark` |
