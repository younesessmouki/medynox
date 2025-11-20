import type { Metadata } from 'next';
import './globals.css';
import { HydrationFix } from '@/components/HydrationFix';
import { ThemeProvider } from '@/contexts/ThemeContext';


export const metadata: Metadata = {
  title: 'Medynox - Plateforme Médicale',
  description: 'Plateforme médicale professionnelle pour la gestion des cabinets et cliniques',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Inline script to run immediately and remove extension attributes before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                'use strict';
                // Remove browser extension attributes before React hydrates
                var attributesToRemove = [
                  'bis_skin_checked',
                  'bis_register',
                  '__processed',
                  'data-lastpass-icon-root',
                  'data-lastpass-root',
                ];

                function removeFromElement(element) {
                  if (!element || typeof element.removeAttribute !== 'function') return;
                  for (var i = 0; i < attributesToRemove.length; i++) {
                    var attr = attributesToRemove[i];
                    if (element.hasAttribute && element.hasAttribute(attr)) {
                      element.removeAttribute(attr);
                    }
                  }
                }

                function removeExtensionAttributes() {
                  // Remove from document root
                  if (document.documentElement) {
                    removeFromElement(document.documentElement);
                  }

                  // Remove from body (if exists)
                  if (document.body) {
                    removeFromElement(document.body);
                  }

                  // Remove from all elements
                  try {
                    var allElements = document.querySelectorAll('*');
                    for (var i = 0; i < allElements.length; i++) {
                      removeFromElement(allElements[i]);
                    }
                  } catch (e) {
                    // Ignore errors
                  }
                }

                // Remove immediately when script runs
                removeExtensionAttributes();

                // Also remove on DOMContentLoaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    removeExtensionAttributes();
                  }, false);
                }

                // Use MutationObserver to catch attributes as they're added (more efficient than setInterval)
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    var shouldRemove = false;
                    for (var i = 0; i < mutations.length; i++) {
                      var mutation = mutations[i];
                      if (mutation.type === 'attributes') {
                        var target = mutation.target;
                        for (var j = 0; j < attributesToRemove.length; j++) {
                          if (target.hasAttribute(attributesToRemove[j])) {
                            shouldRemove = true;
                            break;
                          }
                        }
                      }
                    }
                    if (shouldRemove) {
                      removeExtensionAttributes();
                    }
                  });

                  // Start observing when DOM is ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                      if (document.documentElement) {
                        observer.observe(document.documentElement, {
                          attributes: true,
                          childList: true,
                          subtree: true,
                          attributeFilter: attributesToRemove,
                        });
                      }
                    }, false);
                  } else {
                    if (document.documentElement) {
                      observer.observe(document.documentElement, {
                        attributes: true,
                        childList: true,
                        subtree: true,
                        attributeFilter: attributesToRemove,
                      });
                    }
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Client component to continue removing attributes after React hydrates */}
        <HydrationFix />
        {/* Suppress hydration warnings from browser extensions */}
        <ThemeProvider>
          <div suppressHydrationWarning>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

