--
-- pilkarze FOREIGN KEY
--

BEGIN;

ALTER TABLE pilkarze
    ADD CONSTRAINT fk_pilkarz_kraj FOREIGN KEY(id_kraju) REFERENCES kraje(id_kraju) DEFERRABLE INITIALLY DEFERRED;

--
-- pilkarz_pozycja FOREIGN KEY
--

ALTER TABLE pilkarz_pozycja
    ADD CONSTRAINT fk_pilkarzpozycja_pilkarz FOREIGN KEY(id_pilkarza) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_pilkarzpozycja_pozycja FOREIGN KEY(id_pozycja) REFERENCES pozycje(id_pozycja) DEFERRABLE INITIALLY DEFERRED;

--
-- kluby FOREIGN KEY
--

ALTER TABLE kluby
    ADD CONSTRAINT fk_klub_stadion FOREIGN KEY(id_stadionu) REFERENCES stadiony(id_stadionu) DEFERRABLE INITIALLY DEFERRED;

--
-- kluby_budzet FOREIGN KEY
--

ALTER TABLE kluby_budzet
    ADD CONSTRAINT fk_klubbudzet_klub FOREIGN KEY(id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED;

--
-- stadiony FOREIGN KEY
--

ALTER TABLE stadiony
        ADD CONSTRAINT fk_stadion_kraj FOREIGN KEY(id_kraju) REFERENCES kraje(id_kraju) DEFERRABLE INITIALLY DEFERRED;

--
-- historia_klub_liga FOREIGN KEY
--

ALTER TABLE historia_klub_liga
        ADD CONSTRAINT fk_historiaklubliga_klub FOREIGN KEY(id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED, 
        ADD CONSTRAINT fk_historiaklubliga_sezon FOREIGN KEY(id_sezonu) REFERENCES sezony(id_sezonu) DEFERRABLE INITIALLY DEFERRED;

--
-- historia_klub_sponsor FOREIGN KEY
--

ALTER TABLE historia_klub_sponsor
        ADD CONSTRAINT fk_historiaklubsponsor_klub FOREIGN KEY(id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED;

--
-- ligi FOREIGN KEY
--

ALTER TABLE ligi
        ADD CONSTRAINT fk_liga_kraj FOREIGN KEY(id_kraju) REFERENCES kraje(id_kraju) DEFERRABLE INITIALLY DEFERRED;

--
-- oferty_transferowe_klub_klub
--

ALTER TABLE oferty_transferowe_klub_klub
        ADD CONSTRAINT fk_agent1 FOREIGN KEY(id_agenta_klubu1) REFERENCES agenci(id_agenta) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_agenta2 FOREIGN KEY(id_agenta_klubu2) REFERENCES agenci(id_agenta) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_oferty_k_k_pilkarze FOREIGN KEY(id_pilkarza) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_oferty_k_k_klubu FOREIGN KEY(id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED;

--
-- oferty_transferowe_klub_pilkarz
--

ALTER TABLE oferty_transferowe_klub_pilkarz
        ADD CONSTRAINT fk_agentp FOREIGN KEY(id_agenta_pilkarza) REFERENCES agenci(id_agenta) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_agentk FOREIGN KEY(id_agenta_klubu) REFERENCES agenci(id_agenta) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_ofertykp_klub FOREIGN KEY (id_klubu) REFERENCES kluby DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_ofertykp_pilkarz FOREIGN KEY (id_pilkarza) REFERENCES pilkarze DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_ofertykp_ofertykk FOREIGN KEY (id_oferty_od_klubu) REFERENCES oferty_transferowe_klub_klub DEFERRABLE INITIALLY DEFERRED;
--
-- transferroom_sprzedaze FOREIGN KEY
--

ALTER TABLE transferroom_sprzedaz
        ADD CONSTRAINT fk_transfer_spr_klub FOREIGN KEY (id_zawodnika) REFERENCES pilkarze DEFERRABLE INITIALLY DEFERRED;
--
-- transferrom_poszukiwania FOREIGN KEY
--

ALTER TABLE transferroom_poszukiwania
    ADD CONSTRAINT fk_tranposz_klub FOREIGN KEY (id_klubu) REFERENCES kluby DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_tranposz_kraj FOREIGN KEY (id_kraju) REFERENCES kraje DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_tranposz_pozycja FOREIGN KEY (id_pozycja) REFERENCES pozycje(id_pozycja) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_tranposz_liga FOREIGN KEY (id_ligi) REFERENCES ligi DEFERRABLE INITIALLY DEFERRED;

--
-- mecze FOREIGN KEY
--

ALTER TABLE mecze
        ADD CONSTRAINT fk_mecz_klub_1 FOREIGN KEY (id_gospodarze) REFERENCES kluby DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_mecz_klub_2 FOREIGN KEY (id_goscie) REFERENCES kluby DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_mecz_stad FOREIGN KEY (id_stadionu) REFERENCES stadiony DEFERRABLE INITIALLY DEFERRED;

--
-- mecz_statystyki_gracze_meczu FOREIGN KEY
--

ALTER TABLE mecz_statystyki_gracze_meczu
        ADD CONSTRAINT fk_meczstatgraczmecz_mecz FOREIGN KEY (id_meczu) REFERENCES mecze(id_meczu) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_meczstatgraczmecz_pilkarz FOREIGN KEY (id_pilkarza) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED;

--
-- mecz_statystyki_zmiany FOREIGN KEY
--

ALTER TABLE mecz_statystyki_zmiany
        ADD CONSTRAINT fk_meczstatzmiana_mecz FOREIGN KEY (id_meczu) REFERENCES mecze(id_meczu) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_meczstatzmiana_pilkarzzchdozi FOREIGN KEY (id_pilkarza_zchodzi) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_meczstatzmiana_pilkarzwchdozi FOREIGN KEY (id_pilkarza_wchodzi) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED;

--
-- mecz_statystyki_wydarzenia_na_boisku FOREIGN KEY
--

ALTER TABLE mecz_statystyki_wydarzenia_na_boisku
        ADD CONSTRAINT fk_meczstatevent_event FOREIGN KEY (id_wydarzenia) REFERENCES mecz_statystyki_wydarzenia DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_meczstatevent_mecz FOREIGN KEY (id_meczu) REFERENCES mecze(id_meczu) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_meczstatevent_pilkarz FOREIGN KEY (id_pilkarza) REFERENCES pilkarze(id_pilkarza) DEFERRABLE INITIALLY DEFERRED;


--
-- kontuzje FOREIGN KEY
--

ALTER TABLE kontuzje
        ADD CONSTRAINT fk_kontuzje_mecz FOREIGN KEY (id_meczu) REFERENCES mecze(id_meczu) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_kontuzje_pilkarz FOREIGN KEY (id_pilkarza) REFERENCES pilkarze DEFERRABLE INITIALLY DEFERRED;

--
-- historia_skauci_kluby FOREIGN KEY
--

ALTER TABLE historia_skauci_kluby
        ADD CONSTRAINT fk_histroia_skaucikluby_kl FOREIGN KEY (id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED;


--
-- skaut_raport FOREIGN KEY
--

ALTER TABLE skaut_raport
        ADD CONSTRAINT fk_skr_sku FOREIGN KEY (id_skauta) REFERENCES skauci(id_skauta) DEFERRABLE INITIALLY DEFERRED;

--
-- raporty FOREIGN KEY
--

ALTER TABLE raporty
        ADD CONSTRAINT fk_skr_rap FOREIGN KEY (id_raportu) REFERENCES skaut_raport(id_raportu) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_rap_z_w FOREIGN KEY (cecha) REFERENCES tabela_zalety_wady_pilkarza DEFERRABLE INITIALLY DEFERRED;

--
-- managerzy FOREIGN KEY
--

ALTER TABLE managerzy
        ADD CONSTRAINT fk_manager_kraj FOREIGN KEY (kraj_pochodzenia) REFERENCES kraje(id_kraju) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT fk_manager_licencja FOREIGN KEY (licencja) REFERENCES licencje(id_licencji) DEFERRABLE INITIALLY DEFERRED;
--
-- oferty_managerow FOREIGN KEY
--

ALTER TABLE oferty_managerow
        ADD CONSTRAINT ofman_man_fk FOREIGN KEY(id_managera) REFERENCES managerzy(id_managera) DEFERRABLE INITIALLY DEFERRED,
        ADD CONSTRAINT ofman_kl_fk FOREIGN KEY(id_klubu) REFERENCES kluby(id_klubu) DEFERRABLE INITIALLY DEFERRED;

--
-- safety rollback
--

--ROLLBACK;
COMMIT;

--
-- End of Foreign Keys database
--