import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { BackgroundImage } from '@/components/atoms';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import { PageComponentProps } from '@/types';
import { PageModelType } from '@/types/generated';

type BaseLayoutProps = React.PropsWithChildren & PageComponentProps & PageModelType;

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
    const { global, ...page } = props;
    const { site } = global;

    return (
        <div className="flex flex-col grow">
            {page?.backgroundImage && <BackgroundImage {...page?.backgroundImage} />}
            {site.header && (
                <Annotated content={site}>
                    <Annotated content={site.header}>
                        <Header {...site.header} />
                    </Annotated>
                </Annotated>
            )}
            <Annotated content={page}>
                <main id="main" className="relative grow">
                    {props.children}
                </main>
            </Annotated>
            {site.footer && (
                <Annotated content={site}>
                    <Annotated content={site.footer}>
                        <Footer {...site.footer} />
                    </Annotated>
                </Annotated>
            )}
        </div>
        <script is:inline>
        function updateMetaThemeColor() {
    // 1. Hole die aktuelle Hintergrundfarbe vom Body (berechnet durch CSS Variablen)
    const bodyColor = getComputedStyle(document.body).backgroundColor;
    
    // 2. Suche das meta-tag (oder erstelle es, falls nicht vorhanden)
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = "theme-color";
        document.head.appendChild(metaThemeColor);
    }
    
    // 3. Setze die Farbe hart
    metaThemeColor.setAttribute('content', bodyColor);
}

// Ausführen beim Laden
updateMetaThemeColor();

// Falls du Themes zur Laufzeit wechselst (z.B. per Klick), führe die Funktion danach erneut aus!
// Beispiel: Observer, der auf Attribut-Änderungen am Body achtet
new MutationObserver(updateMetaThemeColor).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    </script>
    );
};

export default BaseLayout;
