--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.6

-- Started on 2023-01-15 17:56:14 +04

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg-admin
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO "pg-admin";

--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg-admin
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16668)
-- Name: comment; Type: TABLE; Schema: public; Owner: pg-admin
--

CREATE TABLE public.comment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    text character varying NOT NULL,
    "trackId" uuid
);


ALTER TABLE public.comment OWNER TO "pg-admin";

--
-- TOC entry 210 (class 1259 OID 16660)
-- Name: track; Type: TABLE; Schema: public; Owner: pg-admin
--

CREATE TABLE public.track (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    artist character varying NOT NULL,
    text character varying NOT NULL,
    listens integer NOT NULL,
    picture character varying,
    audio character varying
);


ALTER TABLE public.track OWNER TO "pg-admin";

--
-- TOC entry 3328 (class 0 OID 16668)
-- Dependencies: 211
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: pg-admin
--

COPY public.comment (id, username, text, "trackId") FROM stdin;
d053f2ec-ba9d-453a-ba7a-76846b24fe10	Erik	Nice movie, soundtrack is FIRE	d2957b7d-5b29-43d0-95ab-e3989aa068c3
1ad95faa-b610-4891-9df2-255347a507b8			d2957b7d-5b29-43d0-95ab-e3989aa068c3
\.


--
-- TOC entry 3327 (class 0 OID 16660)
-- Dependencies: 210
-- Data for Name: track; Type: TABLE DATA; Schema: public; Owner: pg-admin
--

COPY public.track (id, name, artist, text, listens, picture, audio) FROM stdin;
9a955fa9-ba2e-4c64-bd08-ff6e4c5ea981	Track 1	Artist 1	some text here	0	image/a5972120-c812-433c-9aff-09d339b4cca8.jpg	audio/dcffd57e-d2bd-4aea-acab-9938e0a10d84.mp3
812ecb4b-54e7-4e96-aa84-1591ddeb83b7	Track 2	Artist 2	some text here 2	0	image/ad09a65a-7764-4d96-884c-8a8ac575e67b.jpg	audio/2f5f04df-1278-47f2-9e9a-f439e1a88d05.mp3
20c85c0c-9ce1-43a3-8e3a-f0fe05188532	Track 3	Artist 3	some text here 3	0	image/6eb131ab-c53d-4241-bee4-4dc056306ff2.jpg	audio/db0097ee-e05f-4d3d-ae63-d78f43de7489.mp3
d2957b7d-5b29-43d0-95ab-e3989aa068c3	Brave Heart	William Volas	La la la	0	image/30781675-7a4b-4284-a62d-7f696ac04841.jpg	audio/37fc7204-521e-4895-8735-18c6d2bf40e9.mp3
\.


--
-- TOC entry 3184 (class 2606 OID 16667)
-- Name: track PK_0631b9bcf521f8fab3a15f2c37e; Type: CONSTRAINT; Schema: public; Owner: pg-admin
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16675)
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: pg-admin
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 16676)
-- Name: comment FK_199dfc5d0837739bd0a190062c1; Type: FK CONSTRAINT; Schema: public; Owner: pg-admin
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_199dfc5d0837739bd0a190062c1" FOREIGN KEY ("trackId") REFERENCES public.track(id);


-- Completed on 2023-01-15 17:56:14 +04

--
-- PostgreSQL database dump complete
--

