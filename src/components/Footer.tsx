import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-charcoal text-white py-8 mt-auto border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-white/60 hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          
          {/* Disclaimer */}
          <p className="text-small text-white/80 leading-relaxed max-w-2xl mx-auto">
            Educational only — not financial, legal, or tax advice. Opportunities subject to eligibility & availability.
          </p>
          
          {/* Copyright */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-small text-white/60">
              © 2024 Mustang Ranch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
