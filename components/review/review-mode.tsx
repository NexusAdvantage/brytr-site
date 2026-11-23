"use client"

import { useEffect, useRef, useState } from "react"

/* CLIENT REVIEW MODE. Same tool as the Second Hope review link.
 *
 * Opening any page with ?review=brytr-zac-review turns it on for that browser: the reviewer
 * clicks any words to retype them, or leaves a note on anything. Every change saves straight to
 * the site_review_edits table (Supabase project nexus-client-portal) through the review_save
 * function, under site "brytr", so a review can run over many days and devices. Nothing on the
 * live site changes for anyone else. ?review=off turns it back off.
 *
 * The key below is the project's publishable key. The functions it can call check the token
 * against site_review_tokens and only ever touch review rows, so it is safe in the bundle. */

const TOKEN = "brytr-zac-review"
const FLAG = "brytrReview"
const NAME = "brytrReviewName"
const PENDING = "brytrReviewPending"
const SITE = "brytr"
const SB_RPC = "https://qiocucyagcwddtoecpyr.supabase.co/rest/v1/rpc/"
const SB_KEY = "sb_publishable_wMpg8OxIZ0TXefDGQZpgbw_njpz1oZ9"
const PICK = "h1,h2,h3,h4,p,li,dt,dd,figcaption,summary,a,button,small,b,span,em,strong,label"

type Edit = { id: string; page: string; kind: "edit" | "note"; original: string; revised?: string; note?: string }
type Saved = { page: string; kind: string; key: string; original: string; revised: string | null; note: string | null }

const rpc = async (fn: string, body: Record<string, unknown>) => {
  const r = await fetch(SB_RPC + fn, {
    method: "POST",
    headers: { apikey: SB_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ p_token: TOKEN, p_site: SITE, ...body }),
  })
  if (!r.ok) throw new Error(String(r.status))
  return r.json()
}

const read = <T,>(k: string, d: T): T => {
  try {
    const v = localStorage.getItem(k)
    return v ? (JSON.parse(v) as T) : d
  } catch {
    return d
  }
}
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {}
}
const text = (el: Element) => (el as HTMLElement).innerText.replace(/\s+/g, " ").trim()
const pageLabel = (p: string) =>
  p === "/" ? "Home" : p.replace(/^\/|\/$/g, "").split("/").pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

export function ReviewMode() {
  const [on, setOn] = useState(false)
  const [count, setCount] = useState(0)
  const [noteMode, setNoteMode] = useState(false)
  const [note, setNote] = useState<{ target: string; value: string } | null>(null)
  const [pages, setPages] = useState<string[]>([])
  const [name, setName] = useState("Zac")
  const [status, setStatus] = useState("")
  const barRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef(noteMode)
  noteRef.current = noteMode
  const nameRef = useRef(name)
  nameRef.current = name

  // Save one change. If the network fails it waits in this browser and goes out with the next
  // save, so nothing is lost.
  const save = async (e: Edit) => {
    const queue = [...read<Edit[]>(PENDING, []).filter((x) => x.id !== e.id), e]
    write(PENDING, queue)
    setStatus("Saving...")
    const left: Edit[] = []
    for (const q of queue) {
      try {
        await rpc("review_save", {
          p_page: q.page,
          p_kind: q.kind,
          p_key: q.id,
          p_original: q.original,
          p_revised: q.revised ?? null,
          p_note: q.note ?? null,
          p_reviewer: nameRef.current,
        })
      } catch {
        left.push(q)
      }
    }
    write(PENDING, left)
    setStatus(left.length ? "Could not save just now. It will try again with your next change." : "Saved")
    refreshCount()
  }
  const refreshCount = () =>
    rpc("review_list", {})
      .then((rows: Saved[]) => setCount(rows.length))
      .catch(() => {})

  // Turn on from the link, remember it for this browser, and load earlier changes from any
  // device so he can see where he left off.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("review")
    if (q === TOKEN) write(FLAG, true)
    if (q === "off") write(FLAG, false)
    if (!read(FLAG, false)) return
    setOn(true)
    setName(read(NAME, "Zac"))
    const here = window.location.pathname
    rpc("review_list", {})
      .then((rows: Saved[]) => {
        setCount(rows.length)
        const els = Array.from(
          document.querySelectorAll<HTMLElement>(`main ${PICK.split(",").join(",main ")}, footer p, footer li, footer a`),
        )
        for (const e of rows.filter((x) => x.page === here && x.kind === "edit")) {
          const el = els.find((n) => !n.dataset.revOrig && text(n) === e.original)
          if (el) {
            el.dataset.revOrig = e.original
            el.innerText = e.revised || ""
            el.classList.add("rev-changed")
          }
        }
      })
      .catch(() => setStatus("Could not load your earlier changes. They are still saved."))
    if (read<Edit[]>(PENDING, []).length)
      setTimeout(() => {
        const [first] = read<Edit[]>(PENDING, [])
        if (first) save(first)
      }, 500)
    fetch("/sitemap.xml")
      .then((r) => r.text())
      .then((x) => setPages(Array.from(x.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => new URL(m[1]).pathname)))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Click handling: every click on the page edits (or notes) instead of navigating.
  useEffect(() => {
    if (!on) return
    const onClick = (ev: MouseEvent) => {
      const t = ev.target as HTMLElement
      if (barRef.current?.contains(t) || t.closest(".rev-note") || t.closest("input,select,textarea")) return
      const el = t.closest(PICK) as HTMLElement | null
      ev.preventDefault()
      ev.stopPropagation()
      if (!el || !text(el)) return
      if (noteRef.current) {
        setNote({ target: text(el).slice(0, 300), value: "" })
        setNoteMode(false)
        return
      }
      if (!el.dataset.revOrig) el.dataset.revOrig = text(el)
      if (el.getAttribute("contenteditable") !== "true") {
        el.dataset.revBefore = text(el)
        el.setAttribute("contenteditable", "true")
        el.focus()
      }
    }
    const onBlur = (ev: FocusEvent) => {
      const el = ev.target as HTMLElement
      if (!el?.dataset?.revOrig || el.getAttribute("contenteditable") !== "true") return
      el.removeAttribute("contenteditable")
      const orig = el.dataset.revOrig
      const now = text(el)
      el.classList.toggle("rev-changed", now !== orig)
      if (now === el.dataset.revBefore) return
      save({ id: Math.random().toString(36).slice(2), page: window.location.pathname, kind: "edit", original: orig, revised: now })
    }
    const onKey = (ev: KeyboardEvent) => {
      const el = ev.target as HTMLElement
      if (ev.key === "Enter" && el?.getAttribute?.("contenteditable") === "true") {
        ev.preventDefault()
        el.blur()
      }
    }
    document.addEventListener("click", onClick, true)
    document.addEventListener("focusout", onBlur, true)
    document.addEventListener("keydown", onKey, true)
    document.documentElement.classList.add("rev-on")
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("focusout", onBlur, true)
      document.removeEventListener("keydown", onKey, true)
      document.documentElement.classList.remove("rev-on")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on])

  if (!on) return null

  const saveNote = () => {
    if (!note?.value.trim()) return setNote(null)
    save({ id: Math.random().toString(36).slice(2), page: window.location.pathname, kind: "note", original: note.target, note: note.value.trim() })
    setNote(null)
  }
  const done = async () => {
    try {
      await rpc("review_save", {
        p_page: window.location.pathname,
        p_kind: "done",
        p_key: "done",
        p_original: null,
        p_revised: null,
        p_note: "Reviewer marked the review done",
        p_reviewer: name,
      })
      setStatus("Thank you! We got everything and will let you know when it is updated.")
    } catch {
      setStatus("Your changes are saved. We could not mark it done just now, so just let Kaiden know.")
    }
  }
  const exit = () => {
    write(FLAG, false)
    window.location.href = window.location.pathname
  }

  return (
    <>
      <style>{`
.rev-on main :is(${PICK}):hover,.rev-on footer :is(p,li,a):hover{outline:2px dashed var(--brand-accent);outline-offset:3px;cursor:text}
.rev-on [contenteditable=true]{outline:2px solid var(--brand-accent)!important;outline-offset:3px;background:color-mix(in srgb,var(--brand-accent) 22%,white)!important;color:var(--brand-ink)!important}
.rev-on .rev-changed{background:color-mix(in srgb,var(--brand-accent) 40%,white)!important;color:var(--brand-ink)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--brand-accent) 40%,white)}
.rev-on body{padding-bottom:110px}
.rev-bar{position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483000;background:var(--brand-primary);color:var(--on-dark);border-radius:16px;padding:12px 14px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;font:500 14px/1.3 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.35)}
.rev-bar b{font-weight:700}
.rev-bar .grow{flex:1 1 240px;min-width:0}
.rev-bar small{display:block;opacity:.75;font-size:12px;margin-top:2px}
.rev-bar button,.rev-bar select,.rev-bar input{font:inherit;border-radius:999px;border:0;padding:8px 14px;cursor:pointer}
.rev-bar input{width:90px;cursor:text;background:white;color:var(--brand-ink)}
.rev-bar select{background:white;color:var(--brand-ink);max-width:200px}
.rev-bar .send{background:var(--brand-accent);color:var(--brand-ink);font-weight:700}
.rev-bar .ghost{background:transparent;color:var(--on-dark);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.5)}
.rev-bar .ghost.on{background:var(--brand-accent);color:var(--brand-ink);box-shadow:none}
.rev-note{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483001;width:min(460px,calc(100vw - 32px));background:white;border-radius:16px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.35);font:15px/1.4 system-ui,sans-serif;color:var(--brand-ink)}
.rev-note q{display:block;font-size:13px;color:var(--muted-foreground);margin:6px 0 10px}
.rev-note textarea{width:100%;min-height:110px;border:1px solid var(--input);border-radius:10px;padding:10px;font:inherit}
.rev-note div{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
.rev-note button{font:inherit;border:0;border-radius:999px;padding:8px 16px;cursor:pointer;background:var(--brand-primary);color:var(--on-dark)}
.rev-note button.alt{background:var(--brand-neutral);color:var(--brand-ink)}
`}</style>
      <div className="rev-bar" ref={barRef}>
        <span className="grow">
          <b>{noteMode ? "Click the part you want to leave a note on." : "Edit mode: click any words to change them."}</b>
          <small>
            {status ? `${status}${/[.!]$/.test(status) ? "" : "."} ` : ""}
            {count ? `${count} change${count === 1 ? "" : "s"} saved so far. ` : ""}
            Everything saves on its own. Use Go to page to move around.
          </small>
        </span>
        <select
          aria-label="Go to page"
          value=""
          onChange={(e) => {
            if (e.target.value) window.location.href = e.target.value
          }}
        >
          <option value="">Go to page</option>
          {pages.map((p) => (
            <option key={p} value={p}>
              {pageLabel(p)}
            </option>
          ))}
        </select>
        <button className={`ghost${noteMode ? " on" : ""}`} onClick={() => setNoteMode((v) => !v)}>
          {noteMode ? "Cancel note" : "Add a note"}
        </button>
        <input
          aria-label="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            write(NAME, e.target.value)
          }}
        />
        <button className="send" onClick={done}>
          I am done
        </button>
        <button className="ghost" onClick={exit}>
          Exit
        </button>
      </div>
      {note ? (
        <div className="rev-note" role="dialog" aria-label="Add a note">
          <b>Note about:</b>
          <q>{note.target}</q>
          <textarea
            autoFocus
            placeholder="What would you like changed here?"
            value={note.value}
            onChange={(e) => setNote({ ...note, value: e.target.value })}
          />
          <div>
            <button className="alt" onClick={() => setNote(null)}>
              Cancel
            </button>
            <button onClick={saveNote}>Save note</button>
          </div>
        </div>
      ) : null}
    </>
  )
}
