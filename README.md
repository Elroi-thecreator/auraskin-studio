# ✨ AuraSkin Studio

> **Clinical Skin Intelligence Meets Corrective Virtual Try-On**  
> *Developed for the [YouCam API Skin AI & eCommerce VTO Hackathon](https://youcam-api-skin-ai-ecommerce.devpost.com/) hosted by Perfect Corp on Devpost.*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![YouCam API](https://img.shields.io/badge/Perfect%20Corp-YouCam%20API-f43f5e?style=for-the-badge)](https://docs.perfectcorp.com/)

---

## 🌟 The Big Idea & Value Proposition

Traditional digital beauty platforms are divided into two isolated silos:
1. **Clinical Diagnostic Scanners:** Give users cold, overwhelming numbers about wrinkles, acne, and redness without providing instant cosmetic relief.
2. **Virtual Try-On (VTO) Filters:** Offer superficial makeup layers without understanding or treating the user's underlying skin health.

**AuraSkin Studio bridges this divide into a seamless, high-converting customer journey:**
* **Diagnose Clinically:** High-precision quantitative scan across 10 skin health indicators, computing biological skin age and pinpointing problem-area clusters.
* **Beautify Instantly:** Uses **YouCam Look VTO** to render corrective makeup aesthetics (neutralizing erythema, diffusing enlarged pores, awakening tired eyes) on an interactive before-and-after split slider.
* **Heal Long-Term:** Automatically maps diagnosed concerns to prescription-grade active ingredients (Centella Asiatica, Niacinamide, Retinaldehyde, Ceramides), simulates 4-week cellular recovery, and bundles curated AM/PM regimens for 1-click cart checkout.

---

## 🚀 Key Features

### 1. Multi-Input Subject Ingestion
* **3 Benchmark Clinical Personas:** Instant 1-click testing across diverse skin types and concerns:
  * **Maya Chen (Age 26):** Reactive barrier, T-zone acne & erythema.
  * **Elena Rostova (Age 44):** Periorbital fine lines, sun damage & dehydration.
  * **Chloe Jordan (Age 31):** Midface pore dilation, post-inflammatory marks & sebum imbalance.
* **Live Webcam Scanner:** Real-time camera feed with face-alignment oval guide and 3-second countdown.
* **Custom Photo Upload:** Drag-and-drop or upload any selfie image.

### 2. YouCam Clinical Skin Diagnostic (`/api/youcam/analyze`)
* **0–100 YouCam Health Score:** Radial animated gauge representing multi-spectral composite vitality.
* **Biological Skin Age Meter:** Compares biological skin age against chronological age.
* **10 Granular Clinical Concern Metrics:** Wrinkles, Pores, Texture, Acne, Spots, Redness, Oiliness, Dark Circles, Moisture, Radiance.
* **Interactive Hotspot Heatmaps:** Toggleable visual masks with pulsating crosshair pins and localized clinical rationales.

### 3. "From Diagnostic to Glam" Look VTO (`/api/youcam/vto`)
* **Interactive Split-Screen Slider:** Smooth draggable divider comparing raw clinical skin vs. YouCam Virtual Try-On look side-by-side.
* **4 Curated Aesthetic Looks:**
  * **Clean Girl Radiant:** Redness neutralizer & dewy peptide glow.
  * **Golden Hour Radiance:** Sunlit warmth & velvet contour.
  * **Soft Sunset Editorial:** Periorbital awakening & crushed blackberry lip.
  * **Minimalist Youth Dew:** Optical silica pore blurring & sheer balm.
* **Rendered SKU Breakdown:** Displays specific complexion, cheek, and lip products applied to achieve the look.

### 4. 4-Week Skin Health Journey Simulation
* Interactive predictive model tracking cellular repair:
  * **Week 1:** Barrier Stabilization (Ceramide lipid replenishment).
  * **Week 2:** Cellular Turnover Boost (Sebocyte balance).
  * **Week 3:** Dermal Matrix Synthesis (Collagen I & III stimulation).
  * **Week 4:** Peak Clinical Radiance (-3.2 years biological skin age).

### 5. Curated AM/PM Regimen & 1-Click eCommerce Bag
* Formulates step-by-step Morning Shield (AM) and Evening Cellular Repair (PM) routines.
* Slide-over bag drawer with item adjusters, bundle discount codes (`AURASKIN18`), and checkout simulation.

### 6. Developer & Judge Telemetry Console
* Live inspector displaying exact HTTP request payloads, response bodies, latency (ms), and status codes.
* Built-in API key switcher allowing judges to test on live YouCam production servers or zero-friction offline demo mode.

---

## 🛠️ Technical Architecture

```
[ Browser / Client ]
       │
       ▼
[ Next.js 14 App Router ]
 ├── UI Components (Split-Slider, Heatmaps, CameraModal, RegimenBuilder, CartDrawer)
 ├── /api/youcam/analyze  ──► [ YouCamClient ] ──► [ YouCam S2S REST API ]
 ├── /api/youcam/vto      ──► [ YouCamClient ]     (makeupar.com)
 └── /api/youcam/templates                           │
                                                     ▼
                                      [ Bearer Authentication ]
                                      [ Presigned File Upload ]
                                      [ Async Task Polling ]
```

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Elroi-thecreator/auraskin-studio.git
cd auraskin-studio
npm install
```

### 2. Configure Environment (Optional)
Create a `.env.local` file:
```env
YOUCAM_API_KEY=your_youcam_api_key_here
YOUCAM_API_BASE_URL=https://yce-api-01.makeupar.com
```
*(Note: If no API key is provided, AuraSkin Studio automatically runs in **Interactive Demo Mode** with high-fidelity realistic datasets, guaranteeing 100% testability for judges.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Devpost Pitch Summary

Ready-to-use Devpost text, architectural diagrams, and feature checklists can be opened directly within the app by clicking the **"Devpost Pitch"** button in the navigation header.
