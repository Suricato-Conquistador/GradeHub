--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_users_userType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_users_userType" AS ENUM (
    '0',
    '1',
    '2'
);


ALTER TYPE public."enum_users_userType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeData" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeData" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: grades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grades (
    id integer NOT NULL,
    grade numeric NOT NULL,
    "subjectId" integer NOT NULL,
    "studentId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.grades OWNER TO postgres;

--
-- Name: grades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grades_id_seq OWNER TO postgres;

--
-- Name: grades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grades_id_seq OWNED BY public.grades.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "teacherId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "userType" public."enum_users_userType",
    "userCode" character varying(255),
    name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: subject_students_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.subject_students_view AS
 SELECT u.id AS student_id,
    u.name AS student_name,
    u."userCode" AS student_code,
    g.grade,
    s.id AS subject_id,
    s.name AS subject_name
   FROM ((public.grades g
     JOIN public.subjects s ON ((g."subjectId" = s.id)))
     JOIN public.users u ON ((g."studentId" = u.id)))
  WHERE ((u."deletedAt" IS NULL) AND (s."deletedAt" IS NULL) AND (g."deletedAt" IS NULL));


ALTER VIEW public.subject_students_view OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subjects_id_seq OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: grades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades ALTER COLUMN id SET DEFAULT nextval('public.grades_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeData; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeData" (name) FROM stdin;
20250429234545-test-teacher.js
20250430323232-subjects.js
2025052933333-grades.js
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250417234300-create-user.js
20250418660666-subject.js
20250428205233-create-grade.js
20250519175449-create-subject-students-view.js
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grades (id, grade, "subjectId", "studentId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	8	2	5	2025-06-02 17:58:30.4-03	2025-06-02 17:58:30.4-03	\N
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, name, "teacherId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	História	2	2025-06-02 17:58:30.362-03	2025-06-02 17:58:30.362-03	\N
2	Filosofia	3	2025-06-02 17:58:30.362-03	2025-06-02 17:58:30.362-03	\N
3	Sociologia	3	2025-06-02 17:58:30.362-03	2025-06-02 17:58:30.362-03	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "userType", "userCode", name, email, password, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	0	1234567890123	Admin	admin@gmail.com	$2b$10$B77c.Jv2J/lbur19vmQ.B.YY91jVkRJVtIeEPRgqnotwGB3LIVTb2	2025-06-02 17:58:29.668-03	2025-06-02 17:58:29.668-03	\N
2	1	1111111111111	Rubens da Costa	rubens@gmail.com	$2b$10$fbjzrAI/6ZQy3DUX99tYgu3L9zfEdtSoUkAXMdQowl7hxUMa.pQsy	2025-06-02 17:58:29.668-03	2025-06-02 17:58:29.668-03	\N
3	1	2222222222222	Vitor Henrique	vitor@gmail.com	$2b$10$JwCiX1EkoJ84mudM8JkRT.Wcaco2tHJ3DDoZxS1T224iu34VGl/W2	2025-06-02 17:58:29.668-03	2025-06-02 17:58:29.668-03	\N
4	2	3333333333333	João Eduardo	joao@gmail.com	$2b$10$0cLNOJ2PONOH.RcQzxQV..QmbKzKHLzahMt7xGRf6LeVwLyuRXgMe	2025-06-02 17:58:29.668-03	2025-06-02 17:58:29.668-03	\N
5	2	4444444444444	Sandro Roberto	sandro@gmail.com	$2b$10$UeUDRIdo7.vPbeFU1aYQSeOdIU8z5QdGPu2H9G6W9LoCT.7yzdvzy	2025-06-02 17:58:29.668-03	2025-06-02 17:58:29.668-03	\N
\.


--
-- Name: grades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grades_id_seq', 1, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: SequelizeData SequelizeData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeData"
    ADD CONSTRAINT "SequelizeData_pkey" PRIMARY KEY (name);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: grades grades_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT "grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public.users(id);


--
-- Name: grades grades_subjectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT "grades_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES public.subjects(id);


--
-- Name: subjects subjects_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT "subjects_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

