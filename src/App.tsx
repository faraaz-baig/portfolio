import { useEffect, useState } from "react";
import FloatingPlayer from "./FloatingPlayer";
import portraitUrl from "./assets/portrait.webp";
import flipkartPlateUrl from "./assets/flipkart-plate.webp";
import ornamentUrl from "./assets/ornament.webp";
import ornamentStripUrl from "./assets/ornament-strip.webp";
import frontispieceUrl from "./assets/frontispiece.webp";
import crestUrl from "./assets/crest.webp";
import copablesWorkUrl from "./assets/copables-work.webp";
import summit1517Url from "./assets/1517-summit.webp";
import emergentCowenUrl from "./assets/emergent-cowen.webp";
import airboundFieldUrl from "./assets/airbound-field.webp";
import airboundHeroUrl from "./assets/airbound-hero.webp";
import airboundWorkshopUrl from "./assets/airbound-workshop.webp";
import airboundProtoUrl from "./assets/airbound-proto.webp";
import arclineKrabiUrl from "./assets/arcline-krabi.webp";
import spillSingaporeUrl from "./assets/spill-singapore.webp";
import panel1517Url from "./assets/1517-panel.webp";

/* ------------------------------------------------------------------ *
 *  Faraaz Baig — portfolio
 *  Faithful port of the standalone design (editorial "ledger" style).
 * ------------------------------------------------------------------ */

const SLUGS = [
  "index",
  "copables",
  "triplespeed",
  "arcline",
  "clayo",
  "cerebras",
  "spill",
  "unscan",
  "ondeck",
  "airbound",
  "fund1517",
  "emergent",
  "thiel",
] as const;

/* Links & films (defaults carried over from the design). */
const LINKEDIN = "https://linkedin.com/in/faraazbaig";
const EMAIL = "faraazbaig1@gmail.com";
const SPILL_FILM = "https://youtu.be/lMEJB5fiwr8";
const CLAYO_FILM = "https://youtu.be/i-GWrbcAQ8E";

/* Age ticks over on 9 August each year (0-indexed month: 7 = August). */
const BIRTH_YEAR = 2001;
const BIRTH_MONTH = 7;
const BIRTH_DAY = 9;

function currentAge(now: Date = new Date()): number {
  let age = now.getFullYear() - BIRTH_YEAR;
  const beforeBirthday =
    now.getMonth() < BIRTH_MONTH ||
    (now.getMonth() === BIRTH_MONTH && now.getDate() < BIRTH_DAY);
  if (beforeBirthday) age -= 1;
  return age;
}

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function numberToWords(n: number): string {
  if (n < 0) return String(n);
  if (n < 20) return ONES[n];
  if (n < 100) {
    const o = n % 10;
    return o ? `${TENS[Math.floor(n / 10)]}-${ONES[o]}` : TENS[Math.floor(n / 10)];
  }
  return String(n);
}

/* Images placed into the design's slots. */
const SLOT_IMAGES: Record<string, string> = {
  "fb-portrait": portraitUrl,
  "fb-unscan-plate": flipkartPlateUrl,
  "fb-orn-rule": ornamentUrl,
  "fb-airbound-1": airboundFieldUrl,
  "fb-airbound-plate": airboundHeroUrl,
  "fb-emergent": emergentCowenUrl,
  "fb-arcline": arclineKrabiUrl,
  "fb-spill-singapore": spillSingaporeUrl,
};

function embed(raw: string): string {
  const v = (raw || "").trim();
  if (!v) return "";
  let id = "";
  const m = v.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (m) id = m[1];
  else if (/^[\w-]{6,}$/.test(v)) id = v;
  return id ? "https://www.youtube-nocookie.com/embed/" + id + "?rel=0" : v;
}

function ImageSlot({ id, fit }: { id: string; fit: string }) {
  const src = SLOT_IMAGES[id];
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit as React.CSSProperties["objectFit"],
        display: "block",
      }}
    />
  );
}

function pathToSlug(pathname: string): string {
  const p = pathname.replace(/\/+$/, "").replace(/^\//, "");
  return (SLUGS as readonly string[]).indexOf(p) > 0 ? p : "index";
}

export default function App() {
  const [route, setRoute] = useState<string>(() =>
    pathToSlug(window.location.pathname)
  );

  useEffect(() => {
    // Migrate old hash URLs (#/arcline) to clean paths (/arcline)
    const h = (window.location.hash || "").replace(/^#\/?/, "");
    if ((SLUGS as readonly string[]).indexOf(h) > 0) {
      window.history.replaceState(null, "", "/" + h);
      setRoute(h);
    }
    const onPop = () => setRoute(pathToSlug(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (slug: string) => () => {
    setRoute(slug);
    try {
      window.history.pushState(
        null,
        "",
        slug === "index" ? "/" : "/" + slug
      );
    } catch (e) {}
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  };

  const at: Record<string, boolean> = {};
  SLUGS.forEach((s) => {
    at[s] = route === s;
  });
  const atIndex = route === "index";

  const spillFilmSrc = embed(SPILL_FILM);
  const clayoFilmSrc = embed(CLAYO_FILM);
  const hasSpillFilm = !!spillFilmSrc;
  const noSpillFilm = !spillFilmSrc;
  const hasClayoFilm = !!clayoFilmSrc;
  const noClayoFilm = !clayoFilmSrc;
  const linkedinHref = LINKEDIN || "https://www.linkedin.com/";
  const mailHref = EMAIL ? "mailto:" + EMAIL : "#";

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(8px, 1.6vw, 20px)" }}>
      <div style={{ border: "1px solid rgba(27,25,22,0.5)", padding: "5px", maxWidth: "1340px", margin: "0 auto" }}>
        <div style={{ border: "1px solid rgba(27,25,22,0.22)", padding: "clamp(20px, 3.6vw, 52px)" }}>
          <div className="site-topbar" style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "baseline", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
            <span style={{ color: "#1b1916" }}>Faraaz Baig</span>
            <span className="site-links" style={{ display: "flex", gap: "18px" }}>
              <a href="https://x.com/faraazbaig_" target="_blank" rel="noreferrer">Twitter</a>
              <a href={linkedinHref} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={mailHref}>Email</a>
            </span>
          </div>
          <div style={{ marginTop: "16px", height: "3px", borderTop: "1px solid #1b1916", borderBottom: "1px solid #1b1916" }} />
          {atIndex && (
          <>
             <div style={{ animation: "fadeIn .5s ease both" }}>
               <div style={{ padding: "clamp(32px, 5vw, 72px) 0 0" }}>
                 <div aria-hidden="true" style={{ height: "clamp(52px, 8vw, 82px)", backgroundImage: `url(${ornamentStripUrl})`, backgroundRepeat: "repeat-x", backgroundPosition: "center", backgroundSize: "auto 100%" }} />
               </div>
               <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 80px)", alignItems: "flex-start", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <figure style={{ flex: "0 1 clamp(240px, 30vw, 372px)", margin: "0" }}>
                  <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "4 / 5" }}>
                      <ImageSlot id="fb-portrait" fit="cover" />
                    </div>
                  </div>
                  <figcaption style={{ marginTop: "16px", display: "grid", gap: "6px" }}>
                    <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Portrait of the author</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Oil on panel · MMXXVI</span>
                  </figcaption>
                </figure>
                <div style={{ flex: "1 1 440px", minWidth: "280px" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Entrepreneur · Investor · Creative Director</p>
                  <h1 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(52px, 9.5vw, 118px)", lineHeight: "0.92", letterSpacing: "-0.015em" }}>Faraaz Baig</h1>
                  <div style={{ margin: "32px 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
                  <p style={{ margin: "0 0 24px", fontSize: "clamp(20px, 2vw, 25px)", lineHeight: "1.5", color: "#201d18", maxWidth: "40ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "86px", height: "86px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "54px", lineHeight: "1", color: "#8f2e18" }}>I</span>
                    </span>
                    am {numberToWords(currentAge())}, a serial entrepreneur and an angel investor, currently exploring in{' '}
                    <strong style={{ fontWeight: "500" }}>consumer health</strong>
                    .
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#4a453c", maxWidth: "54ch", textWrap: "pretty" }}>
                    Before it there were drones, a warehouse robotics company, a writing app, a podcast, and a few things that did not survive contact with reality. My downtime goes to riding horses, travelling, and racing motorbikes.
                  </p>
                  <p style={{ margin: "0", fontSize: "19px", lineHeight: "32px", color: "#4a453c", maxWidth: "54ch", textWrap: "pretty" }}>
                    What follows is everything worth writing down — twelve entries, newest first, including the ones that ended badly.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "clamp(48px, 7vw, 96px) 0 clamp(40px, 5vw, 72px)" }}>
                <div style={{ flex: "1", height: "1px", background: "rgba(27,25,22,0.26)" }} />
                <div style={{ flex: "0 0 clamp(130px, 22vw, 260px)", height: "44px" }}>
                  <ImageSlot id="fb-orn-rule" fit="contain" />
                </div>
                <div style={{ flex: "1", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "16px" }}>
                <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "16px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#1b1916" }}>Contents</h2>
                <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Twelve entries · 2021–2026</span>
              </div>
              <div style={{ height: "3px", borderTop: "1px solid #1b1916", borderBottom: "1px solid #1b1916" }} />
              <button type="button" onClick={go('copables')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: "0s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>I</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Copables</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2026</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Brand</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  An honest placebo brand — design, film, and growth, end to end.
                </span>
              </button>
              <button type="button" onClick={go('triplespeed')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".02s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>II</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Triplespeed</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2025—26</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Growth</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                   Helped take the company from $5M to $72M ARR — including a US fintech app from zero to $40M in under four months.
                </span>
              </button>
              <button type="button" onClick={go('arcline')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".04s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>III</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Arcline Labs</span>
                  <span style={{ flexShrink: 0, alignSelf: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "9px", letterSpacing: "0.11em", textTransform: "uppercase", color: "#8f2e18", border: "1px solid rgba(143,46,24,0.45)", padding: "3px 7px", whiteSpace: "nowrap" }}>6-figure exit</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2025</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Venture Studio</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A venture studio building products for users from earth to the edge of space.
                </span>
              </button>
              <button type="button" onClick={go('clayo')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".08s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>IV</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Clayo AI</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2025</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Product</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  An AI that screens unknown callers, so only the calls that matter reach you.
                </span>
              </button>
              <button type="button" onClick={go('cerebras')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".12s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>V</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Cerebras Fellow</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2025—</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fellowship</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A fellowship for AI engineers and researchers, run by Cerebras.
                </span>
              </button>
              <button type="button" onClick={go('spill')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".16s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>VI</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Spill</span>
                  <span style={{ flexShrink: 0, alignSelf: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "9px", letterSpacing: "0.11em", textTransform: "uppercase", color: "#8f2e18", border: "1px solid rgba(143,46,24,0.45)", padding: "3px 7px", whiteSpace: "nowrap" }}>#2 · Product Hunt</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2025</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Product</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A minimalist freewriting app — spill your thoughts, then reflect.
                </span>
              </button>
              <button type="button" onClick={go('unscan')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".2s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>VII</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Unscan AI</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2024</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Closed</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  Autonomous drones that counted and reconciled warehouse inventory.
                </span>
              </button>
              <button type="button" onClick={go('ondeck')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".28s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>VIII</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>On Deck Fellow</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2023</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fellowship</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A fellowship for people at the very start of building a company.
                </span>
              </button>
              <button type="button" onClick={go('airbound')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".32s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>IX</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Airbound</span>
                  <span style={{ flexShrink: 0, alignSelf: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "9px", letterSpacing: "0.11em", textTransform: "uppercase", color: "#8f2e18", border: "1px solid rgba(143,46,24,0.45)", padding: "3px 7px", whiteSpace: "nowrap" }}>$50M+ raised</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2021</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Venture</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  The world’s most efficient delivery drones, built to make a delivery cost a nickel.
                </span>
              </button>
              <button type="button" onClick={go('fund1517')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".34s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>X</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>1517 Fund</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2021</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Grant</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A grant for Airbound from the fund that backs builders without a permission slip.
                </span>
              </button>
              <button type="button" onClick={go('emergent')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid rgba(27,25,22,0.22)", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".36s" }} className="hv1 toc-btn">
                <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>XI</span>
                <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Emergent Ventures</span>
                  <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                </span>
                <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                  <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2021—</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fellowship</span>
                </span>
                <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>
                  A grant programme run by Tyler Cowen, backed by Thiel and Schmidt.
                </span>
               </button>
                <button type="button" onClick={go('thiel')} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr) 116px", gap: "4px 20px", width: "100%", padding: "24px 12px", borderBottom: "1px solid #1b1916", transition: "background .3s ease, color .3s ease, box-shadow .3s ease", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both", animationDelay: ".4s" }} className="hv1 toc-btn">
                  <span className="toc-num" style={{ gridRow: "span 2", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontStyle: "italic", fontSize: "20px", opacity: "0.45", paddingTop: "6px" }}>XII</span>
                 <span style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
                   <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: "1.1" }}>Thiel Fellowship</span>
                   <span style={{ flex: "1", height: "0", borderBottom: "1px dotted rgba(27,25,22,0.32)", transform: "translateY(-7px)" }} />
                 </span>
                 <span className="toc-meta" style={{ gridRow: "span 2", textAlign: "right", display: "grid", gap: "4px", alignContent: "start", paddingTop: "10px" }}>
                   <span style={{ fontSize: "17px", color: "#4a453c", fontVariantNumeric: "oldstyle-nums" }}>2021—</span>
                   <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Finalist</span>
                 </span>
                 <span className="toc-tag" style={{ fontStyle: "italic", fontSize: "17px", lineHeight: "1.45", color: "#5b554a", maxWidth: "62ch" }}>Made it to the last round — the interview with four Thiel Fellows.</span>
               </button>
              <figure style={{ margin: "0", padding: "clamp(56px, 7vw, 96px) 0 0", animation: "fadeIn .6s ease both" }}>
                <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                  <div style={{ border: "1px solid rgba(27,25,22,0.2)" }}>
                    <img src={frontispieceUrl} alt="Frontispiece — the assembly of the ventures" loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                </div>
                <figcaption style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px 24px", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Frontispiece — The assembly of the ventures</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fresco · After the Italian manner</span>
                </figcaption>
              </figure>
              <footer style={{ marginTop: "40px", border: "1px solid rgba(27,25,22,0.5)", padding: "5px" }}>
                <div className="colo-inner" style={{ border: "1px solid rgba(27,25,22,0.22)", background: "#eae2d3", padding: "clamp(24px, 3vw, 34px)", display: "flex", flexWrap: "wrap", gap: "32px 48px", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ display: "grid", gap: "12px", flex: "0 0 auto" }}>
                    <img src={crestUrl} alt="Ab Terra Ad Astra" loading="lazy" decoding="async" style={{ width: "clamp(118px, 15vw, 158px)", height: "auto", display: "block", mixBlendMode: "multiply" }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#33302a", maxWidth: "158px", lineHeight: "1.6" }}>Printer’s mark · MMXXVI</span>
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8f2e18" }}>Colophon</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#33302a" }}>Set in Cormorant Garamond &amp; EB Garamond</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>© {new Date().getFullYear()} Faraaz Baig · Kuala Lumpur, Malaysia</span>
                  </div>
                  <div className="colo-else" style={{ display: "grid", gap: "10px", justifyItems: "end", textAlign: "right" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8f2e18" }}>Elsewhere</span>
                    <a href="https://x.com/faraazbaig_" target="_blank" rel="noreferrer" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#33302a" }}>Twitter</a>
                    <a href={linkedinHref} target="_blank" rel="noreferrer" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#33302a" }}>LinkedIn</a>
                    <a href={mailHref} style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#33302a" }}>Email</a>
                  </div>
                </div>
              </footer>
            </div>
          </>
          )}
          {at.copables && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{' '}{' '}Contents</button>
                <span style={{ color: "#6f6759" }}>I / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Brand · 2026</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://copables.com" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Copables<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    An honest placebo brand — I helped carry it from half-built to launched.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Design, film, growth</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Years</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Jun—Jul 2026</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>With</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>A friend from Network School</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Brand</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Honest placebo</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>C</span>
                    </span>
                    opables is an honest placebo brand. A friend I met at Network School was building it, and I came on to help take it the rest of the way.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I did</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    The design was about half done when I joined, so I picked it up and finished it, then shot what was missing — the product photography and the product videos. Before any of the funnels, I spent real time on the GTM research: who the brand was actually for, where to reach them, and what it takes to earn trust for a placebo brand.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    From there I set up the go-to-market on both sides, organic and paid, with funnels built for conversion. Most of my time went into the ads — I wrote and made a lot of static ads, working through angles and messaging — and a good deal of the organic copy came from me too. It was a short window and mostly groundwork: by the time I wrapped, everything was staged and ready to go, but we hadn't turned the ads on to go live yet.
                  </p>
                  <figure style={{ margin: "40px 0 0", maxWidth: "440px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)" }}>
                        <img src={copablesWorkUrl} alt="Working on Copables" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                      </div>
                    </div>
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate — Heads-down on Copables</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>The short window</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <span />
                <button type="button" onClick={go('triplespeed')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Triplespeed{' '}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>I</p>
            </article>
          </>
          )}
          {at.triplespeed && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{' '}{' '}Contents</button>
                <span style={{ color: "#6f6759" }}>II / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Growth · 2025—2026</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://triplespeed.com" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Triplespeed<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    Helped take the company from $5M to $72M in ARR — including a US fintech app from zero to $40M in under four months.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Core team — payments &amp; growth</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Years</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Nov 2025 — Apr 2026</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fintech app</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>$0 → $40M ARR</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Company</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>$5M → $72M ARR</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Chargebacks</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Double digits → 0.2%</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it was</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>T</span>
                    </span>
                    riplespeed was doing about $5M in ARR on one utility app — built over five months — when I joined the core team. In the months after, we grew that app to around $14M and took a new fintech app in America from zero to $40M in ARR in under four — across the portfolio, the company went from $5M to $72M in ARR.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I did</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    Payments infrastructure was mine to run. I brought chargebacks down from double digits to 0.2% inside two months, handled the PSP negotiations, and kept the unglamorous plumbing everything else depends on running. On the growth side I built the first funnel and ran CRO on it, tested a new style of ad — static creatives, then advertorials — and opened Taboola as a channel, taking it from zero to $10K a day in spend.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    Underneath all of it was a constant stream of experiments — testing new ideas, new angles, new channels, and keeping the ones that paid their way.
                  </p>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('copables')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{' '}Copables</span>
                </button>
                <button type="button" onClick={go('arcline')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Arcline Labs{' '}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>II</p>
            </article>
          </>
          )}
          {at.arcline && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>III / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Venture Studio · 2025</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://arclinelabs.com" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Arcline Labs<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    A venture studio building products for users from earth to the edge of space.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Founder</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Years</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2025 — paused Sept</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Out of it</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Granny · Clayo · Arcline B2B</dd>
                    </div>
                  </dl>
                  <p style={{ margin: "32px 0 0", paddingTop: "20px", borderTop: "1px solid rgba(27,25,22,0.26)", fontStyle: "italic", fontSize: "16px", lineHeight: "1.5", color: "#5b554a" }}>Paused in September 2025.</p>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>A</span>
                    </span>
                    rcline Labs was a venture studio. We took an idea to a working product quickly, put it in front of real users, and kept the ones that earned their keep. The point was speed: the expensive part of building a company is not the building, it is the years spent finding out whether anyone wanted it — and running several attempts in parallel, cheaply, answers that sooner.
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    In a single year it produced three. I paused the studio in September 2025 to go deeper on one thing elsewhere.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>Out of the studio</span>
                  </h3>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    Three products: <strong style={{ fontWeight: "500" }}>Granny</strong>; <strong style={{ fontWeight: "500" }}>Clayo</strong>, an AI secretary that screens unknown calls; and <strong style={{ fontWeight: "500" }}>Arcline B2B</strong>, a voice platform built to take on Vapi. Each was a small team, a narrow problem, and a product in front of users while the idea was still warm.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "640px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "3 / 2" }}>
                        <ImageSlot id="fb-arcline" fit="cover" />
                      </div>
                    </div>
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — The team, over lunch in Krabi</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                     </figcaption>
                  </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('triplespeed')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{' '}Triplespeed</span>
                </button>
                <button type="button" onClick={go('clayo')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Clayo AI{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>III</p>
            </article>
          </>
          )}
          {at.clayo && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>IV / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Product · 2025</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://clayo.ai" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Clayo AI<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    An AI answers the numbers you don’t know, so only the calls that matter reach you.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Founder — design, product, marketing, GTM</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Year</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2025</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Studio</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Arcline Labs</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Built during</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Cerebras Fellowship</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>C</span>
                    </span>
                    lay answers calls from numbers you do not know. It greets the caller, works out what they actually want, and decides whether to put them through, following rules you set. It never touches calls from people you know. For everyone else, you get a short, clear summary of what was said instead of an interruption.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I did</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I founded Clayo inside Arcline Labs and led every part of it — design, product, marketing, and go-to-market. Most of the work went into the landing page, and most of that went into saying, in plain language, what the product actually is — which is harder than it sounds for something nobody has seen before.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I set the brand and ran the go-to-market — the voice, the look, and how Clayo reached the people who needed it. Carrying all of it end to end is the fastest way I know to find out where you are actually weak.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "640px" }}>
                    {hasClayoFilm && (
                    <>
                      <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                        <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "16 / 9" }}>
                          <iframe src={clayoFilmSrc} title="Clayo AI" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen style={{ width: "100%", height: "100%", border: "0", display: "block" }} />
                        </div>
                      </div>
                    </>
                    )}
                    {noClayoFilm && (
                    <>
                      <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                        <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759", textAlign: "center", padding: "0 24px" }}>▶{'\u00a0'}{'\u00a0'}Clayo film — add a YouTube link in Tweaks</span>
                        </div>
                      </div>
                    </>
                    )}
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — Clayo AI</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Moving picture</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('arcline')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Arcline Labs</span>
                </button>
                <button type="button" onClick={go('cerebras')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Cerebras Fellow{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>IV</p>
            </article>
          </>
          )}
          {at.cerebras && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>V / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Fellowship · 2025—</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://cerebras.ai" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Cerebras Fellow<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    A fellowship for AI engineers and researchers, run by Cerebras.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Programme</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Cerebras Fellows</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Years</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2025—present</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Building</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Clayo AI</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>T</span>
                    </span>
                    he Cerebras Fellows Program gives a small number of engineers, researchers and students exclusive access to Cerebras inference — which is to say, the freedom to build things that would otherwise be too slow or too expensive to try.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I am doing there</span>
                  </h3>
                  <p style={{ margin: "0", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I am building Clayo AI — an AI secretary that answers unknown calls, speaks naturally, and follows the rules you give it. Voice is unforgiving about latency: a pause of half a second reads as a person who is not listening. That constraint is the reason the fellowship matters to this particular product.
                  </p>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('clayo')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Clayo AI</span>
                </button>
                <button type="button" onClick={go('spill')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Spill{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>V</p>
            </article>
          </>
          )}
          {at.spill && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>VI / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Product · 2025</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://tryspill.com" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Spill<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    A minimalist freewriting app — one place to spill your thoughts, then reflect on them.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Interface, dictation, brand, launch film</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Year</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2025</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>With</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Vishruth, met at Network School</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Launched on</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Product Hunt</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Ranked</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>#2 Product of the Day</dd>
                    </div>
                  </dl>
                  <div style={{ margin: "28px 0 0", paddingTop: "20px", borderTop: "1px solid rgba(27,25,22,0.26)" }}>
                    <a href="https://www.producthunt.com/products/spill-2/launches/spill-2?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-spill-2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <img alt="Spill - Minimalist freewriting app | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1001010&theme=light&period=daily&t=1784997034212" style={{ display: "block", width: "100%", maxWidth: "208px", height: "auto" }} />
                    </a>
                  </div>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>O</span>
                    </span>
                    ne distraction-free space to write against a timer — brainstorm an idea, draft a script, process whatever is in the way. Dictation for when your fingers cannot keep up, and voice chat with your notes for when you need to think out loud.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I did</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I met Vishruth at Network School and we decided to build something together. I wrote the entire interface, and kept it plain on purpose: in a writing app, every visible control is a reason to stop writing. I added on-device dictation, so speech becomes text instantly and nothing leaves the device.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I also handled the brand — logo through to the overall feel — and shot and cut the launch film. Vishruth built Reflect, which reads back what you wrote and gives the writing a second life.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "640px" }}>
                    {hasSpillFilm && (
                    <>
                      <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                        <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "16 / 9" }}>
                          <iframe src={spillFilmSrc} title="Spill launch film" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen style={{ width: "100%", height: "100%", border: "0", display: "block" }} />
                        </div>
                      </div>
                    </>
                    )}
                    {noSpillFilm && (
                    <>
                      <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                        <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759", textAlign: "center", padding: "0 24px" }}>▶{'\u00a0'}{'\u00a0'}Spill launch film — add a YouTube link in Tweaks</span>
                        </div>
                      </div>
                    </>
                    )}
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — Spill, the launch film</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Shot and cut by the author</span>
                     </figcaption>
                   </figure>
                   <figure style={{ margin: "40px 0 0", maxWidth: "640px" }}>
                     <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                       <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "2 / 3" }}>
                         <ImageSlot id="fb-spill-singapore" fit="cover" />
                       </div>
                     </div>
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate II — The day trip to Singapore</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                     </figcaption>
                   </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('cerebras')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Cerebras Fellow</span>
                </button>
                <button type="button" onClick={go('unscan')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Unscan AI{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>VI</p>
            </article>
          </>
          )}
          {at.unscan && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>VII / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Venture · 2024 · Closed</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}>Unscan AI</h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    Autonomous drones that counted and reconciled inventory inside warehouses.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Co-founder · sales &amp; partnerships</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Year</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2024</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Raised</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>$500K</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Outcome</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Closed; capital returned in full</dd>
                    </div>
                  </dl>
                  <p style={{ margin: "32px 0 0", paddingTop: "20px", borderTop: "1px solid rgba(27,25,22,0.26)", fontStyle: "italic", fontSize: "16px", lineHeight: "1.5", color: "#5b554a" }}>The demand was real. The product never arrived.</p>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it was</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>A</span>
                    </span>
                    {' '}drone-based inventory system for warehouses. Autonomous aircraft flew the aisles at night; computer vision read what was actually on the racks, flagged misplaced stock, and reconciled the floor against the books. Done well, it removes one of the quietest and most expensive sources of error in a supply chain.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What happened</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I ran sales, and the demand side worked. One of India’s largest logistics operators, several global brands and a few listed companies signed pilots, LOIs and NDAs. On paper we had the hardest thing a young company can get: buyers waiting.
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    Delivery is where it came apart. The technical co-founders I brought on could not get the system to production, and the window closed with the contracts still sitting on the table. We had raised half a million dollars. Once it was clear we could not ship what we had sold, we returned the term sheets and the capital to our investors and closed the company.
                  </p>
                  <div style={{ margin: "48px 0", padding: "32px 0", borderTop: "1px solid rgba(27,25,22,0.26)", borderBottom: "1px solid rgba(27,25,22,0.26)", maxWidth: "64ch" }}>
                    <p style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(22px, 2.3vw, 29px)", lineHeight: "1.4", fontStyle: "italic", color: "#1b1916", textAlign: "center", textWrap: "pretty" }}>
                      I own the part that was mine. I picked the team, and I sold ahead of what we could build. Distribution without a working product is only a countdown.
                    </p>
                  </div>
                   <figure style={{ margin: "0", maxWidth: "640px" }}>
                     <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                       <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "3 / 2" }}>
                         <ImageSlot id="fb-unscan-plate" fit="cover" />
                       </div>
                     </div>
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — The warehouse floor</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                     </figcaption>
                   </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('spill')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Spill</span>
                </button>
                <button type="button" onClick={go('ondeck')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>On Deck Fellow{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>VII</p>
            </article>
          </>
          )}
          {at.ondeck && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>VIII / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Fellowship · ODF ’23</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://joinodf.com/" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>On Deck Fellow<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    A fellowship for people at the very start of building a company.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Cohort</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>ODF ’23</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Format</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Ten weeks, remote</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Residency</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Six months, San Francisco — deferred</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>T</span>
                    </span>
                    he On Deck Founder Fellowship is a ten-week remote programme for founders in the earliest stages of their next company, built around a cohort, a run of speakers, and support tailored to what each person is actually working on.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What I did</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I was selected, with a six-month residency offer in San Francisco, and deferred it. At the time the reasoning felt sound: the problems I was working on were in India, and being near them mattered more to me than being near the people building elsewhere.
                  </p>
                  <div style={{ margin: "48px 0 0", padding: "32px 0", borderTop: "1px solid rgba(27,25,22,0.26)", borderBottom: "1px solid rgba(27,25,22,0.26)", maxWidth: "64ch" }}>
                    <p style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(22px, 2.3vw, 29px)", lineHeight: "1.4", fontStyle: "italic", color: "#1b1916", textAlign: "center", textWrap: "pretty" }}>
                      Proximity to a problem is worth a great deal. Proximity to people who have solved harder versions of it is worth more than I credited.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('unscan')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Unscan AI</span>
                </button>
                <button type="button" onClick={go('airbound')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Airbound{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>VIII</p>
            </article>
          </>
          )}
          {at.airbound && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>IX / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Venture · 2021—2024</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://airbound.com" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Airbound<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "44ch", textWrap: "pretty" }}>
                    Delivery drones efficient enough that no delivery need cost more than a nickel.
                  </p>
                </header>
              </div>
              <figure style={{ margin: "clamp(40px, 5vw, 64px) auto 0", maxWidth: "760px" }}>
                <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                  <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "3 / 2" }}>
                    <ImageSlot id="fb-airbound-plate" fit="cover" />
                  </div>
                </div>
                <figcaption style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "8px 24px", justifyContent: "space-between" }}>
                  <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — The flight to the far village</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                </figcaption>
              </figure>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Founder</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Years</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2021—2024</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Raised</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Over $50M, most after my time</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Backers</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Lachy Groom, DoorDash, Lightspeed, Greenoaks and others</dd>
                    </div>
                  </dl>
                  <p style={{ margin: "32px 0 0", paddingTop: "20px", borderTop: "1px solid rgba(27,25,22,0.26)", fontStyle: "italic", fontSize: "16px", lineHeight: "1.5", color: "#5b554a" }}>
                    I left my education to build this, and I am still at peace with that.
                  </p>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>A</span>
                    </span>
                    irbound builds advanced delivery drones intended to cut the cost of a delivery by more than 137× — seven times the structural efficiency and six times the aerodynamic efficiency of what existed. The target was a world in which no delivery costs more than a nickel.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>Building it from zero</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    The first idea was simple: everyday essentials delivered by air across Indian cities. Airspace regulation made that impossible to start with, and the roadblock turned out to be the most useful thing that happened to the company. Looking for something the rules would allow, I found a sharper problem — blood and medical supplies were not reaching remote parts of the country in time. Traditional transport was failing those communities, and what we were building could close the gap.
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    So I refocused Airbound on medical delivery to places that are hard to reach. I architected the VTOL platform to be open-source, modular and radically cheap to keep flying: flight controller software, component choices, our own electronics stack — every decision made for environments with no spare margin. I led the teams working on flight control, RF mesh networking and autonomous air traffic management, and the infrastructure that connected hospitals and blood banks to the fleet, so a request could be placed and tracked in real time where connectivity is thin.
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    We closed a first round of over{' '}
                    <a href="https://inc42.com/buzz/drone-startup-airbound-bags-funding-from-lightspeed/" target="_blank" rel="noreferrer">$2M</a>{' '}
                    with Lightspeed and Draper among the backers, and I left my education to run the company. The company later raised over{' '}
                    <a href="https://www.moneycontrol.com/news/business/startup/drone-startup-airbound-to-raise-30-million-in-fresh-funding-led-by-greenoaks-13720475.html" target="_blank" rel="noreferrer">$30M</a>{' '}
                    in a round led by Greenoaks — over $50M to date, with Lachy Groom and DoorDash also among the backers. We flew pilots across several regions of India, which proved the harder thing: not that the aircraft worked, but that it could keep working in difficult conditions. Government programmes in India and Africa followed.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>Why I left</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    I left in 2024, having lost conviction in drone delivery as a scalable business. Conversations with officials in India and abroad confirmed the doubt rather than settling it: the regulatory and infrastructure barriers sit too high for broad adoption on any timeline I could underwrite. Defence, meanwhile, showed clearer demand for the same systems, and the systems we had built were well suited to it.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    The company continues on e-commerce and blood delivery. I hope it makes a lasting mark there, and I am glad the work outlived my part in it.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "640px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "4 / 3" }}>
                        <ImageSlot id="fb-airbound-1" fit="cover" />
                      </div>
                    </div>
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate II — Airbound, in the field</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                    </figcaption>
                  </figure>
                  <figure style={{ margin: "clamp(32px, 4vw, 48px) 0 0", maxWidth: "640px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "4 / 3" }}>
                        <img src={airboundWorkshopUrl} alt="The Airbound workshop" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    </div>
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate III — The workshop</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                    </figcaption>
                  </figure>
                  <figure style={{ margin: "clamp(32px, 4vw, 48px) 0 0", maxWidth: "400px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "3 / 4" }}>
                        <img src={airboundProtoUrl} alt="Testing an early Airbound prototype" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    </div>
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate IV — Testing the early builds</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('ondeck')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}On Deck Fellow</span>
                </button>
                <button type="button" onClick={go('fund1517')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>1517 Fund{'\u00a0'}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>IX</p>
            </article>
          </>
          )}
          {at.fund1517 && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{' '}{' '}Contents</button>
                <span style={{ color: "#6f6759" }}>X / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Grant · 2021</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://www.1517fund.com/" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>1517 Fund<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>
                    A grant for Airbound from the fund that backs builders without a permission slip.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Role</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Grantee</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Year</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2021</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>For</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Airbound</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fund</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>1517</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it was</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>T</span>
                    </span>
                    he 1517 Fund backs people building outside the usual track — often before, or instead of, a degree. The name is the year Martin Luther pinned his theses to the door: the whole bet is on people who don't wait for a permission slip. They gave me a grant for Airbound while it was still early — a prototype and a lot of conviction.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>The summit</span>
                  </h3>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    The best part wasn't the money; it was the room it put me in. Every grantee was flown in for the 1517 Summit — a few hundred people building hard, strange, ambitious things — and for a few days I got to be one of them.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "520px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)" }}>
                        <img src={summit1517Url} alt="The 1517 Summit — every grantee in one room" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                      </div>
                    </div>
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — The 1517 Summit</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Every grantee in one room</span>
                     </figcaption>
                   </figure>
                   <figure style={{ margin: "40px 0 0", maxWidth: "520px" }}>
                     <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                       <div style={{ border: "1px solid rgba(27,25,22,0.2)" }}>
                         <img src={panel1517Url} alt="On stage at the 1517 Summit — the founders of Figma and Loom, with Sarah Guo" loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                       </div>
                     </div>
                     <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                       <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate II — The panel</span>
                       <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>In frame — the founders of Figma and Loom, with Sarah Guo</span>
                     </figcaption>
                   </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('airbound')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{' '}Airbound</span>
                </button>
                <button type="button" onClick={go('emergent')} style={{ textAlign: "right" }} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Emergent Ventures{' '}→</span>
                </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>X</p>
            </article>
          </>
          )}
          {at.emergent && (
          <>
            <article style={{ animation: "fadeIn .45s ease both" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                <span style={{ color: "#6f6759" }}>XI / XII</span>
              </div>
              <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                  <ImageSlot id="fb-orn-vertical" fit="contain" />
                </div>
                <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                  <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Fellowship · 2021—</p>
                  <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(36px, 6.4vw, 84px)", lineHeight: "1.02", letterSpacing: "-0.015em" }}><a href="https://marginalrevolution.com/marginalrevolution/2021/09/emergent-ventures-india-new-winners-third-indian-cohort.html" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Emergent Ventures<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                  <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "44ch", textWrap: "pretty" }}>
                    A grant programme run by Tyler Cowen, backed by the Thiel and Schmidt foundations.
                  </p>
                </header>
              </div>
              <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                  <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Fellow since</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2021</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Granted</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Over $70,000, toward Airbound</dd>
                    </div>
                    <div>
                      <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Administered by</dt>
                      <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Tyler Cowen, Mercatus Center</dd>
                    </div>
                  </dl>
                </aside>
                <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                  <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it is</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                      <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>L</span>
                    </span>
                    aunched in 2018, Emergent Ventures is a deliberately low-overhead fellowship and grant programme for people with highly scalable, zero-to-one ideas for meaningfully improving society. Tyler Cowen, faculty director at the Mercatus Center, administers it.
                  </p>
                  <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                    <span>¶</span>
                    <span>What it gave me</span>
                  </h3>
                  <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    We secured over $70,000 in grants from Emergent Ventures to build Airbound, with the goal of making drone delivery genuinely accessible. It was the first money that treated the idea as serious.
                  </p>
                  <p style={{ margin: "0 0 40px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                    The other half of it was the community. Fellows gather at global offsites from everywhere and leave holding onto each other; at those, I met and learned from Dylan Field of Figma, Vitalik Buterin of Ethereum, and Vinay Hiremath of Loom. Being nineteen in that room recalibrated what I thought was possible to attempt.
                  </p>
                  <figure style={{ margin: "0", maxWidth: "640px" }}>
                    <div style={{ border: "1px solid rgba(27,25,22,0.45)", padding: "6px", background: "#ece5d7" }}>
                      <div style={{ border: "1px solid rgba(27,25,22,0.2)", aspectRatio: "4 / 3" }}>
                        <ImageSlot id="fb-emergent" fit="cover" />
                      </div>
                    </div>
                    <figcaption style={{ marginTop: "14px", display: "grid", gap: "6px" }}>
                      <span style={{ fontStyle: "italic", fontSize: "16px", color: "#4a453c" }}>Plate I — In good company</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Photograph</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
              <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                <button type="button" onClick={go('fund1517')} className="hv2">
                  <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}1517 Fund</span>
                </button>
                 <button type="button" onClick={go('thiel')} style={{ textAlign: "right" }} className="hv2">
                   <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Next</span>
                   <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Thiel Fellowship{'\u00a0'}→</span>
                 </button>
              </nav>
              <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>XI</p>
            </article>
          </>
           )}
           {at.thiel && (
           <>
             <article style={{ animation: "fadeIn .45s ease both" }}>
               <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6759" }}>
                 <button type="button" onClick={go('index')} className="hv2">←{'\u00a0'}{'\u00a0'}Contents</button>
                 <span style={{ color: "#6f6759" }}>XII / XII</span>
               </div>
               <div style={{ display: "flex", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "stretch", padding: "clamp(40px, 6vw, 88px) 0 0" }}>
                 <div className="orn-vertical" style={{ flex: "0 0 clamp(36px, 4.2vw, 56px)", alignSelf: "stretch", minHeight: "200px" }}>
                   <ImageSlot id="fb-orn-vertical" fit="contain" />
                 </div>
                 <header style={{ flex: "1 1 auto", minWidth: "0", animation: "riseIn .55s cubic-bezier(.2,.7,.2,1) both" }}>
                   <p style={{ margin: "0 0 24px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f2e18" }}>Finalist · 2021</p>
                   <h2 style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 7vw, 88px)", lineHeight: "1", letterSpacing: "-0.015em" }}><a href="https://thielfellowship.org/" target="_blank" rel="noreferrer" className="hv2" style={{ textDecoration: "none" }}>Thiel Fellowship<span aria-hidden="true" style={{ fontSize: "0.32em", verticalAlign: "top", marginLeft: "0.14em", color: "#8f2e18", fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>↗</span></a></h2>
                   <p style={{ margin: "24px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.1vw, 26px)", lineHeight: "1.45", color: "#4a453c", maxWidth: "42ch", textWrap: "pretty" }}>Peter Thiel’s bet on young people building things instead of sitting in college — I reached the last round, the interview with four Thiel Fellows.</p>
                 </header>
               </div>
               <div style={{ margin: "clamp(40px, 5vw, 64px) 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
               <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
                 <aside style={{ flex: "0 0 clamp(180px, 19vw, 224px)", borderTop: "1px solid #1b1916", paddingTop: "16px" }}>
                   <dl style={{ margin: "0", display: "grid", gap: "20px" }}>
                     <div>
                       <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Result</dt>
                       <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Finalist</dd>
                     </div>
                     <div>
                       <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Year</dt>
                       <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>2021</dd>
                     </div>
                     <div>
                       <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>Last round</dt>
                       <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>Interview with four Thiel Fellows</dd>
                     </div>
                     <div>
                       <dt style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759" }}>The award</dt>
                       <dd style={{ margin: "4px 0 0", fontSize: "17px", color: "#33302a" }}>$100,000 over two years</dd>
                     </div>
                   </dl>
                   <p style={{ margin: "32px 0 0", paddingTop: "20px", borderTop: "1px solid rgba(27,25,22,0.26)", fontStyle: "italic", fontSize: "16px", lineHeight: "1.5", color: "#5b554a" }}>The ones that ended badly still get written down.</p>
                 </aside>
                 <div style={{ flex: "1 1 520px", minWidth: "280px" }}>
                   <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                     <span>¶</span>
                     <span>What it is</span>
                   </h3>
                   <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                     <span style={{ float: "left", width: "74px", height: "74px", margin: "4px 18px 6px 0", border: "1px solid rgba(27,25,22,0.5)", padding: "3px", background: "#ece5d7", display: "flex" }}>
                       <span style={{ flex: "1", border: "1px solid rgba(27,25,22,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "46px", lineHeight: "1", color: "#8f2e18" }}>T</span>
                     </span>
                     he Thiel Fellowship hands people twenty-two and younger $100,000 over two years, on one condition: skip or leave college and build something instead. Started by Peter Thiel, it is one of the most watched bets on young founders anywhere — and one of the hardest rooms to get into.
                   </p>
                   <h3 style={{ margin: "48px 0 16px", display: "flex", alignItems: "baseline", gap: "10px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8f2e18", fontWeight: "400" }}>
                     <span>¶</span>
                     <span>How far I went</span>
                   </h3>
                   <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                     I applied in 2021, while I was building Airbound, and made it through the rounds to the last one: the interview with four Thiel Fellows. The fellowship went to others.
                   </p>
                   <p style={{ margin: "0 0 24px", fontSize: "19px", lineHeight: "32px", color: "#262218", maxWidth: "64ch", textWrap: "pretty" }}>
                     Being in that room still counted. Four people who had each taken the same bet, pressing on every weak joint in the plan — it was the sharpest outside check the work ever got, and it cost only the rounds it took to get there.
                   </p>
                   <div style={{ margin: "48px 0 0", padding: "32px 0", borderTop: "1px solid rgba(27,25,22,0.26)", borderBottom: "1px solid rgba(27,25,22,0.26)", maxWidth: "64ch" }}>
                     <p style={{ margin: "0", fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "clamp(22px, 2.3vw, 29px)", lineHeight: "1.4", fontStyle: "italic", color: "#1b1916", textAlign: "center", textWrap: "pretty" }}>It ended at the last table, in front of four Thiel Fellows — further than most get, and short of where I wanted to be.</p>
                   </div>
                 </div>
               </div>
               <div style={{ margin: "clamp(48px, 6vw, 80px) 0 0", height: "1px", background: "rgba(27,25,22,0.26)" }} />
               <nav className="pagenav" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 40px" }}>
                 <button type="button" onClick={go('emergent')} className="hv2">
                   <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Previous</span>
                   <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>←{'\u00a0'}Emergent Ventures</span>
                 </button>
                  <button type="button" onClick={go('index')} style={{ textAlign: "right" }} className="hv2">
                    <span style={{ display: "block", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6759", marginBottom: "6px" }}>Back to</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif", fontSize: "27px" }}>Contents{'\u00a0'}→</span>
                  </button>
               </nav>
               <p style={{ margin: "0", textAlign: "center", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "10px", letterSpacing: "0.24em", color: "#8a8175" }}>XII</p>
             </article>
           </>
            )}
         </div>
      </div>
      <FloatingPlayer />
    </div>
  );
}
