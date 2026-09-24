-- ============================================================
-- Anti-mise-en-veille Supabase (a lancer UNE SEULE FOIS)
-- Supabase > SQL Editor > New query > coller > Run
-- ------------------------------------------------------------
-- Cree une mini fonction que le robot GitHub Actions appelle
-- chaque jour. Elle ne fait que renvoyer l'heure : ca suffit a
-- declencher une vraie requete SQL, donc le projet est vu comme
-- "actif" et n'est jamais mis en pause.
-- ============================================================

create or replace function public.keepalive()
returns timestamptz
language sql
stable
as $$ select now() $$;

grant execute on function public.keepalive() to anon, authenticated;
