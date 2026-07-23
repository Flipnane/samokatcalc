document.addEventListener('DOMContentLoaded', () => {
    let currentMode = 'exact';
    let currentLang = 'ru';

    const themeToggle = document.getElementById('themeToggle');
    const tabExact = document.getElementById('tabExact');
    const tabApprox = document.getElementById('tabApprox');
    const exactFields = document.getElementById('exactFields');
    const approxFields = document.getElementById('approxFields');
    const calcForm = document.getElementById('calcForm');
    const counterContainer = document.getElementById('counterContainer');
    const clearBtn = document.getElementById('clearBtn');
    const langSelect = document.getElementById('langSelect');

    // Переводы
    const languages = {
        ru: { title: "Расчет стоимости", tabExact: "Точный (стопы)", tabApprox: "Примерный (заказы)", hours: "Количество часов (100 ₽/ч)", stops15: "Стопы 15 мин (50 ₽/шт)", stops30: "Стопы 30 мин (100 ₽/шт)", orders: "Количество заказов (50 ₽/шт)", extrapay: "Доплата (+10 ₽ за каждый стоп/заказ)", reset: "Сбросить значения", result: "Итоговая стоимость:" },
        en: { title: "Cost Calculation", tabExact: "Exact (stops)", tabApprox: "Approx (orders)", hours: "Number of hours (100 ₽/h)", stops15: "Stops 15 min (50 ₽/pc)", stops30: "Stops 30 min (100 ₽/pc)", orders: "Number of orders (50 ₽/pc)", extrapay: "Extra pay (+10 ₽ per stop/order)", reset: "Reset values", result: "Total cost:" },
        fr: { title: "Calcul du Coût", tabExact: "Exact (arrêts)", tabApprox: "Approximatif (commandes)", hours: "Nombre d'heures (100 ₽/h)", stops15: "Arrêts 15 min (50 ₽/pc)", stops30: "Arrêts 30 min (100 ₽/pc)", orders: "Nombre de commandes (50 ₽/pc)", extrapay: "Supplément (+10 ₽ par arrêt/commande)", reset: "Réinitialiser", result: "Coût total:" },
        tr: { title: "Maliyet Hesaplama", tabExact: "Kesin (duraklar)", tabApprox: "Yaklaşık (siparişler)", hours: "Saat sayısı (100 ₽/saat)", stops15: "15 dk durak (50 ₽/adet)", stops30: "30 dk durak (100 ₽/adet)", orders: "Sipariş sayısı (50 ₽/adet)", extrapay: "Ek ödeme (durak/sipariş başına +10 ₽)", reset: "Değerleri sıfırla", result: "Toplam maliyet:" },
        tg: { title: "Ҳисоби арзиш", tabExact: "Дақиқ (истҳо)", tabApprox: "Тахминӣ (фармоишҳо)", hours: "Миқдори соатҳо (100 ₽/соат)", stops15: "Истҳои 15 дақ (50 ₽/адад)", stops30: "Истҳои 30 дақ (100 ₽/адад)", orders: "Миқдори фармоишҳо (50 ₽/адад)", extrapay: "Иловапулӣ (+10 ₽ барои ҳар як ист/фармоиш)", reset: "Озод кардани нишондодҳо", result: "Арзиши умумӣ:" },
        kk: { title: "Құнын есептеу", tabExact: "Дәл (аялдамалар)", tabApprox: "Шамамен (тапсырыстар)", hours: "Сағат саны (100 ₽/сағ)", stops15: "15 мин аялдама (50 ₽/дана)", stops30: "30 мин аялдама (100 ₽/дана)", orders: "Тапсырыс саны (50 ₽/дана)", extrapay: "Қосымша төлем (әр аялдама/тапсырыс үшін +10 ₽)", reset: "Мәндерді тастау", result: "Жалпы құны:" },
        be: { title: "Рахунак кошт", tabExact: "Дакладны (прыпынкі)", tabApprox: "Прыблізны (заказы)", hours: "Колькасць гадзін (100 ₽/г)", stops15: "Прыпынкі 15 хв (50 ₽/шт)", stops30: "Прыпынкі 30 хв (100 ₽/шт)", orders: "Колькасць заказаў (50 ₽/шт)", extrapay: "Даплата (+10 ₽ за кожны прыпынак/заказ)", reset: "Скінуць значэнні", result: "Выніковы кошт:" },
        ky: { title: "Баасын эсептөө", tabExact: "Так (аялдамалар)", tabApprox: "Болжолдуу (буюртмалар)", hours: "Сааттардын саны (100 ₽/саат)", stops15: "15 мүн аялдама (50 ₽/даана)", stops30: "30 мүн аялдама (100 ₽/даана)", orders: "Буюртмалардын саны (50 ₽/даана)", extrapay: "Кошумча төлөм (ар бир аялдама/буюртма үчүн +10 ₽)", reset: "Маанилерди баштапкы абалга келтирүү", result: "Жалпы баасы:" },
        uz: { title: "Нархни ҳисоблаш", tabExact: "Аниқ (бекатлар)", tabApprox: "Тахминий (буюртмалар)", hours: "Соатлар сони (100 ₽/соат)", stops15: "15 дақ бекат (50 ₽/дона)", stops30: "30 дақ бекат (100 ₽/дона)", orders: "Буюртмалар сони (50 ₽/дона)", extrapay: "Қўшимча тўлов (ҳар бир бекат/буюртма учун +10 ₽)", reset: "Қийматларни ташлаб юбориш", result: "Якуний нарх:" },
        hy: { title: "Արժեքի հաշվարկ", tabExact: "Ճշգրիտ (կանգառներ)", tabApprox: "Մոտավոր (պատվերներ)", hours: "Ժամերի քանակ (100 ₽/ժ)", stops15: "Կանգառ 15 րոպե (50 ₽/հատ)", stops30: "Կանգառ 30 րոպե (100 ₽/հատ)", orders: "Պատվերների քանակ (50 ₽/հատ)", extrapay: "Հավելավճար (+10 ₽ յուրաքանչյուր կանգառի/պատվերի համար)", reset: "Չեղարկել արժեքները", result: "Ընդհանուր արժեքը:" }
    };

    function applyLanguage(lang) {
        currentLang = lang;
        const l = languages[lang];
        document.getElementById('lang-title').textContent = l.title;
        tabExact.textContent = l.tabExact;
        tabApprox.textContent = l.tabApprox;
        document.getElementById('lang-hours-lbl').textContent = l.hours;
        document.getElementById('lang-stops15-lbl').textContent = l.stops15;
        document.getElementById('lang-stops30-lbl').textContent = l.stops30;
        document.getElementById('lang-orders-lbl').textContent = l.orders;
        document.getElementById('lang-extrapay-lbl').textContent = l.extrapay;
        clearBtn.textContent = l.reset;
        document.getElementById('lang-result-lbl').textContent = l.result;
    }

    // Восстановление языка
    const savedLang = localStorage.getItem('calc-lang') || 'ru';
    langSelect.value = savedLang;
    applyLanguage(savedLang);

    langSelect.addEventListener('change', (e) => {
        applyLanguage(e.target.value);
        localStorage.setItem('calc-lang', e.target.value);
    });

    // Восстановление сохраненной темы
    const savedTheme = localStorage.getItem('calc-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    // Восстановление данных полей
    const savedMode = localStorage.getItem('calc-mode');
    const savedHours = localStorage.getItem('calc-hours');
    const savedStops15 = localStorage.getItem('calc-stops15');
    const savedStops30 = localStorage.getItem('calc-stops30');
    const savedOrders = localStorage.getItem('calc-orders');
    const savedExtraPay = localStorage.getItem('calc-extrapay');

    if (savedHours) document.getElementById('hours').value = savedHours;
    if (savedStops15) document.getElementById('stops15').value = savedStops15;
    if (savedStops30) document.getElementById('stops30').value = savedStops30;
    if (savedOrders) document.getElementById('orders').value = savedOrders;
    if (savedExtraPay) document.getElementById('extraPay').checked = (savedExtraPay === 'true');

    if (savedMode === 'approx') { initMode('approx'); } else { initMode('exact'); }

    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('calc-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('calc-theme', 'light');
        }
    });

    tabExact.addEventListener('click', () => setMode('exact'));
    tabApprox.addEventListener('click', () => setMode('approx'));

    function initMode(mode) {
        currentMode = mode;
        if (mode === 'exact') {
            tabExact.classList.add('active'); tabApprox.classList.remove('active');
            approxFields.classList.add('hidden'); exactFields.classList.remove('hidden');
        } else {
            tabApprox.classList.add('active'); tabExact.classList.remove('active');
            exactFields.classList.add('hidden'); approxFields.classList.remove('hidden');
        }
    }

    function setMode(mode) {
        if (currentMode === mode) return;
        initMode(mode);
        localStorage.setItem('calc-mode', mode);
        calculate();
    }

    // Валидация с эффектом тряски и красной подсветки на 1.5 секунды
    calcForm.addEventListener('input', (e) => {
        if (e.target.type === 'number') {
            let val = parseFloat(e.target.value);
            if (val < 0 || isNaN(val) && e.target.value.includes('-')) {
                e.target.value = 0;
                e.target.classList.add('invalid-input');
                setTimeout(() => {
                    e.target.classList.remove('invalid-input');
                }, 1500);
            }
        }
        calculate();
    });

    clearBtn.addEventListener('click', () => {
        document.getElementById('hours').value = '';
        document.getElementById('stops15').value = 0;
        document.getElementById('stops30').value = 0;
        document.getElementById('orders').value = 0;
        document.getElementById('extraPay').checked = false;
        calculate();
    });

    function updateOdometer(value) {
        const valueString = Math.round(value).toString();
        const currentBoxes = counterContainer.querySelectorAll('.digit-box');
        
        if (currentBoxes.length !== valueString.length) {
            counterContainer.innerHTML = '';
            for (let i = 0; i < valueString.length; i++) {
                const box = document.createElement('div');
                box.className = 'digit-box';
                const strip = document.createElement('div');
                strip.className = 'digit-strip';
                for (let j = 0; j <= 9; j++) {
                    const span = document.createElement('span');
                    span.textContent = j;
                    strip.appendChild(span);
                }
                box.appendChild(strip);
                counterContainer.appendChild(box);
            }
            const currency = document.createElement('span');
            currency.className = 'currency-symbol';
            currency.textContent = ' ₽';
            counterContainer.appendChild(currency);
        }

        const strips = counterContainer.querySelectorAll('.digit-strip');
        valueString.split('').forEach((digit, index) => {
            const moveY = parseInt(digit) * 42;
            if (strips[index]) {
                // ИСПРАВЛЕНО: Добавлены косые кавычки для корректной подстановки переменной moveY
                strips[index].style.transform = `translateY(-${moveY}px)`;
            }
        });
    }

    function calculate() {
        const hoursRaw = document.getElementById('hours').value;
        const stops15Raw = document.getElementById('stops15').value;
        const stops30Raw = document.getElementById('stops30').value;
        const ordersRaw = document.getElementById('orders').value;
        const hasExtraPay = document.getElementById('extraPay').checked;

        localStorage.setItem('calc-hours', hoursRaw);
        localStorage.setItem('calc-stops15', stops15Raw);
        localStorage.setItem('calc-stops30', stops30Raw);
        localStorage.setItem('calc-orders', ordersRaw);
        localStorage.setItem('calc-extrapay', hasExtraPay);

        const hours = parseFloat(hoursRaw) || 0;
        const HOUR_RATE = 100; 
        const EXTRA_PER_ITEM = 10;

        let total = hours * HOUR_RATE;

        if (currentMode === 'exact') {
            const stops15 = parseInt(stops15Raw) || 0;
            const stops30 = parseInt(stops30Raw) || 0;
            total += (stops15 * 50) + (stops30 * 65);
            if (hasExtraPay) total += (stops15 + stops30) * EXTRA_PER_ITEM;
        } else {
            const orders = parseInt(ordersRaw) || 0;
            total += orders * 50; 
            if (hasExtraPay) total += orders * EXTRA_PER_ITEM;
        }

        updateOdometer(total);
    }

    calculate();
});

