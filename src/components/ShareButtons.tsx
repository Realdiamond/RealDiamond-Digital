"use client";

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = url.startsWith('http') ? url : `https://realdiamond-digital.vercel.app${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error - fallback to menu
        setShowMenu(true);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">Share this article:</span>
        
        {/* Main share button */}
        <button 
          onClick={handleNativeShare}
          className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors"
          aria-label="Share article"
        >
          <Share2 className="w-4 h-4 text-foreground" />
        </button>

        {/* Desktop share buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors group"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
          </a>
          
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors group"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
          </a>
          
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors group"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
          </a>
          
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors group"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
          </a>

          <button
            onClick={handleCopyLink}
            className="w-10 h-10 glass-card flex items-center justify-center hover:border-accent/50 transition-colors group"
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-accent" />
            ) : (
              <LinkIcon className="w-4 h-4 text-foreground group-hover:text-accent transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {showMenu && (
        <div className="md:hidden absolute top-full left-0 mt-2 w-64 glass-card p-4 z-50 shadow-elevated">
          <div className="flex flex-col gap-2">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Twitter className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Share on Twitter</span>
            </a>
            
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Facebook className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Share on Facebook</span>
            </a>
            
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Linkedin className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Share on LinkedIn</span>
            </a>
            
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <FaWhatsapp className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Share on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                handleCopyLink();
                setTimeout(() => setShowMenu(false), 1000);
              }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors text-left"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-sm text-accent">Link copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
