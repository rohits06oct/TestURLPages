document.addEventListener('DOMContentLoaded', () => {
    injectTranslator();

    function injectTranslator() {
        if (document.getElementById('google_translate_element')) return;

        const translateContainer = document.createElement('div');
        translateContainer.id = 'google_translate_container';
        translateContainer.style.cssText = 'text-align: right; padding: 10px 20px; background: var(--card-bg, #ffffff); border: 1px solid var(--border-color, #eeeeee); margin-bottom: 30px; border-radius: 12px; display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);';

        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'inline-block';

        const label = document.createElement('span');
        label.innerText = 'Translate: ';
        label.style.fontWeight = '700';
        label.style.color = 'var(--secondary, #00334e)';
        label.style.fontSize = '14px';
        label.style.textTransform = 'uppercase';
        label.style.letterSpacing = '0.5px';

        translateContainer.appendChild(label);
        translateContainer.appendChild(translateDiv);

        const mainContainer = document.querySelector('main.container') || 
                            document.querySelector('.article-main') || 
                            document.querySelector('.page-content') ||
                            document.querySelector('main');
        const header = document.getElementById('site-header') || document.querySelector('header');

        if (mainContainer) {
            mainContainer.prepend(translateContainer);
        } else if (header) {
            header.after(translateContainer);
            // If it's outside a main container, apply the container class for alignment
            translateContainer.classList.add('container');
        } else {
            document.body.prepend(translateContainer);
        }

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr,de,pl,zh-CN,hi,pt,ru,ja,ar,bn,ur,ko',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }
});
