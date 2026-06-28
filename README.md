# Task Management Application

A fullstack task management application built with a separate backend and frontend architecture. The application handles all database communication through a backend API, keeping secure access keys hidden away from the browser.

---

## Architecture & Database Setup

### Architecture Overview

This project uses a layered setup:

* **Frontend:** React web interface built with Vite.


* **Backend:** Node.js server built with Express.


* **Database:** Supabase hosting a PostgreSQL database.



The frontend never connects directly to Supabase. Instead, it sends standard network requests to the Express backend. The backend uses a secure database key to safely read and write data.

### Normalized Database Schema

The database pulls repeating status text items into a separate lookup table so information isn't duplicated across millions of task rows.

```sql
-- Enable UUID generation
create extension if not exists "pgcrypto";

-- STATUS TABLE

create table if not exists statuses (
    id smallint primary key generated always as identity,
    name text unique not null,
    description text,
    created_at timestamptz not null default now()
);

insert into statuses (name, description)
values
('pending','Task has been created but not started'),
('in_progress','Task is actively being worked on'),
('completed','Task has been completed')
on conflict (name) do nothing;

-- TASKS TABLE

create table if not exists tasks (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    status_id smallint not null default 1,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint fk_task_status
        foreign key (status_id)
        references statuses(id)
        on delete restrict
);

-- INDEXES

create index if not exists idx_tasks_status
on tasks(status_id);

create index if not exists idx_tasks_created
on tasks(created_at desc);

```

---

## 🛠️ Installation & Setup

### Prerequisites

* Node.js installed on your machine.
* A Supabase account and project.

### 1. Backend Setup

1. Open your terminal and navigate to the `backend/` folder.
2. Install the necessary packages:
```bash
npm install

```


3. Create a `.env` file based on `.env.example` and add your credentials:


```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_secure_backend_service_role_key

```


4. Start the server:
```bash
npm run dev

```



### 2. Frontend Setup

1. Open your terminal and navigate to the `frontend/` folder.
2. Install the frontend packages:
```bash
npm install

```


3. Create a `.env` file based on `.env.example` to point to the backend server:


```env
VITE_API_BASE_URL=http://localhost:5000/api

```


4. Run the web interface locally:
```bash
npm run dev

```



---

### API Endpoint Reference

All routes below start with the base URL: `http://localhost:5000/api`.

| Method | Endpoint | Purpose | Expects (Body Data) |
| --- | --- | --- | --- |
| **GET** | `/tasks` | Lists tasks with optional search or status filters.| *None* |
| **GET** | `/tasks/:id` | Fetches a single task by its ID.| *None* |
| **POST** | `/tasks` | Adds a new task (defaults to pending status).| `{ "title": "...", "description": "..." }` |
| **PUT** | `/tasks/:id` | Changes a task's title or description text.| `{ "title": "...", "description": "..." }` |
| **PATCH** | `/tasks/:id/status` | Changes only the status category of a task.| `{ "status_name": "in_progress" }` |
| **DELETE** | `/tasks/:id` | Deletes a task permanently.| *None* |

---

## Data Rules & Error Behavior

### Backend Validations

* **Missing Fields:** The API rejects tasks created or updated without a title with a `400 Bad Request` code.

* **Unknown Statuses:** Sending a status name not listed in our status list results in a `400 Bad Request` code.

* **Missing Items:** Requesting, modifying, or deleting an ID that does not exist results in a `404 Not Found` code.



### Frontend Experience

* **Form Checks:** The interface disables form submission buttons if the title field is empty.

* **Visual Indicators:** Loading signs show up while waiting for a response from the network.

* **Smart Network Calls:** Text typing is timed (debounced) so that the app only contacts the server once you pause typing, reducing unnecessary strain on the backend.

