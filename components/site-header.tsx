"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/services", label: "サービス" },
  { href: "https://karte.ceo-sherpa.com/partners.html", label: "パートナー制度", external: true },
  { href: "/#column", label: "コラム" },
  { href: "/company", label: "会社概要" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Two Rails トップページ">
          <Image className="logo-image" src="/logo.png" alt="" width={225} height={225} priority />
          <span className="logo-text">Two Rails</span>
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="header-cta">お問い合わせ</Link>
        <button
          ref={button}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-nav${open ? " is-open" : ""}`} aria-label="モバイルナビゲーション" aria-hidden={!open}>
        <div className="container">
          {links.map((link, index) => (
            <Link
              key={link.href}
              ref={index === 0 ? firstLink : undefined}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {link.label}{link.external && <span aria-hidden="true"> ↗</span>}
            </Link>
          ))}
          <Link href="/contact" className="mobile-contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>お問い合わせ</Link>
        </div>
      </nav>
    </header>
  );
}
