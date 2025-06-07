--
-- File for all kinds of helping tables / views included
--

drop view if exists pilkarz_klub cascade;
create or replace view pilkarz_klub  as (
    select id_pilkarza, imie || ' ' || nazwisko as imie_nazwisko, daj_ostatni_obowiazujacy_klub_pilkarza(id_pilkarza, CURRENT_DATE) as id_klubu,
    (select nazwa from kluby where id_klubu = daj_ostatni_obowiazujacy_klub_pilkarza(id_pilkarza, CURRENT_DATE)) as nazwa_klubu
    from pilkarze
    order by id_pilkarza
);