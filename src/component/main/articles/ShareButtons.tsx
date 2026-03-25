'use client'

import { useState } from 'react'

type Props = {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false)

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="social-share d-flex align-items-center gap-2 flex-wrap">
      <span className="me-1">Share:</span>
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Twitter/X"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <button
        onClick={copyLink}
        title="Copy link"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: 14,
          color: copied ? '#27ae60' : 'inherit',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <i className={`fa-regular ${copied ? 'fa-circle-check' : 'fa-copy'}`}></i>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
