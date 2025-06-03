--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: deletedIds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."deletedIds" (
    id integer NOT NULL,
    number integer NOT NULL
);


ALTER TABLE public."deletedIds" OWNER TO postgres;

--
-- Name: deletedIds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."deletedIds_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."deletedIds_id_seq" OWNER TO postgres;

--
-- Name: deletedIds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."deletedIds_id_seq" OWNED BY public."deletedIds".id;


--
-- Name: deletedIds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."deletedIds" ALTER COLUMN id SET DEFAULT nextval('public."deletedIds_id_seq"'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250528112755-create-deleted-ids.js
\.


--
-- Data for Name: deletedIds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."deletedIds" (id, number) FROM stdin;
\.


--
-- Name: deletedIds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."deletedIds_id_seq"', 1, false);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: deletedIds deletedIds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."deletedIds"
    ADD CONSTRAINT "deletedIds_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

