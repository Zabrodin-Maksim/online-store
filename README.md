# Dokumentace k projektu: Online-store

**Autor:** Zabrodin Maksim


## Popis aplikace

Aplikace je interaktivní front-end webová aplikace vytvořená v Reactu, která poskytuje uživatelské rozhraní pro správu internetového obchodu. Internetový obchod obsahuje tři role uživatelů: Administrátor, Prodejce a Zákazník. Data jsou načítána z lokálního JSON serveru a aplikace umožňuje případnou budoucí integraci s back-end API.

---

## Funkce aplikace

- **Přihlašování uživatele:**
  - Jednoduchý přihlašovací formulář bez registrace.
  - Na základě přihlašovacích údajů je uživateli přiřazena role (Administrátor, Prodejce, Zákazník).
    (Administrátor):
    <img width="1470" alt="HeaderProAdmin" src="https://github.com/user-attachments/assets/3512c3d0-0a3a-4733-a8eb-b28e3c71ac14" />
    (Prodejce):
    <img width="1470" alt="HeaderProSeller" src="https://github.com/user-attachments/assets/753fe99f-41c4-47ec-99ae-76b6c4541174" />
    (Zákazník):
    <img width="1470" alt="HeaderProBuyer" src="https://github.com/user-attachments/assets/a79956f6-8359-42da-b524-b16c5efe78cb" />
    
  - Role ovlivňují přístup k jednotlivým funkcím aplikace.

- **Správa rolí a uživatelského rozhraní:**
  - Uživatelé mohou přepínat mezi rolemi, pokud mají přístup k více rolím.
  - Layout aplikace se dynamicky mění na základě aktuální role.
  - Individuální menu pro každou roli:
    - Administrátor:
      - Přístup k přehledu všech uživatelů.
      - Možnost přidávat, upravovat nebo mazat uživatele.
      - Správa produktů a přístup k nastavení aplikace.
    - Prodejce:
      - Možnost přidávat a upravovat produkty.
      - Přehled dostupných produktů.
      - Omezený přístup k uživatelským datům.
    - Zákazník:
      - Přístup k produktům, možnost přidávat produkty do košíku.
      - Historie objednávek.

- **Interakce s daty:**
  - Aplikace načítá a zpracovává data o uživatelích, produktech a objednávkách z db.json souboru.
  - Uživatelé mohou filtrovat a upravovat data v závislosti na svých oprávněních.

- **Interaktivní komponenty:**
  - Filtrování produktů podle kategorií.
  - Modální okna pro detailní náhled nebo úpravu uživatelských dat.
  - Editační formuláře pro změnu obsahu, které aktualizují data v JSON souboru.

---

## Obrazovky aplikace

1. **Přihlašovací stránka:**
   - Formulář pro přihlášení uživatele:
     ![image](https://github.com/user-attachments/assets/e9757623-2dda-436a-9914-4fc1a65412dd)
     ![image](https://github.com/user-attachments/assets/a6558866-995a-4ab8-affa-8b5c00ce8187)
   - Pro telefon:
     ![image](https://github.com/user-attachments/assets/5e2a71a3-84f6-4cc5-ac71-af6df0703a41)

2. **Hlavní přehled (Dashboard):**
   - Zobrazení personalizovaných informací podle role:
     ![image](https://github.com/user-attachments/assets/5675bd87-1082-4a44-ae80-630f7f28acae)
   - Pro telefon:
     ![image](https://github.com/user-attachments/assets/2cb86811-1fdc-40f9-807e-734674e236d9)
     ![image](https://github.com/user-attachments/assets/928403d0-267c-40fa-9eff-9ade642ff626)

3. **Profil uživatele:**
   - Změna hesla:
     ![image](https://github.com/user-attachments/assets/30504ecd-9d5a-4d13-8b02-8813d058c35d)

4. **Správa uživatelů (pouze pro Administrátory):**
   - Zobrazení seznamu uživatelů s možností detailní úpravy rolí:
     ![image](https://github.com/user-attachments/assets/ccb5a1bd-0da2-4eea-9fdf-17b5770317e5)
     ![image](https://github.com/user-attachments/assets/f4e32644-9c2c-42aa-b614-42f5ddf7d343)
     ![image](https://github.com/user-attachments/assets/61005f9d-2eed-4970-80a9-3d1f8cb4e0c0)

5. **Seznam produktů:**
   - Filtrování a zobrazení produktů podle kategorií:
     ![image](https://github.com/user-attachments/assets/0173451b-6540-4e3f-a2fb-8c46d0aad301)
     ![image](https://github.com/user-attachments/assets/b4539144-a5b8-4216-bd31-a80eab777569)
   - (dle role) Buyer:
     ![image](https://github.com/user-attachments/assets/a4e8acb0-06ba-4a0f-9faf-bb7795b03737)
   - Pro telefon:
     ![image](https://github.com/user-attachments/assets/b038c5a4-5710-431e-ab3b-c925815ced38)

6. **Detail produktu:**
   - Zobrazení podrobných informací o produktu s možností úpravy (dle role):
     ![image](https://github.com/user-attachments/assets/6173b558-4da2-4b69-8f11-2ef0d449b6e0)
     ![image](https://github.com/user-attachments/assets/55f98460-ed4b-4c3e-a4c5-f8b76206e14e)

7. **Objednávky (pouze pro Zákazníky):**
   - Historie objednávek s detaily:
     ![image](https://github.com/user-attachments/assets/85b86540-0955-45b1-aadc-751f273cb910)

8. **Nastavení (pouze pro Administrátory):**
   - Konfigurace aplikace:
     ![image](https://github.com/user-attachments/assets/879bffaa-ab64-4f7f-a961-22e5708e302a)
     ![image](https://github.com/user-attachments/assets/f3c41e47-a790-470c-9fad-5ca1df7062b3)

---

## Technický popis

### Použité technologie

- **React.js:** Framework pro tvorbu uživatelských rozhraní.
- **React Bootstrap:** Pro stylizaci a zajištění responzivního designu.
- **json-server:** Pro simulaci back-end API.
- **Fetch API:** Pro komunikaci s json-serverem.

### Popis hlavních souborů

- **App.jsx:**
  - Hlavní komponenta aplikace, která definuje navigaci a různé role.

- **Navbar.jsx:**
  - Navigační panel, který se mění na základě aktuální role uživatele.

- **Login.jsx:**
  - Zajišťuje přihlášení uživatele pomocí validace oproti db.json.

- **ProductsList.jsx:**
  - Zobrazuje seznam produktů s možností filtrování a úpravy.

- **Profile.jsx:**
  - Umožňuje uživateli změnit heslo a aktualizovat ho v db.json.

- **json-server:**
  - Slouží jako simulovaný back-end. Data jsou uložena v db.json a upravují se pomocí HTTP metod.

---

## Funkcionalita podle požadavků

### Splněné požadavky

1. **Přihlašování uživatele:**
   - Jednoduchý formulář.
   - Validace uživatelských údajů oproti JSON.

2. **Správa rolí:**
   - Uživatelé mohou přepínat role (pokud mají více než jednu roli) pomocí rozbalovacího menu v navigačním panelu.
   - Po přepnutí role se automaticky aktualizuje uživatelské rozhraní (dashboard, dostupné funkce, a další komponenty).

3. **Interakce s daty:**
   - Použití json-server pro simulaci API a práci s daty (CRUD operace na uživatelích, produktech a objednávkách).
   - Data jsou dynamicky načítána a upravována na základě akcí uživatelů:
     - Administrátor může spravovat seznam uživatelů (měnit role, upravovat údaje).
     - Prodejce může spravovat produkty (přidávat nové, upravovat existující).
     - Zákazník může prohlížet produkty, přidávat je do košíku a vytvářet objednávky.

4. **Interaktivní komponenty a vazby mezi daty:**
   - Filtrování: Umožňuje uživatelům filtrovat produkty podle kategorií.
   - Modální okna: Používají se pro detailní náhled na uživatelská data nebo produkty.
   - Formuláře: Umožňují úpravy uživatelských a produktových dat, která se okamžitě aktualizují v db.json.
   - Vazby mezi daty: Například propojení objednávek se zákazníky nebo produktů s kategoriemi.

5. **Minimální počet obrazovek:**
   - Aplikace obsahuje více než osm unikátních obrazovek, splňuje tedy požadavek na různorodost rozhraní.

---

## Splnění technických požadavků

- **Moderní technologie:** React.js, Bootstrap, json-server.
- **Dynamická práce s daty:** Fetch API a HTTP metody pro komunikaci s json-server.
- **Modularita:** Aplikace je rozdělena do přehledných komponent.
- **Responzivita:** Bootstrap zajišťuje přizpůsobení rozhraní na různých zařízeních.
- **Správa stavu uživatele:** React useState pro sledování aktuálního přihlášeného uživatele a jeho role.

---
