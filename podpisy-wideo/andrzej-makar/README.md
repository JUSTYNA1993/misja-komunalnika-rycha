# Podpis do filmów – Andrzej Makar

Animowany podpis (lower third): **Andrzej Makar** / *Prezes PGKiM w Jarosławiu Sp. z o.o. i JPK Sp. z o.o.*
Kolory z logo PGKiM: pomarańcz `#F07F1B`, zieleń `#B0CB21` (odczyt z pliku PNG, nie z księgi znaku). Krój: Inter (licencja OFL).

Czas: 7 s, 30 kl./s. Wejście ok. 1,2 s, napis stoi do ok. 6 s, zejście do 7 s.

| Plik | Do czego |
|---|---|
| `*_alfa.mov` | ProRes 4444 z przezroczystością. Premiere Pro, DaVinci Resolve, Final Cut. Kładziesz na ścieżce nad filmem. |
| `*_alfa.webm` | VP9 z przezroczystością. Lekki plik do programów i przeglądarek, które obsługują WebM z kanałem alfa. |
| `*_zielone-tlo.mp4` | Podpis na zielonym tle #00FF00 do kluczowania (chroma key), np. w CapCut. Bez cienia, krawędzie belek wyrównane do pełnych pikseli. Siłę klucza ustaw tylko tyle, żeby zniknęło tło: zielony pasek z logo jest bliski kolorem tłu i przy zbyt mocnym kluczu zacznie znikać. |
| `*_statyczny.png` | Nieruchomy podpis z przezroczystością, np. do Canvy (animację wejścia można dodać w Canvie). |
| `PODGLAD_*.mp4` | Tylko podgląd na przykładowym tle. Nie do montażu. |

`16x9` – film poziomy 1920×1080. `9x16` – rolka/relacja 1080×1920 (podpis podniesiony nad strefę opisu i przycisków aplikacji).

## Zmiana tekstu i ponowny render

Tekst jest w `zrodlo/podpis.html` (obiekt `L`, pola `title`; imię i nazwisko w elemencie `nameT`).

```bash
node zrodlo/render.js 169 1 klatki_169      # 16:9 z cieniem
ffmpeg -framerate 30 -i klatki_169/f%04d.png -c:v prores_ks -profile:v 4 \
  -pix_fmt yuva444p10le -alpha_bits 16 -vendor apl0 podpis_16x9_alfa.mov
```
Wymaga Node.js z Playwright (Chromium) i ffmpeg.
