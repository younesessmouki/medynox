'use client';

import { useEffect } from 'react';

/**
 * Client component that removes browser extension attributes after React hydrates.
 * This prevents hydration mismatches caused by extensions like Bitdefender
 * that inject attributes (e.g., bis_skin_checked) before React hydrates.
 */
export function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes after hydration
    const removeExtensionAttributes = () => {
      const attributesToRemove = [
        'bis_skin_checked',
        'bis_register',
        '__processed',
        'data-lastpass-icon-root',
        'data-lastpass-root',
      ];

      const removeAttributes = (element: Element) => {
        attributesToRemove.forEach((attr) => {
          if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
          }
        });

        // Recursively process children
        Array.from(element.children).forEach(removeAttributes);
      };

      // Remove attributes from document body
      if (document.body) {
        removeAttributes(document.body);
      }

      // Remove attributes from document root
      if (document.documentElement) {
        attributesToRemove.forEach((attr) => {
          if (document.documentElement.hasAttribute(attr)) {
            document.documentElement.removeAttribute(attr);
          }
        });
      }
    };

    // Remove immediately
    removeExtensionAttributes();

    // Use MutationObserver to remove attributes as they're added by extensions (more efficient)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attributesToRemove = [
            'bis_skin_checked',
            'bis_register',
            '__processed',
            'data-lastpass-icon-root',
            'data-lastpass-root',
          ];

          attributesToRemove.forEach((attr) => {
            if (target.hasAttribute(attr)) {
              target.removeAttribute(attr);
            }
          });
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              removeExtensionAttributes();
            }
          });
        }
      });
    });

    // Observe the entire document for attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: [
        'bis_skin_checked',
        'bis_register',
        '__processed',
        'data-lastpass-icon-root',
        'data-lastpass-root',
      ],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

