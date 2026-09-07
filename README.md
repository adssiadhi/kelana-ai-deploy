# kelana-ai

kelana-ai adalah aplikasi asisten perjalanan cerdas berbasis AI (*AI-Native Travel Planner*) yang menggabungkan kecerdasan **Amazon Bedrock (Generative AI)**, kecepatan dan keandalan **FastAPI (Python REST API)**, persistensi **PostgreSQL (SQLAlchemy ORM)**, autentikasi **JWT & BCrypt**, serta antarmuka modern multi-halaman **Next.js 15 (React 19 & Tailwind CSS)**.

---

## Struktur Proyek & Clean Architecture

Aplikasi dibangun dengan prinsip **Clean Architecture & Separation of Concerns**:

```text
kelana-ai/
├── .env.example
├── .gitignore
├── README.md
├── requirements.txt
├── knowledge-docs/
│   ├── south-korea-travel-guide.md
│   ├── singapore-travel-guide.md
│   ├── japan-travel-insurance-and-customs.md
│   └── vietnam-travel-guide.md
├── scripts/
│   ├── sync_knowledge_base.sh
│   └── run_rag_evaluation.py
├── backend/
│   ├── database.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── trip.py
│   │   ├── conversation.py
│   │   └── message.py
│   └── services/
│       ├── __init__.py
│       ├── auth_service.py
│       ├── trip_service.py
│       ├── bedrock_service.py
│       ├── kb_service.py
│       └── conversation_service.py
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── favicon.ico
│   │   ├── page.tsx
│   │   ├── chat/page.tsx
│   │   ├── assistant/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── profile/page.tsx
│   │   └── trips/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TravelForm.tsx
│   │   ├── TripCard.tsx
│   │   ├── Pagination.tsx
│   │   ├── ItineraryResult.tsx
│   │   ├── FormattedText.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── DestinationShowcase.tsx
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   ├── context/AuthContext.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   ├── tripService.ts
│   │   ├── assistantService.ts
│   │   └── chatService.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── parser.ts
│   └── types/index.ts
└── tests/
    ├── test_api.py
    ├── test_bedrock_service.py
    ├── test_conversation.py
    ├── test_kb_service.py
    └── test_trip_service.py
```

---

## Fitur & Milestone Pengembangan

### 1. Sesi 1: Trip Summary Generator (Console App)
- Menerima data input perjalanan (destinasi, durasi hari, anggaran, mata uang, dan bulan keberangkatan).
- Menampilkan ringkasan informasi perjalanan terstruktur pada antarmuka konsol.

### 2. Sesi 2: Recommendation Engine & Layered Architecture
- **Layered Architecture**: Pemisahan antarmuka pengguna (`backend/main.py`) dengan logika bisnis (`backend/services/trip_service.py`).
- **Kategori Perjalanan**: `< 1000 USD` -> `Backpacker`, `1000 - 3000 USD` -> `Standard`, `> 3000 USD` -> `Luxury`.
- **Kategori Season**: `December` -> `Peak Season`, `June` -> `Holiday Season`, lainnya -> `Regular Season`.
- **Kalkulasi Anggaran Harian**: `budget / days`.

### 3. Sesi 3: REST API dengan FastAPI
- **Web Layer (REST API)**: REST API berbasis FastAPI.
- **Model Validasi Pydantic**: Validasi otomatis payload request dan serialisasi respons.
- **Dokumentasi Interaktif**: Swagger UI di `/docs` dan ReDoc di `/redoc`.

### 4. Sesi 4: Persistence Layer & CRUD API
- **Persistence Layer**: Integrasi PostgreSQL menggunakan ORM SQLAlchemy.
- **Full CRUD Endpoints**: `POST`, `GET`, `PUT`, dan `DELETE` untuk data perjalanan.

### 5. Sesi 5: Amazon Bedrock Integration
- **AI-Native Transformation**: Integrasi Amazon Bedrock Foundation Models (Amazon Nova Lite / Claude).
- **Richer Prompt Engineering**: Rencana perjalanan harian terbagi *Morning*, *Afternoon*, dan *Evening*.
- **Endpoint Generasi AI**: `POST /api/v1/trips/{id}/generate`.

### 6. Sesi 6: Next.js Frontend & Tailwind CSS
- **Modern Web Interface**: Next.js 15, React 19, TypeScript, Tailwind CSS.
- **Interactive Travel Planner Form**: Real-time daily budget calculation dan kategori otomatis.

### 7. Sesi 7: Trip History Dashboard & Multi-Page Flow
- **Multi-Page App Routing**: `/` (Home), `/trips` (Dashboard), `/trips/[id]` (Detail View).
- **DB-First Reads Architecture**: Riwayat trip dibaca langsung dari PostgreSQL.
- **Paginasi & Pencarian Interaktif**: Filter kategori, gaya liburan, dan sorting dinamis.

### 8. Sesi 8: Authentication, Authorization & Data Ownership
- **Authentication & Identity System (AuthN)**:
  - Model `User` dengan `name`, `email` unik, `password_hash` (bcrypt).
  - JSON Web Tokens (**JWT**) stateless authentication (HS256).
  - Endpoint `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`.
- **Authorization & Ownership Protection (AuthZ)**:
  - Foreign key `user_id` pada tabel `trips`.
  - Backend menetapkan kepemilikan langsung dari payload JWT terverifikasi.
  - **View: Only own trips**: `GET /api/v1/trips` memfilter `Trip.user_id == user.id`.
  - **Reject other users' trips**: Status **HTTP 403 (Forbidden)**.
- **Frontend Authentication & Protected Routes**:
  - Halaman **Login** (`/login`) dan **Register** (`/register`).
  - Halaman **Profile** (`/profile`) menampilkan nama, email, dan total trip.
  - **Route Protection (`ProtectedRoute.tsx`)**: Mengunci halaman terproteksi.

### 9. Sesi 9: Amazon Bedrock Knowledge Bases & RAG
- **Retrieval-Augmented Generation (RAG)**:
  - Mengatasi keterbatasan LLM (halusinasi & knowledge cutoff).
  - Mendukung **Amazon Bedrock Knowledge Bases** & Local Grounded Retriever.
- **Travel Knowledge Base Documents (`knowledge-docs/`)**:
  - `south-korea-travel-guide.md`: K-ETA, T-Money, threshold instant tax refund (15.000 KRW).
  - `singapore-travel-guide.md`: SG Arrival Card, transit SimplyGo, larangan permen karet (denda SGD 1.000).
  - `japan-travel-insurance-and-customs.md`: Visit Japan Web QR, aturan obat Yakkan Shoumei.
  - `vietnam-travel-guide.md`: 90-Day e-Visa ($25 single / $50 multi), taksi terpercaya Mai Linh & Vinasun.
- **Interactive Travel Assistant UI (`/assistant`)**:
  - Source Citations dan Side-by-Side Comparison (Base Model vs Grounded RAG).
- **Scripts & Otomasi**:
  - `scripts/sync_knowledge_base.sh`: Sinkronisasi dokumen ke S3 & Bedrock Ingestion Job.
  - `scripts/run_rag_evaluation.py`: Evaluasi 5 pertanyaan spesifik.

### 10. Sesi 10: Conversational Memory & Multi-turn Chat
- **Conversational Memory Architecture**:
  - Tabel `conversations` dan `messages` dengan Prompt Builder & Context Window Trimming.
- **Conversational Memory REST Endpoints**:
  - `POST /api/v1/conversations`: Membuat sesi percakapan baru.
  - `GET /api/v1/conversations`: Daftar percakapan milik pengguna.
  - `GET /api/v1/conversations/{id}`: Detail sesi dan riwayat pesan.
  - `POST /api/v1/conversations/{id}/messages`: Kirim pesan, rekonsrtuksi multi-turn, panggil Bedrock.
  - `PATCH /api/v1/conversations/{id}`: Rename percakapan.
  - `DELETE /api/v1/conversations/{id}`: Hapus sesi beserta pesannya (cascade).
- **Next.js Chat Experience (`/chat`)**:
  1. Conversation title dengan kontrol edit/rename.
  2. Auto-scroll to latest message.
  3. Typing indicator (3 bouncing dots).
  4. Timestamp untuk setiap pesan.

---

## Desain UI

Antarmuka menggunakan skema warna **grayscale** (neutral-*), font **Poppins** (weight 300-900), dan sudut **chamfered/beveled** menggunakan `clip-path: polygon()`.

### Prinsip Desain
- **Grayscale only**: Tidak ada warna berwarna; semua elemen menggunakan `neutral-*` Tailwind.
- **Chamfered corners**: Sudut tajam/beveled menggunakan `clip-chamfer`, `clip-chamfer-sm`, `clip-chamfer-lg`.
- **No emojis**: Semua ikon menggunakan lucide-react (outline/transparent).
- **Logo**: Huruf "K" dengan font-light, brand name `kelana-ai` (lowercase, font-light, tracking-tighter).

---

## Cara Menjalankan Aplikasi

Jalankan backend dan frontend secara bersamaan menggunakan dua terminal terpisah.

### 1. Backend (FastAPI + PostgreSQL + Auth + RAG)

1. Buat file konfigurasi `.env` dari template:
```bash
cp .env.example .env
```

2. Sesuaikan konfigurasi di `.env`:
```env
DATABASE_URL=postgresql+psycopg2://postgres:admin@localhost:5432/kelana_db
AWS_REGION=ap-southeast-2
MODEL_ID=amazon.nova-lite-v1:0
AWS_BEARER_TOKEN_BEDROCK=sk-bedrock-xxxxxxxxxxxxxxxxxxxx
JWT_SECRET_KEY=your-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440
BEDROCK_KNOWLEDGE_BASE_ID=your-knowledge-base-id-optional
```

3. Install dependensi dan jalankan server:
```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

- **REST API Endpoint**: `http://localhost:8000`
- **Swagger API Docs**: `http://localhost:8000/docs`

### 2. Frontend (Next.js)

1. Buka terminal baru:
```bash
cd frontend
npm install
npm run dev
```

2. Buka di browser:
- **Home / Generator**: http://localhost:3000
- **Conversational AI Chat**: http://localhost:3000/chat
- **AI Travel Assistant (RAG)**: http://localhost:3000/assistant
- **Trip History Dashboard**: http://localhost:3000/trips
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **User Profile**: http://localhost:3000/profile

---

## Menjalankan Pengujian Otomatis (Testing)

```bash
pytest -v
```

---

## Dokumentasi Endpoint REST API

| Method | Endpoint | Auth Required | Deskripsi |
| :--- | :--- | :---: | :--- |
| `GET` | `/` | No | Root welcome message |
| `GET` | `/health` | No | Server health check status |
| `POST` | `/api/v1/auth/register` | No | Mendaftarkan akun baru & menghasilkan JWT |
| `POST` | `/api/v1/auth/login` | No | Verifikasi kredensial & menghasilkan JWT |
| `GET` | `/api/v1/auth/me` | **Bearer JWT** | Mengambil profil dan statistik pengguna |
| `POST` | `/api/v1/trips` | **Bearer JWT** | Membuat trip baru (ownership otomatis) |
| `GET` | `/api/v1/trips` | **Bearer JWT** | Mengambil daftar perjalanan milik pengguna |
| `GET` | `/api/v1/trips/{id}` | **Bearer JWT** | Mengambil detail trip (403 jika bukan pemilik) |
| `PUT` | `/api/v1/trips/{id}` | **Bearer JWT** | Memperbarui trip (403 jika bukan pemilik) |
| `DELETE` | `/api/v1/trips/{id}` | **Bearer JWT** | Menghapus trip (403 jika bukan pemilik) |
| `POST` | `/api/v1/trips/{id}/generate` | **Bearer JWT** | Menghasilkan rekomendasi AI (403 jika bukan pemilik) |
| `POST` | `/api/v1/assistant` | No | Bertanya ke AI Travel Assistant (RAG + Sitasi) |
| `POST` | `/api/v1/ask` | No | Alias endpoint RAG |
| `POST` | `/api/v1/assistant/compare` | No | Bandingkan Base Model vs Grounded RAG |
| `GET` | `/api/v1/assistant/documents` | No | Daftar dokumen di Knowledge Base |
| `POST` | `/api/v1/conversations` | **Bearer JWT** | Membuat sesi percakapan baru |
| `GET` | `/api/v1/conversations` | **Bearer JWT** | Daftar riwayat percakapan |
| `GET` | `/api/v1/conversations/{id}` | **Bearer JWT** | Detail sesi dan riwayat pesan |
| `GET` | `/api/v1/conversations/{id}/messages` | **Bearer JWT** | Daftar pesan terurut kronologis |
| `POST` | `/api/v1/conversations/{id}/messages` | **Bearer JWT** | Kirim pesan, rekonsruksi multi-turn, panggil Bedrock |
| `PATCH` | `/api/v1/conversations/{id}` | **Bearer JWT** | Rename percakapan |
| `DELETE` | `/api/v1/conversations/{id}` | **Bearer JWT** | Hapus sesi beserta pesannya (cascade) |
