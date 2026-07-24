document.addEventListener('DOMContentLoaded', () => {
    let currentMode = 'exact';
    let currentCompany = 'partner';
    let currentLang = 'ru';
    let selectedCityKey = 'moscow';
    let selectedTransportKey = 'velo';
    let extraPayAmount = 10;
    let calendarCompany = 'partner';

    // ============ ТАРИФЫ ПАРТНЕРОВ ============
    const samokatTariffs = {
        moscow: { name: "Москва", velo: { rate: 100, sla15: 50, sla30: 65 }, "e-velo": { rate: 100, sla15: 50, sla30: 65 }, auto: { rate: 230, sla15: 65, sla30: 75 }, pedestrian: { rate: 100, sla15: 50, sla30: 65 } },
        spb: { name: "Санкт-Петербург", velo: { rate: 100, sla15: 50, sla30: 65 }, "e-velo": { rate: 120, sla15: 50, sla30: 65 }, auto: { rate: 195, sla15: 65, sla30: 80 }, pedestrian: { rate: 100, sla15: 50, sla30: 65 } },
        kazan: { name: "Казань", velo: { rate: 110, sla15: 35, sla30: 45 }, "e-velo": { rate: 130, sla15: 35, sla30: 45 }, auto: { rate: 185, sla15: 50, sla30: 65 }, pedestrian: { rate: 110, sla15: 35, sla30: 45 } },
        samara: { name: "Самара", velo: { rate: 110, sla15: 35, sla30: 45 }, "e-velo": { rate: 130, sla15: 35, sla30: 45 }, auto: { rate: 160, sla15: 50, sla30: 65 }, pedestrian: { rate: 110, sla15: 35, sla30: 45 } },
        kolomna: { name: "Коломна", velo: { rate: 120, sla15: 50, sla30: 65 }, "e-velo": { rate: 120, sla15: 50, sla30: 65 }, auto: { rate: 160, sla15: 55, sla30: 70 }, pedestrian: { rate: 120, sla15: 50, sla30: 65 } },
        nizhny: { name: "Нижний Новгород", velo: { rate: 110, sla15: 35, sla30: 45 }, "e-velo": { rate: 130, sla15: 35, sla30: 45 }, auto: { rate: 170, sla15: 50, sla30: 65 }, pedestrian: { rate: 110, sla15: 35, sla30: 45 } },
        tula: { name: "Тула", velo: { rate: 120, sla15: 50, sla30: 65 }, "e-velo": { rate: 120, sla15: 50, sla30: 65 }, auto: { rate: 135, sla15: 65, sla30: 80 }, pedestrian: { rate: 120, sla15: 50, sla30: 65 } },
        vladimir: { name: "Владимир", velo: { rate: 110, sla15: 35, sla30: 45 }, "e-velo": { rate: 130, sla15: 35, sla30: 45 }, auto: { rate: 160, sla15: 55, sla30: 70 }, pedestrian: { rate: 110, sla15: 35, sla30: 45 } },
        ekb: { name: "Екатеринбург", velo: { rate: 100, sla15: 50, sla30: 65 }, "e-velo": { rate: 120, sla15: 50, sla30: 65 }, auto: { rate: 195, sla15: 55, sla30: 70 }, pedestrian: { rate: 100, sla15: 50, sla30: 65 } },
        krasnodar: { name: "Краснодар", velo: { rate: 105, sla15: 30, sla30: 40 }, "e-velo": { rate: 125, sla15: 30, sla30: 40 }, auto: { rate: 205, sla15: 45, sla30: 60 }, pedestrian: { rate: 105, sla15: 30, sla30: 40 } },
        rostov: { name: "Ростов-на-Дону", velo: { rate: 110, sla15: 35, sla30: 45 }, "e-velo": { rate: 130, sla15: 35, sla30: 45 }, auto: { rate: 145, sla15: 55, sla30: 70 }, pedestrian: { rate: 110, sla15: 35, sla30: 45 } },
        volgograd: { name: "Волгоград", velo: { rate: 100, sla15: 30, sla30: 40 }, "e-velo": { rate: 120, sla15: 30, sla30: 40 }, auto: { rate: 165, sla15: 45, sla30: 60 }, pedestrian: { rate: 100, sla15: 30, sla30: 40 } },
        sochi: { name: "Сочи", velo: { rate: 120, sla15: 40, sla30: 55 }, "e-velo": { rate: 150, sla15: 40, sla30: 55 }, auto: { rate: 170, sla15: 45, sla30: 60 }, pedestrian: { rate: 120, sla15: 40, sla30: 55 } },
        voronezh: { name: "Воронеж", velo: { rate: 110, sla15: 40, sla30: 60 }, "e-velo": { rate: 130, sla15: 40, sla30: 60 }, auto: { rate: 160, sla15: 60, sla30: 80 }, pedestrian: { rate: 110, sla15: 40, sla30: 60 } },
        novosibirsk: { name: "Новосибирск", velo: { rate: 100, sla15: 35, sla30: 45 }, "e-velo": { rate: 120, sla15: 35, sla30: 45 }, auto: { rate: 155, sla15: 50, sla30: 65 }, pedestrian: { rate: 100, sla15: 35, sla30: 45 } },
        ryazan: { name: "Рязань", velo: { rate: 110, sla15: 40, sla30: 55 }, "e-velo": { rate: 130, sla15: 40, sla30: 55 }, auto: { rate: 150, sla15: 55, sla30: 70 }, pedestrian: { rate: 110, sla15: 40, sla30: 55 } }
    };

    // ============ ТАРИФЫ СБЕРА ============
    const sberTariffs = {
        moscow: { name: "Москва", pedestrian: { rate: 106, sla15: 53, sla30: 69 }, velo: { rate: 106, sla15: 53, sla30: 69 }, motor: { rate: 138, sla15: 53, sla30: 69 }, "e-velo": { rate: 106, sla15: 53, sla30: 69 }, auto: { rate: 245, sla15: 69, sla30: 80 } },
        spb: { name: "Санкт-Петербург", pedestrian: { rate: 106, sla15: 53, sla30: 69 }, velo: { rate: 106, sla15: 53, sla30: 69 }, motor: { rate: 133, sla15: 53, sla30: 69 }, "e-velo": { rate: 128, sla15: 53, sla30: 69 }, auto: { rate: 186, sla15: 69, sla30: 85 } },
        kazan: { name: "Казань", pedestrian: { rate: 117, sla15: 37, sla30: 48 }, velo: { rate: 117, sla15: 37, sla30: 48 }, motor: { rate: 144, sla15: 37, sla30: 48 }, "e-velo": { rate: 138, sla15: 37, sla30: 48 }, auto: { rate: 197, sla15: 53, sla30: 69 } },
        nizhny: { name: "Нижний Новгород", pedestrian: { rate: 117, sla15: 37, sla30: 48 }, velo: { rate: 117, sla15: 37, sla30: 48 }, motor: { rate: 149, sla15: 37, sla30: 48 }, "e-velo": { rate: 138, sla15: 37, sla30: 48 }, auto: { rate: 181, sla15: 53, sla30: 69 } },
        samara: { name: "Самара", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 170, sla15: 53, sla30: 69 } },
        novosibirsk: { name: "Новосибирск", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, motor: { rate: 133, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 165, sla15: 53, sla30: 69 } },
        ekb: { name: "Екатеринбург", pedestrian: { rate: 106, sla15: 43, sla30: 59 }, velo: { rate: 106, sla15: 43, sla30: 59 }, motor: { rate: 138, sla15: 43, sla30: 59 }, "e-velo": { rate: 128, sla15: 43, sla30: 59 }, auto: { rate: 207, sla15: 59, sla30: 74 } },
        krasnodar: { name: "Краснодар", pedestrian: { rate: 112, sla15: 32, sla30: 43 }, velo: { rate: 112, sla15: 32, sla30: 43 }, motor: { rate: 138, sla15: 32, sla30: 43 }, "e-velo": { rate: 133, sla15: 32, sla30: 43 }, auto: { rate: 218, sla15: 48, sla30: 64 } },
        ufa: { name: "Уфа", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 160, sla15: 48, sla30: 64 } },
        kemerovo: { name: "Кемерово", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 154, sla15: 48, sla30: 64 } },
        perm: { name: "Пермь", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 181, sla15: 43, sla30: 59 } },
        rostov: { name: "Ростов-на-Дону", pedestrian: { rate: 117, sla15: 37, sla30: 48 }, velo: { rate: 117, sla15: 37, sla30: 48 }, motor: { rate: 144, sla15: 37, sla30: 48 }, "e-velo": { rate: 138, sla15: 37, sla30: 48 }, auto: { rate: 154, sla15: 59, sla30: 74 } },
        tolyatti: { name: "Тольятти", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 138, sla15: 48, sla30: 64 } },
        tomsk: { name: "Томск", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 197, sla15: 43, sla30: 59 } },
        tyumen: { name: "Тюмень", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 176, sla15: 48, sla30: 64 } },
        volgograd: { name: "Волгоград", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 176, sla15: 48, sla30: 64 } },
        novokuznetsk: { name: "Новокузнецк", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 154, sla15: 43, sla30: 59 } },
        chelyabinsk: { name: "Челябинск", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 176, sla15: 48, sla30: 64 } },
        voronezh: { name: "Воронеж", pedestrian: { rate: 117, sla15: 43, sla30: 59 }, velo: { rate: 117, sla15: 43, sla30: 59 }, motor: { rate: 144, sla15: 43, sla30: 59 }, "e-velo": { rate: 138, sla15: 43, sla30: 59 }, auto: { rate: 170, sla15: 64, sla30: 80 } },
        barnaul: { name: "Барнаул", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        naberezhnye_chelny: { name: "Набережные Челны", pedestrian: { rate: 106, sla15: 48, sla30: 64 }, velo: { rate: 106, sla15: 48, sla30: 64 }, motor: { rate: 128, sla15: 48, sla30: 64 }, "e-velo": { rate: 128, sla15: 48, sla30: 64 }, auto: { rate: 154, sla15: 64, sla30: 80 } },
        yaroslavl: { name: "Ярославль", pedestrian: { rate: 117, sla15: 32, sla30: 43 }, velo: { rate: 117, sla15: 32, sla30: 43 }, motor: { rate: 138, sla15: 32, sla30: 43 }, "e-velo": { rate: 138, sla15: 32, sla30: 43 }, auto: { rate: 170, sla15: 48, sla30: 64 } },
        kaluga: { name: "Калуга", pedestrian: { rate: 117, sla15: 48, sla30: 64 }, velo: { rate: 117, sla15: 48, sla30: 64 }, motor: { rate: 138, sla15: 48, sla30: 64 }, "e-velo": { rate: 138, sla15: 48, sla30: 64 }, auto: { rate: 181, sla15: 64, sla30: 80 } },
        belgorod: { name: "Белгород", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 128, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 154, sla15: 43, sla30: 59 } },
        lipetsk: { name: "Липецк", pedestrian: { rate: 117, sla15: 27, sla30: 37 }, velo: { rate: 117, sla15: 27, sla30: 37 }, motor: { rate: 138, sla15: 27, sla30: 37 }, "e-velo": { rate: 138, sla15: 27, sla30: 37 }, auto: { rate: 165, sla15: 43, sla30: 59 } },
        magnitogorsk: { name: "Магнитогорск", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 128, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 144, sla15: 32, sla30: 43 } },
        tula: { name: "Тула", pedestrian: { rate: 106, sla15: 53, sla30: 69 }, velo: { rate: 106, sla15: 53, sla30: 69 }, motor: { rate: 128, sla15: 53, sla30: 69 }, "e-velo": { rate: 128, sla15: 53, sla30: 69 }, auto: { rate: 144, sla15: 69, sla30: 85 } },
        saratov_engels: { name: "Саратов Энгельс", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 128, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 154, sla15: 48, sla30: 64 } },
        penza: { name: "Пенза", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 154, sla15: 48, sla30: 64 } },
        kursk: { name: "Курск", pedestrian: { rate: 117, sla15: 32, sla30: 43 }, velo: { rate: 117, sla15: 32, sla30: 43 }, motor: { rate: 138, sla15: 32, sla30: 43 }, "e-velo": { rate: 138, sla15: 32, sla30: 43 }, auto: { rate: 170, sla15: 48, sla30: 64 } },
        izhevsk: { name: "Ижевск", pedestrian: { rate: 117, sla15: 37, sla30: 48 }, velo: { rate: 117, sla15: 37, sla30: 48 }, motor: { rate: 138, sla15: 37, sla30: 48 }, "e-velo": { rate: 138, sla15: 37, sla30: 48 }, auto: { rate: 176, sla15: 53, sla30: 69 } },
        ryazan: { name: "Рязань", pedestrian: { rate: 117, sla15: 43, sla30: 59 }, velo: { rate: 117, sla15: 43, sla30: 59 }, motor: { rate: 138, sla15: 43, sla30: 59 }, "e-velo": { rate: 138, sla15: 43, sla30: 59 }, auto: { rate: 160, sla15: 59, sla30: 74 } },
        tver: { name: "Тверь", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, motor: { rate: 128, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 138, sla15: 59, sla30: 74 } },
        ulyanovsk: { name: "Ульяновск", pedestrian: { rate: 117, sla15: 27, sla30: 37 }, velo: { rate: 117, sla15: 27, sla30: 37 }, motor: { rate: 144, sla15: 27, sla30: 37 }, "e-velo": { rate: 138, sla15: 27, sla30: 37 }, auto: { rate: 160, sla15: 43, sla30: 59 } },
        bryansk: { name: "Брянск", pedestrian: { rate: 117, sla15: 32, sla30: 43 }, velo: { rate: 117, sla15: 32, sla30: 43 }, motor: { rate: 138, sla15: 32, sla30: 43 }, "e-velo": { rate: 138, sla15: 32, sla30: 43 }, auto: { rate: 165, sla15: 48, sla30: 64 } },
        kirov: { name: "Киров", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 133, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 160, sla15: 43, sla30: 59 } },
        cheboksary: { name: "Чебоксары", pedestrian: { rate: 122, sla15: 32, sla30: 43 }, velo: { rate: 122, sla15: 32, sla30: 43 }, motor: { rate: 144, sla15: 32, sla30: 43 }, "e-velo": { rate: 144, sla15: 32, sla30: 43 }, auto: { rate: 176, sla15: 48, sla30: 64 } },
        nizhny_tagil: { name: "Нижний Тагил", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 133, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        sterlitamak: { name: "Стерлитамак", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 128, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 160, sla15: 43, sla30: 59 } },
        novocheboksarsk: { name: "Новочебоксарск", pedestrian: { rate: 122, sla15: 32, sla30: 43 }, velo: { rate: 122, sla15: 32, sla30: 43 }, motor: { rate: 144, sla15: 32, sla30: 43 }, "e-velo": { rate: 144, sla15: 32, sla30: 43 }, auto: { rate: 165, sla15: 48, sla30: 64 } },
        kolomna: { name: "Коломна", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, motor: { rate: 128, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 170, sla15: 59, sla30: 74 } },
        nizhnekamsk: { name: "Нижнекамск", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, motor: { rate: 128, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 138, sla15: 53, sla30: 69 } },
        almetyevsk: { name: "Альметьевск", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 128, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 117, sla15: 43, sla30: 59 } },
        stavropol: { name: "Ставрополь", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 128, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 149, sla15: 43, sla30: 59 } },
        orekhovo_zuevo: { name: "Орехово-Зуево", pedestrian: { rate: 106, sla15: 43, sla30: 59 }, velo: { rate: 106, sla15: 43, sla30: 59 }, motor: { rate: 128, sla15: 43, sla30: 59 }, "e-velo": { rate: 128, sla15: 43, sla30: 59 }, auto: { rate: 149, sla15: 59, sla30: 74 } },
        noginsk: { name: "Ногинск", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, motor: { rate: 133, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 261, sla15: 53, sla30: 69 } },
        veliky_novgorod: { name: "Великий Новгород", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 149, sla15: 53, sla30: 69 } },
        vladimir: { name: "Владимир", pedestrian: { rate: 117, sla15: 43, sla30: 59 }, velo: { rate: 117, sla15: 43, sla30: 59 }, "e-velo": { rate: 138, sla15: 43, sla30: 59 }, auto: { rate: 170, sla15: 59, sla30: 74 } },
        omsk: { name: "Омск", pedestrian: { rate: 117, sla15: 32, sla30: 43 }, velo: { rate: 117, sla15: 32, sla30: 43 }, "e-velo": { rate: 138, sla15: 32, sla30: 43 }, auto: { rate: 160, sla15: 48, sla30: 64 } },
        orenburg: { name: "Оренбург", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        taganrog: { name: "Таганрог", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 138, sla15: 53, sla30: 69 } },
        sochi: { name: "Сочи", pedestrian: { rate: 128, sla15: 48, sla30: 64 }, velo: { rate: 128, sla15: 48, sla30: 64 }, motor: { rate: 176, sla15: 48, sla30: 64 }, "e-velo": { rate: 160, sla15: 48, sla30: 64 }, auto: { rate: 181, sla15: 53, sla30: 69 } },
        tambov: { name: "Тамбов", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        orel: { name: "Орел", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 133, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 149, sla15: 43, sla30: 59 } },
        vologda: { name: "Вологда", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 149, sla15: 43, sla30: 59 } },
        saransk: { name: "Саранск", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        ivanovo: { name: "Иваново", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 122, sla15: 53, sla30: 69 } },
        astrakhan: { name: "Астрахань", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, motor: { rate: 133, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 149, sla15: 43, sla30: 59 } },
        surgut: { name: "Сургут", pedestrian: { rate: 106, sla15: 48, sla30: 64 }, velo: { rate: 106, sla15: 48, sla30: 64 }, "e-velo": { rate: 128, sla15: 48, sla30: 64 }, auto: { rate: 239, sla15: 64, sla30: 80 } },
        novorossiysk: { name: "Новороссийск", pedestrian: { rate: 112, sla15: 37, sla30: 48 }, velo: { rate: 112, sla15: 37, sla30: 48 }, motor: { rate: 138, sla15: 37, sla30: 48 }, "e-velo": { rate: 133, sla15: 37, sla30: 48 }, auto: { rate: 149, sla15: 37, sla30: 48 } },
        stary_oskol: { name: "Старый Оскол", pedestrian: { rate: 117, sla15: 32, sla30: 43 }, velo: { rate: 117, sla15: 32, sla30: 43 }, "e-velo": { rate: 138, sla15: 32, sla30: 43 }, auto: { rate: 154, sla15: 48, sla30: 64 } },
        smolensk: { name: "Смоленск", pedestrian: { rate: 106, sla15: 37, sla30: 48 }, velo: { rate: 106, sla15: 37, sla30: 48 }, "e-velo": { rate: 128, sla15: 37, sla30: 48 }, auto: { rate: 144, sla15: 53, sla30: 69 } },
        krasnoyarsk: { name: "Красноярск", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, motor: { rate: 133, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 176, sla15: 48, sla30: 64 } },
        cherepovets: { name: "Череповец", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 149, sla15: 48, sla30: 64 } },
        kostroma: { name: "Кострома", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 144, sla15: 43, sla30: 59 } },
        anapa: { name: "Анапа", pedestrian: { rate: 112, sla15: 37, sla30: 48 }, velo: { rate: 112, sla15: 37, sla30: 48 }, "e-velo": { rate: 133, sla15: 37, sla30: 48 }, auto: { rate: 144, sla15: 48, sla30: 64 } },
        gelendzhik: { name: "Геленджик", pedestrian: { rate: 117, sla15: 48, sla30: 64 }, velo: { rate: 117, sla15: 48, sla30: 64 }, "e-velo": { rate: 138, sla15: 48, sla30: 64 }, auto: { rate: 149, sla15: 59, sla30: 74 } },
        kurgan: { name: "Курган", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 149, sla15: 43, sla30: 59 } },
        balakovo: { name: "Балаково", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 165, sla15: 43, sla30: 59 } },
        yoshkar_ola: { name: "Йошкар-Ола", pedestrian: { rate: 122, sla15: 32, sla30: 43 }, velo: { rate: 122, sla15: 32, sla30: 43 }, "e-velo": { rate: 144, sla15: 32, sla30: 43 }, auto: { rate: 165, sla15: 48, sla30: 64 } },
        pskov: { name: "Псков", pedestrian: { rate: 112, sla15: 27, sla30: 37 }, velo: { rate: 112, sla15: 27, sla30: 37 }, "e-velo": { rate: 133, sla15: 27, sla30: 37 }, auto: { rate: 154, sla15: 43, sla30: 59 } },
        neftekamsk: { name: "Нефтекамск", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        petrozavodsk: { name: "Петрозаводск", pedestrian: { rate: 106, sla15: 32, sla30: 43 }, velo: { rate: 106, sla15: 32, sla30: 43 }, "e-velo": { rate: 128, sla15: 32, sla30: 43 }, auto: { rate: 149, sla15: 48, sla30: 64 } },
        salavat: { name: "Салават", pedestrian: { rate: 106, sla15: 27, sla30: 37 }, velo: { rate: 106, sla15: 27, sla30: 37 }, "e-velo": { rate: 128, sla15: 27, sla30: 37 }, auto: { rate: 138, sla15: 43, sla30: 59 } },
        obninsk: { name: "Обнинск", pedestrian: { rate: 138, sla15: 43, sla30: 59 }, velo: { rate: 138, sla15: 43, sla30: 59 }, "e-velo": { rate: 160, sla15: 43, sla30: 59 }, auto: { rate: 170, sla15: 59, sla30: 74 } },
        nefteyugansk: { name: "Нефтеюганск", pedestrian: { rate: 106, sla15: 48, sla30: 64 }, velo: { rate: 106, sla15: 48, sla30: 64 }, "e-velo": { rate: 128, sla15: 48, sla30: 64 }, auto: { rate: 213, sla15: 59, sla30: 74 } },
        nizhnevartovsk: { name: "Нижневартовск", pedestrian: { rate: 106, sla15: 48, sla30: 64 }, velo: { rate: 106, sla15: 48, sla30: 64 }, "e-velo": { rate: 128, sla15: 48, sla30: 64 }, auto: { rate: 261, sla15: 59, sla30: 74 } },
        khanty_mansiysk: { name: "Ханты-Мансийск", pedestrian: { rate: 117, sla15: 53, sla30: 69 }, velo: { rate: 117, sla15: 53, sla30: 69 }, "e-velo": { rate: 138, sla15: 53, sla30: 69 }, auto: { rate: 271, sla15: 64, sla30: 80 } }
    };

    // ============ DOM ЭЛЕМЕНТЫ ============
    const themeToggle = document.getElementById('themeToggle');
    const tabExact = document.getElementById('tabExact');
    const tabApprox = document.getElementById('tabApprox');
    const exactFields = document.getElementById('exactFields');
    const approxFields = document.getElementById('approxFields');
    const calcForm = document.getElementById('calcForm');
    const counterContainer = document.getElementById('counterContainer');
    const clearBtn = document.getElementById('clearBtn');
    
    const langDropdown = document.getElementById('langDropdown');
    const cityDropdown = document.getElementById('cityDropdown');
    const transportDropdown = document.getElementById('transportDropdown');
    const cityMenuOptions = document.getElementById('cityMenuOptions');
    const transportMenuOptions = document.getElementById('transportMenuOptions');
    const transportTriggerText = document.getElementById('transportTriggerText');

    const geoGroup = document.getElementById('geoGroup');
    const customRateGroup = document.getElementById('customRateGroup');
    const customRateInput = document.getElementById('customRate');
    const customPriceS15 = document.getElementById('customPriceS15');
    const customPriceS30 = document.getElementById('customPriceS30');
    const customOrderField = document.getElementById('customOrderField');
    const customOrderPrice = document.getElementById('customOrderPrice');
    const customStopsFields = document.getElementById('customStopsFields');

    const typePartner = document.getElementById('typePartner');
    const typeSber = document.getElementById('typeSber');
    const typeOther = document.getElementById('typeOther');

    // ============ ЯЗЫКИ ============
    const languages = {
        ru: {
            title: "Расчет стоимости",
            tabExact: "Точный (стопы)",
            tabApprox: "Примерный (заказы)",
            hours: "Количество часов",
            stops15: "Стопы 15 мин",
            stops30: "Стопы 30 мин",
            orders: "Количество заказов",
            extrapay: "Доплата за каждый стоп/заказ",
            reset: "Сбросить значения",
            result: "Итоговая стоимость:",
            city: "Город",
            transport: "Тип доставки",
            customRate: "Ставка за час (₽/ч)",
            customS15: "Цена за стоп 15 мин (₽)",
            customS30: "Цена за стоп 30 мин (₽)",
            customOrder: "Цена за заказ (₽)",
            velo: "Вело",
            "e-velo": "Электровело",
            auto: "Авто",
            pedestrian: "Пеший",
            motor: "Мотор"
        },
        en: {
            title: "Cost Calculation",
            tabExact: "Exact (stops)",
            tabApprox: "Approx (orders)",
            hours: "Number of hours",
            stops15: "Stops 15 min",
            stops30: "Stops 30 min",
            orders: "Number of orders",
            extrapay: "Extra pay per stop/order",
            reset: "Reset values",
            result: "Total cost:",
            city: "City",
            transport: "Delivery Type",
            customRate: "Hourly rate (₽/h)",
            customS15: "Price for 15m stop (₽)",
            customS30: "Price for 30m stop (₽)",
            customOrder: "Price per order (₽)",
            velo: "Velo",
            "e-velo": "E-Velo",
            auto: "Auto",
            pedestrian: "Pedestrian",
            motor: "Motor"
        },
        fr: {
            title: "Calcul du Coût",
            tabExact: "Exact (arrêts)",
            tabApprox: "Approximatif (commandes)",
            hours: "Nombre d'heures",
            stops15: "Arrêts 15 min",
            stops30: "Arrêts 30 min",
            orders: "Nombre de commandes",
            extrapay: "Supplément par arrêt/commande",
            reset: "Réinitialiser",
            result: "Coût total:",
            city: "Ville",
            transport: "Type de livraison",
            customRate: "Taux horaire (₽/h)",
            customS15: "Prix arrêt 15m (₽)",
            customS30: "Prix arrêt 30m (₽)",
            customOrder: "Prix par commande (₽)",
            velo: "Vélo",
            "e-velo": "E-Vélo",
            auto: "Auto",
            pedestrian: "À pied",
            motor: "Moto"
        },
        tr: {
            title: "Maliyet Hesaplama",
            tabExact: "Kesin (duraklar)",
            tabApprox: "Yaklaşık (siparişler)",
            hours: "Saat sayısı",
            stops15: "15 dk durak",
            stops30: "30 dk durak",
            orders: "Sipariş sayısı",
            extrapay: "Durak/sipariş başına ek ücret",
            reset: "Değerleri sıfırla",
            result: "Toplam maliyet:",
            city: "Şehir",
            transport: "Teslimat Türü",
            customRate: "Saatlik ücret (₽/sa)",
            customS15: "15dk durak fiyatı (₽)",
            customS30: "30dk durak fiyatı (₽)",
            customOrder: "Sipariş başına fiyat (₽)",
            velo: "Bisiklet",
            "e-velo": "E-Bisiklet",
            auto: "Araba",
            pedestrian: "Yaya",
            motor: "Motosiklet"
        },
        tg: {
            title: "Ҳисоби арзиш",
            tabExact: "Дақиқ (истҳо)",
            tabApprox: "Тахминӣ (фармоишҳо)",
            hours: "Миқдори соатҳо",
            stops15: "Истҳои 15 дақ",
            stops30: "Истҳои 30 дақ",
            orders: "Миқдори фармоишҳо",
            extrapay: "Иловапулӣ барои ҳар як ист/фармоиш",
            reset: "Озод кардани нишондодҳо",
            result: "Арзиши умумӣ:",
            city: "Шаҳр",
            transport: "Навъи интиқол",
            customRate: "Меъёри соатбайъ (₽/соат)",
            customS15: "Нархи ист 15 дақ (₽)",
            customS30: "Нархи ист 30 дақ (₽)",
            customOrder: "Нархи фармоиш (₽)",
            velo: "Вело",
            "e-velo": "Э-Вело",
            auto: "Авто",
            pedestrian: "Пиёда",
            motor: "Мотор"
        },
        kk: {
            title: "Құнын есептеу",
            tabExact: "Дәл (аялдамалар)",
            tabApprox: "Шамамен (тапсырыстар)",
            hours: "Сағат саны",
            stops15: "15 мин аялдама",
            stops30: "30 мин аялдама",
            orders: "Тапсырыс саны",
            extrapay: "Әр аялдама/тапсырыс үшін қосымша төлем",
            reset: "Мәндерді тастау",
            result: "Жалпы құны:",
            city: "Қала",
            transport: "Жеткізу түрі",
            customRate: "Сағаттық мөлшерлеме (₽/сағ)",
            customS15: "15м аялдама бағасы (₽)",
            customS30: "30м аялдама бағасы (₽)",
            customOrder: "Тапсырыс бағасы (₽)",
            velo: "Вело",
            "e-velo": "Э-Вело",
            auto: "Авто",
            pedestrian: "Жаяу",
            motor: "Мотор"
        },
        be: {
            title: "Рахунак кошт",
            tabExact: "Дакладны (прыпынкі)",
            tabApprox: "Прыблізны (заказы)",
            hours: "Колькасць гадзін",
            stops15: "Прыпынкі 15 хв",
            stops30: "Прыпынкі 30 хв",
            orders: "Колькасць заказаў",
            extrapay: "Даплата за кожны прыпынак/заказ",
            reset: "Скінуць значэнні",
            result: "Выніковы кошт:",
            city: "Горад",
            transport: "Тып дастаўкі",
            customRate: "Стаўка за гадзіну (₽/г)",
            customS15: "Кошт прыпынку 15хв (₽)",
            customS30: "Кошт прыпынку 30хв (₽)",
            customOrder: "Кошт заказа (₽)",
            velo: "Вела",
            "e-velo": "Э-Вела",
            auto: "Аўта",
            pedestrian: "Пешы",
            motor: "Мотор"
        },
        ky: {
            title: "Баасын эсептөө",
            tabExact: "Так (аялдамалар)",
            tabApprox: "Болжолдуу (буюртмалар)",
            hours: "Сааттардын саны",
            stops15: "15 мүн аялдама",
            stops30: "30 мүн аялдама",
            orders: "Буюртмалардын саны",
            extrapay: "Ар бир аялдама/буюртма үчүн кошумча төлөм",
            reset: "Маанилерди баштапкы абалга келтирүү",
            result: "Жалпы баасы:",
            city: "Шаар",
            transport: "Жеткирүү түрү",
            customRate: "Сааттык чен (₽/саат)",
            customS15: "15м аялдама баасы (₽)",
            customS30: "30м аялдама баасы (₽)",
            customOrder: "Буюртма баасы (₽)",
            velo: "Вело",
            "e-velo": "Э-Вело",
            auto: "Авто",
            pedestrian: "Жөө",
            motor: "Мотор"
        },
        uz: {
            title: "Нархни ҳисоблаш",
            tabExact: "Аниқ (бекатлар)",
            tabApprox: "Тахминий (буюртмалар)",
            hours: "Соатлар сони",
            stops15: "15 дақ бекат",
            stops30: "30 дақ бекат",
            orders: "Буюртмалар сони",
            extrapay: "Ҳар бир бекат/буюртма учун қўшимча тўлов",
            reset: "Қийматларни ташлаб юбориш",
            result: "Якуний нарх:",
            city: "Шаҳар",
            transport: "Етказиб бериш тури",
            customRate: "Соатбай ставка (₽/соат)",
            customS15: "15д бекат нархи (₽)",
            customS30: "30д бекат нархи (₽)",
            customOrder: "Буюртма нархи (₽)",
            velo: "Velo",
            "e-velo": "E-Velo",
            auto: "Avto",
            pedestrian: "Piyoda",
            motor: "Motor"
        },
        hy: {
            title: "Արժեքի հաշվարկ",
            tabExact: "Ճշգրիտ (կանգառներ)",
            tabApprox: "Մոտավոր (պատվերներ)",
            hours: "Ժամերի քանակ",
            stops15: "Կանգառ 15 րոպե",
            stops30: "Կանգառ 30 րոպե",
            orders: "Պատվերների քանակ",
            extrapay: "Հավելավճար յուրաքանչյուր կանգառի/պատվերի համար",
            reset: "Չեղարկել արժեքները",
            result: "Ընդհանուր արժեքը:",
            city: "Քաղաք",
            transport: "Առաքման տեսակ",
            customRate: "Ժամավճար (₽/ժ)",
            customS15: "15ր կանգառի գինը (₽)",
            customS30: "30ր կանգառի գինը (₽)",
            customOrder: "Պատվերի գինը (₽)",
            velo: "Հեծանիվ",
            "e-velo": "Էլ-հեծանիվ",
            auto: "Ավտո",
            pedestrian: "Ոտքով",
            motor: "Մոտոր"
        }
    };

    const flags = {
        ru: "🇷🇺",
        en: "🇬🇧",
        fr: "🇫🇷",
        tr: "🇹🇷",
        tg: "🇹🇯",
        kk: "🇰🇿",
        be: "🇧🇾",
        ky: "🇰🇬",
        uz: "🇺🇿",
        hy: "🇦🇲"
    };
    // ============ ФУНКЦИИ КАЛЬКУЛЯТОРА ============
    
    function getAvailableTransports(company, cityKey) {
        const tariffData = company === 'partner' ? samokatTariffs : sberTariffs;
        const cityData = tariffData[cityKey];
        if (!cityData) return [];
        
        const allTypes = company === 'partner' 
            ? ['velo', 'e-velo', 'auto', 'pedestrian']
            : ['pedestrian', 'velo', 'motor', 'e-velo', 'auto'];
        
        return allTypes.filter(type => cityData[type] !== undefined);
    }

    function populateCities() {
        cityMenuOptions.innerHTML = '';
        const tariffData = currentCompany === 'partner' ? samokatTariffs : sberTariffs;
        for (const [key, city] of Object.entries(tariffData)) {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.setAttribute('data-value', key);
            item.textContent = city.name;
            item.addEventListener('click', () => {
                selectedCityKey = key;
                cityDropdown.querySelector('.dropdown-trigger span').textContent = city.name;
                localStorage.setItem('calc-city', key);
                updateTransportOptions();
                updateLabelRatesText();
                calculate();
            });
            cityMenuOptions.appendChild(item);
        }
    }

    function updateTransportOptions() {
        transportMenuOptions.innerHTML = '';
        const available = getAvailableTransports(currentCompany, selectedCityKey);
        const l = languages[currentLang];
        
        if (available.length === 0) {
            transportTriggerText.textContent = '—';
            return;
        }

        if (!available.includes(selectedTransportKey)) {
            selectedTransportKey = available[0];
        }

        available.forEach(type => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.setAttribute('data-value', type);
            item.textContent = l[type] || type;
            if (type === selectedTransportKey) {
                item.classList.add('active');
            }
            item.addEventListener('click', () => {
                selectedTransportKey = type;
                transportTriggerText.textContent = l[type] || type;
                localStorage.setItem('calc-transport', type);
                updateTransportOptions();
                updateLabelRatesText();
                calculate();
            });
            transportMenuOptions.appendChild(item);
        });

        transportTriggerText.textContent = l[selectedTransportKey] || selectedTransportKey;
    }

    function setupDropdowns() {
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.custom-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            });
        });
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
        });
    }

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
        document.getElementById('lang-extrapay-lbl').textContent = l.extrapay + (currentCompany === 'sber' ? ' (+11 ₽)' : ' (+10 ₽)');
        clearBtn.textContent = l.reset;
        document.getElementById('lang-result-lbl').textContent = l.result;
        document.getElementById('lang-city-lbl').textContent = l.city;
        document.getElementById('lang-transport-lbl').textContent = l.transport;
        document.getElementById('lang-custom-rate-lbl').textContent = l.customRate;
        document.getElementById('lang-custom-s15-lbl').textContent = l.customS15;
        document.getElementById('lang-custom-s30-lbl').textContent = l.customS30;
        document.getElementById('lang-custom-order-lbl').textContent = l.customOrder;
        
        updateTransportOptions();
        updateLabelRatesText();
    }

    function updateLabelRatesText() {
        const l = languages[currentLang];
        let rate, s15, s30;
        
        if (currentCompany === 'other') {
            rate = parseFloat(customRateInput.value) || 0;
            s15 = parseFloat(customPriceS15.value) || 0;
            s30 = parseFloat(customPriceS30.value) || 0;
            document.getElementById('lang-hours-lbl').textContent = l.hours + ' (' + rate + ' ₽/ч)';
            document.getElementById('lang-stops15-lbl').textContent = l.stops15 + ' (' + s15 + ' ₽/шт)';
            document.getElementById('lang-stops30-lbl').textContent = l.stops30 + ' (' + s30 + ' ₽/шт)';
            if (currentMode === 'approx') {
                const orderPrice = parseFloat(customOrderPrice.value) || 0;
                document.getElementById('lang-orders-lbl').textContent = l.orders + ' (' + orderPrice + ' ₽/шт)';
            }
            return;
        }

        const tariffData = currentCompany === 'partner' ? samokatTariffs : sberTariffs;
        const cityData = tariffData[selectedCityKey];
        if (cityData && cityData[selectedTransportKey]) {
            const data = cityData[selectedTransportKey];
            rate = data.rate;
            s15 = data.sla15;
            s30 = data.sla30;
            document.getElementById('lang-hours-lbl').textContent = l.hours + ' (' + rate + ' ₽/ч)';
            document.getElementById('lang-stops15-lbl').textContent = l.stops15 + ' (' + s15 + ' ₽/шт)';
            document.getElementById('lang-stops30-lbl').textContent = l.stops30 + ' (' + s30 + ' ₽/шт)';
            if (currentMode === 'approx') {
                document.getElementById('lang-orders-lbl').textContent = l.orders + ' (' + s15 + ' ₽/шт)';
            }
        }
    }

    function setCompanyMode(company) {
        currentCompany = company;
        typePartner.classList.remove('active');
        typeSber.classList.remove('active');
        typeOther.classList.remove('active');
        
        if (company === 'partner') {
            typePartner.classList.add('active');
            geoGroup.classList.remove('hidden');
            customRateGroup.classList.add('hidden');
            extraPayAmount = 10;
        } else if (company === 'sber') {
            typeSber.classList.add('active');
            geoGroup.classList.remove('hidden');
            customRateGroup.classList.add('hidden');
            extraPayAmount = 11;
        } else {
            typeOther.classList.add('active');
            geoGroup.classList.add('hidden');
            customRateGroup.classList.remove('hidden');
            extraPayAmount = 10;
        }

        populateCities();
        
        const tariffData = company === 'partner' ? samokatTariffs : sberTariffs;
        const firstCity = Object.keys(tariffData)[0];
        if (firstCity) {
            selectedCityKey = firstCity;
            cityDropdown.querySelector('.dropdown-trigger span').textContent = tariffData[firstCity].name;
        }

        updateTransportOptions();
        localStorage.setItem('calc-company', company);
        document.getElementById('lang-extrapay-lbl').textContent = languages[currentLang].extrapay + (company === 'sber' ? ' (+11 ₽)' : ' (+10 ₽)');
        updateLabelRatesText();
        calculate();
    }

    function setCalculationMode(mode) {
        currentMode = mode;
        if (mode === 'exact') {
            tabExact.classList.add('active');
            tabApprox.classList.remove('active');
            approxFields.classList.add('hidden');
            exactFields.classList.remove('hidden');
            if (currentCompany === 'other') {
                customStopsFields.classList.remove('hidden');
                customOrderField.classList.add('hidden');
            }
        } else {
            tabApprox.classList.add('active');
            tabExact.classList.remove('active');
            exactFields.classList.add('hidden');
            approxFields.classList.remove('hidden');
            if (currentCompany === 'other') {
                customStopsFields.classList.add('hidden');
                customOrderField.classList.remove('hidden');
            }
        }
        localStorage.setItem('calc-mode', mode);
        updateLabelRatesText();
        calculate();
    }

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
                strips[index].style.transform = 'translateY(-' + moveY + 'px)';
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
        let hourRate = 0;
        let priceS15 = 0;
        let priceS30 = 0;
        let orderPrice = 50;

        if (currentCompany === 'partner') {
            const cityData = samokatTariffs[selectedCityKey];
            if (cityData && cityData[selectedTransportKey]) {
                const data = cityData[selectedTransportKey];
                hourRate = data.rate;
                priceS15 = data.sla15;
                priceS30 = data.sla30;
                orderPrice = data.sla15;
            }
        } else if (currentCompany === 'sber') {
            const cityData = sberTariffs[selectedCityKey];
            if (cityData && cityData[selectedTransportKey]) {
                const data = cityData[selectedTransportKey];
                hourRate = data.rate;
                priceS15 = data.sla15;
                priceS30 = data.sla30;
                orderPrice = data.sla15;
            }
        } else if (currentCompany === 'other') {
            hourRate = parseFloat(customRateInput.value) || 0;
            priceS15 = parseFloat(customPriceS15.value) || 0;
            priceS30 = parseFloat(customPriceS30.value) || 0;
            orderPrice = parseFloat(customOrderPrice.value) || 0;
        }

        let total = hours * hourRate;

        if (currentMode === 'exact') {
            const stops15 = parseInt(stops15Raw) || 0;
            const stops30 = parseInt(stops30Raw) || 0;
            total += (stops15 * priceS15) + (stops30 * priceS30);
            if (hasExtraPay) total += (stops15 + stops30) * extraPayAmount;
        } else {
            const orders = parseInt(ordersRaw) || 0;
            total += orders * orderPrice;
            if (hasExtraPay) total += orders * extraPayAmount;
        }

        updateOdometer(total);
    }
    // ============================================================
    // ============ КАЛЕНДАРЬ ============
    // ============================================================

    let calendarState = {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        selectedDate: null,
        records: {}
    };

    function loadCalendarRecords() {
        const saved = localStorage.getItem('calendarRecords');
        if (saved) {
            try {
                calendarState.records = JSON.parse(saved);
            } catch (e) {
                calendarState.records = {};
            }
        } else {
            calendarState.records = {};
        }
    }

    function saveCalendarRecords() {
        localStorage.setItem('calendarRecords', JSON.stringify(calendarState.records));
    }

    function getDayRecord(dateStr) {
        return calendarState.records[dateStr] || null;
    }

    function getOrCreateDayRecord(dateStr) {
        if (!calendarState.records[dateStr]) {
            calendarState.records[dateStr] = {
                shifts: [],
                totalAmount: 0,
                totalHours: 0,
                avgPerHour: 0
            };
        }
        return calendarState.records[dateStr];
    }

    function calculateShiftAmount(shift, cityKey, transportKey, company) {
        let rate = 0, priceS15 = 0, priceS30 = 0;
        
        if (company === 'partner') {
            const cityData = samokatTariffs[cityKey];
            if (cityData && cityData[transportKey]) {
                const data = cityData[transportKey];
                rate = data.rate;
                priceS15 = data.sla15;
                priceS30 = data.sla30;
            }
        } else if (company === 'sber') {
            const cityData = sberTariffs[cityKey];
            if (cityData && cityData[transportKey]) {
                const data = cityData[transportKey];
                rate = data.rate;
                priceS15 = data.sla15;
                priceS30 = data.sla30;
            }
        } else {
            rate = parseFloat(document.getElementById('customRate').value) || 0;
            priceS15 = parseFloat(document.getElementById('customPriceS15').value) || 0;
            priceS30 = parseFloat(document.getElementById('customPriceS30').value) || 0;
        }
        
        const start = shift.startTime.split(':').map(Number);
        const end = shift.endTime.split(':').map(Number);
        let hours = end[0] - start[0] + (end[1] - start[1]) / 60;
        if (hours < 0) hours += 24;
        
        let total = hours * rate;
        total += (shift.stops15 || 0) * priceS15;
        total += (shift.stops30 || 0) * priceS30;
        if (shift.extraPay) {
            const extraAmount = company === 'sber' ? 11 : 10;
            total += ((shift.stops15 || 0) + (shift.stops30 || 0)) * extraAmount;
        }
        
        return {
            amount: Math.round(total),
            hours: hours
        };
    }

    function updateDayTotals(dateStr) {
        const dayRecord = getDayRecord(dateStr);
        if (!dayRecord || dayRecord.shifts.length === 0) {
            delete calendarState.records[dateStr];
            saveCalendarRecords();
            return;
        }
        
        let totalAmount = 0;
        let totalHours = 0;
        
        dayRecord.shifts.forEach(shift => {
            totalAmount += shift.amount || 0;
            totalHours += shift.hours || 0;
        });
        
        dayRecord.totalAmount = totalAmount;
        dayRecord.totalHours = totalHours;
        dayRecord.avgPerHour = totalHours > 0 ? Math.round(totalAmount / totalHours) : 0;
        
        saveCalendarRecords();
    }

    function addShiftToDay(dateStr, shiftData) {
        const dayRecord = getOrCreateDayRecord(dateStr);
        const shift = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            startTime: shiftData.startTime,
            endTime: shiftData.endTime,
            city: shiftData.city,
            transport: shiftData.transport,
            stops15: parseInt(shiftData.stops15) || 0,
            stops30: parseInt(shiftData.stops30) || 0,
            extraPay: shiftData.extraPay || false,
            comment: shiftData.comment || '',
            company: shiftData.company || calendarCompany,
            amount: 0,
            hours: 0
        };
        
        const result = calculateShiftAmount(shift, shiftData.city, shiftData.transport, shift.company);
        shift.amount = result.amount;
        shift.hours = result.hours;
        
        dayRecord.shifts.push(shift);
        updateDayTotals(dateStr);
        saveCalendarRecords();
        return shift;
    }

    function deleteShiftFromDay(dateStr, shiftId) {
        const dayRecord = getDayRecord(dateStr);
        if (!dayRecord) return false;
        
        dayRecord.shifts = dayRecord.shifts.filter(s => s.id !== shiftId);
        updateDayTotals(dateStr);
        saveCalendarRecords();
        return true;
    }

    function updateShift(dateStr, shiftId, newData) {
        const dayRecord = getDayRecord(dateStr);
        if (!dayRecord) return false;
        
        const shiftIndex = dayRecord.shifts.findIndex(s => s.id === shiftId);
        if (shiftIndex === -1) return false;
        
        const shift = dayRecord.shifts[shiftIndex];
        Object.assign(shift, newData);
        
        const result = calculateShiftAmount(shift, shift.city, shift.transport, shift.company);
        shift.amount = result.amount;
        shift.hours = result.hours;
        
        updateDayTotals(dateStr);
        saveCalendarRecords();
        return true;
    }

    function deleteDay(dateStr) {
        if (calendarState.records[dateStr]) {
            delete calendarState.records[dateStr];
            saveCalendarRecords();
            return true;
        }
        return false;
    }

    function formatDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function formatDateDisplay(dateStr) {
        const parts = dateStr.split('-');
        const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 
                            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const day = parseInt(parts[2]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[0]);
        const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dateObj = new Date(year, month, day);
        return day + ' ' + monthNames[month] + ' ' + year + ', ' + weekdays[dateObj.getDay()];
    }

    function formatTime(timeStr) {
        return timeStr.substring(0, 5);
    }

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthYear = document.getElementById('currentMonthYear');
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        monthYear.textContent = monthNames[calendarState.currentMonth] + ' ' + calendarState.currentYear;
        
        const weekdays = grid.querySelectorAll('.weekday');
        grid.innerHTML = '';
        weekdays.forEach(wd => grid.appendChild(wd));
        
        const firstDay = new Date(calendarState.currentYear, calendarState.currentMonth, 1);
        const lastDay = new Date(calendarState.currentYear, calendarState.currentMonth + 1, 0);
        const today = new Date();
        const todayStr = formatDate(today);
        
        let offset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        
        for (let i = 0; i < offset; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }
        
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = d;
            
            const dateObj = new Date(calendarState.currentYear, calendarState.currentMonth, d);
            const dateStr = formatDate(dateObj);
            
            const dayRecord = getDayRecord(dateStr);
            if (dayRecord && dayRecord.shifts.length > 0) {
                day.classList.add('has-record');
            }
            
            if (dateStr === todayStr) {
                day.classList.add('today');
            }
            
            if (dateStr === calendarState.selectedDate) {
                day.classList.add('selected');
            }
            
            day.addEventListener('click', () => {
                selectDay(dateStr);
            });
            
            grid.appendChild(day);
        }
        
        updateStats();
    }

    function updateStats() {
        const month = calendarState.currentMonth;
        const year = calendarState.currentYear;
        let totalIncome = 0;
        let totalDays = 0;
        let bestDay = 0;
        
        for (const [dateStr, record] of Object.entries(calendarState.records)) {
            const parts = dateStr.split('-');
            const recordYear = parseInt(parts[0]);
            const recordMonth = parseInt(parts[1]) - 1;
            
            if (recordYear === year && recordMonth === month) {
                totalIncome += record.totalAmount || 0;
                totalDays++;
                if (record.totalAmount > bestDay) {
                    bestDay = record.totalAmount;
                }
            }
        }
        
        const avgIncome = totalDays > 0 ? Math.round(totalIncome / totalDays) : 0;
        
        document.getElementById('totalIncome').textContent = totalIncome.toLocaleString() + ' ₽';
        document.getElementById('totalDays').textContent = totalDays;
        document.getElementById('avgIncome').textContent = avgIncome.toLocaleString() + ' ₽';
        document.getElementById('bestDay').textContent = bestDay.toLocaleString() + ' ₽';
    }

    function selectDay(dateStr) {
        calendarState.selectedDate = dateStr;
        renderCalendar();
        openDayPanel(dateStr);
    }

    function openDayPanel(dateStr) {
        const panel = document.getElementById('dayPanel');
        const overlay = document.getElementById('panelOverlay');
        const wrapper = document.querySelector('.calendar-wrapper');
        const body = document.getElementById('panelBody');
        
        document.getElementById('panelDate').textContent = formatDateDisplay(dateStr);
        
        const dayRecord = getDayRecord(dateStr);
        const hasRecord = dayRecord && dayRecord.shifts.length > 0;
        
        let html = '';
        
        if (hasRecord) {
            html += `
                <div class="day-stats">
                    <div class="stat-row">
                        <span class="label">💰 Доход</span>
                        <span class="value">${dayRecord.totalAmount.toLocaleString()} ₽</span>
                    </div>
                    <div class="stat-row">
                        <span class="label">🕐 Часов</span>
                        <span class="value">${dayRecord.totalHours.toFixed(1)} ч</span>
                    </div>
                    <div class="stat-row">
                        <span class="label">📊 Средний в час</span>
                        <span class="value">${dayRecord.avgPerHour.toLocaleString()} ₽/ч</span>
                    </div>
                    <div class="stat-row">
                        <span class="label">📋 Смен</span>
                        <span class="value">${dayRecord.shifts.length}</span>
                    </div>
                </div>
            `;
            
            html += `<div class="shift-list">`;
            dayRecord.shifts.forEach((shift, index) => {
                html += `
                    <div class="shift-item">
                        <div class="shift-info">
                            <span class="shift-time">🔄 Смена #${index + 1} (${formatTime(shift.startTime)} - ${formatTime(shift.endTime)})</span>
                            <span class="shift-details">
                                ${shift.city} · ${shift.transport} · 
                                ${shift.stops15 || 0}×15мин · ${shift.stops30 || 0}×30мин
                                ${shift.extraPay ? ' · ☁️ доплата' : ''}
                                ${shift.comment ? ' · ' + shift.comment : ''}
                                ${shift.company ? ' · 🏢 ' + shift.company : ''}
                            </span>
                        </div>
                        <div class="shift-amount">${shift.amount.toLocaleString()} ₽</div>
                    </div>
                    <div style="display:flex;gap:6px;margin-top:-6px;margin-bottom:6px;padding-left:14px;">
                        <button class="btn-edit-shift" onclick="openEditShift('${dateStr}', '${shift.id}')">✏️</button>
                        <button class="btn-delete-shift" onclick="deleteShift('${dateStr}', '${shift.id}')">🗑</button>
                    </div>
                `;
            });
            html += `</div>`;
            
            html += `
                <div class="panel-actions">
                    <button class="btn-add-shift" onclick="openAddShift('${dateStr}')">➕ Добавить смену</button>
                    <button class="btn-delete-day" onclick="deleteFullDay('${dateStr}')">🗑 Удалить все</button>
                </div>
            `;
        } else {
            html += `
                <div style="text-align:center;padding:40px 0;color:var(--text-secondary);">
                    <div style="font-size:48px;margin-bottom:12px;">📭</div>
                    <p style="font-size:16px;">Нет записей за этот день</p>
                </div>
                <div class="panel-actions">
                    <button class="btn-add-shift" onclick="openAddShift('${dateStr}')">➕ Добавить смену</button>
                </div>
            `;
        }
        
        body.innerHTML = html;
        
        panel.classList.add('open');
        overlay.classList.add('active');
        wrapper.classList.add('shifted');
    }

    function closeDayPanel() {
        document.getElementById('dayPanel').classList.remove('open');
        document.getElementById('panelOverlay').classList.remove('active');
        document.querySelector('.calendar-wrapper').classList.remove('shifted');
        calendarState.selectedDate = null;
    }

    function openAddShift(dateStr) {
        openShiftModal(dateStr, null);
    }

    function openEditShift(dateStr, shiftId) {
        openShiftModal(dateStr, shiftId);
    }

    function openShiftModal(dateStr, shiftId) {
        const modal = document.getElementById('editModal');
        const body = document.getElementById('modalBody');
        const title = document.getElementById('modalTitle');
        
        const isEdit = shiftId !== null;
        title.textContent = isEdit ? '✏️ Редактирование смены' : '➕ Новая смена';
        
        let shift = null;
        let dayRecord = getDayRecord(dateStr);
        
        if (isEdit && dayRecord) {
            shift = dayRecord.shifts.find(s => s.id === shiftId);
        }
        
        const cityOptions = getCityOptions();
        const transportOptions = getTransportOptions(currentCompany, selectedCityKey);
        
        let formHtml = `
            <form id="shiftForm" onsubmit="saveShift(event)">
                <input type="hidden" id="shiftDate" value="${dateStr}">
                <input type="hidden" id="shiftId" value="${shiftId || ''}">
                
                <div class="modal-shift-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>🕐 Начало</label>
                            <input type="time" id="shiftStart" value="${shift ? shift.startTime : '09:00'}">
                        </div>
                        <div class="form-group">
                            <label>🕐 Конец</label>
                            <input type="time" id="shiftEnd" value="${shift ? shift.endTime : '17:00'}">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>📍 Город</label>
                            <select id="shiftCity">
                                ${cityOptions.map(c => `<option value="${c.value}" ${shift && shift.city === c.value ? 'selected' : ''}>${c.label}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>🚲 Тип доставки</label>
                            <select id="shiftTransport">
                                ${transportOptions.map(t => `<option value="${t.value}" ${shift && shift.transport === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>🏢 Компания</label>
                            <select id="shiftCompany">
                                <option value="partner" ${shift && shift.company === 'partner' ? 'selected' : ''}>🚀 Партнер</option>
                                <option value="sber" ${shift && shift.company === 'sber' ? 'selected' : ''}>🏦 Сбер</option>
                                <option value="other" ${shift && shift.company === 'other' ? 'selected' : ''}>⚙️ Другое</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>⏸ Стопы 15 мин</label>
                            <input type="number" id="shiftStops15" value="${shift ? shift.stops15 : 0}" min="0" step="1">
                        </div>
                        <div class="form-group">
                            <label>⏸ Стопы 30 мин</label>
                            <input type="number" id="shiftStops30" value="${shift ? shift.stops30 : 0}" min="0" step="1">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                            <input type="checkbox" id="shiftExtraPay" ${shift && shift.extraPay ? 'checked' : ''}>
                            ☁️ Доплата за погоду
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label>📝 Комментарий</label>
                        <input type="text" id="shiftComment" value="${shift ? shift.comment || '' : ''}" placeholder="Комментарий к смене">
                    </div>
                    
                    <div class="shift-preview" id="shiftPreview">💰 Предварительный расчет: 0 ₽</div>
                </div>
                
                <div class="modal-actions">
                    <button type="submit" class="btn-save-shift">💾 Сохранить</button>
                    ${isEdit ? `<button type="button" class="btn-delete-shift-modal" onclick="deleteShiftFromModal('${dateStr}', '${shiftId}')">🗑 Удалить</button>` : ''}
                </div>
            </form>
        `;
        
        body.innerHTML = formHtml;
        
        ['shiftStart', 'shiftEnd', 'shiftCity', 'shiftTransport', 'shiftCompany', 'shiftStops15', 'shiftStops30', 'shiftExtraPay'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', updateShiftPreview);
                el.addEventListener('input', updateShiftPreview);
            }
        });
        
        modal.classList.add('active');
        setTimeout(updateShiftPreview, 100);
    }

    function updateShiftPreview() {
        const start = document.getElementById('shiftStart').value;
        const end = document.getElementById('shiftEnd').value;
        const city = document.getElementById('shiftCity').value;
        const transport = document.getElementById('shiftTransport').value;
        const company = document.getElementById('shiftCompany').value;
        const stops15 = parseInt(document.getElementById('shiftStops15').value) || 0;
        const stops30 = parseInt(document.getElementById('shiftStops30').value) || 0;
        const extraPay = document.getElementById('shiftExtraPay').checked;
        
        if (!start || !end) {
            document.getElementById('shiftPreview').textContent = '💰 Укажите время';
            return;
        }
        
        const shiftData = {
            startTime: start,
            endTime: end,
            city: city,
            transport: transport,
            company: company,
            stops15: stops15,
            stops30: stops30,
            extraPay: extraPay
        };
        
        const result = calculateShiftAmount(shiftData, city, transport, company);
        document.getElementById('shiftPreview').textContent = '💰 Предварительный расчет: ' + result.amount.toLocaleString() + ' ₽ (' + result.hours.toFixed(1) + 'ч)';
    }

    function saveShift(event) {
        event.preventDefault();
        
        const dateStr = document.getElementById('shiftDate').value;
        const shiftId = document.getElementById('shiftId').value;
        const startTime = document.getElementById('shiftStart').value;
        const endTime = document.getElementById('shiftEnd').value;
        const city = document.getElementById('shiftCity').value;
        const transport = document.getElementById('shiftTransport').value;
        const company = document.getElementById('shiftCompany').value;
        const stops15 = parseInt(document.getElementById('shiftStops15').value) || 0;
        const stops30 = parseInt(document.getElementById('shiftStops30').value) || 0;
        const extraPay = document.getElementById('shiftExtraPay').checked;
        const comment = document.getElementById('shiftComment').value;
        
        if (!startTime || !endTime) {
            alert('Пожалуйста, укажите время начала и окончания смены');
            return;
        }
        
        const shiftData = {
            startTime: startTime,
            endTime: endTime,
            city: city,
            transport: transport,
            company: company,
            stops15: stops15,
            stops30: stops30,
            extraPay: extraPay,
            comment: comment
        };
        
        if (shiftId) {
            updateShift(dateStr, shiftId, shiftData);
        } else {
            addShiftToDay(dateStr, shiftData);
        }
        
        closeModal();
        openDayPanel(dateStr);
        renderCalendar();
    }

    function deleteShift(dateStr, shiftId) {
        if (confirm('Удалить эту смену?')) {
            deleteShiftFromDay(dateStr, shiftId);
            openDayPanel(dateStr);
            renderCalendar();
        }
    }

    function deleteShiftFromModal(dateStr, shiftId) {
        if (confirm('Удалить эту смену?')) {
            deleteShiftFromDay(dateStr, shiftId);
            closeModal();
            openDayPanel(dateStr);
            renderCalendar();
        }
    }

    function deleteFullDay(dateStr) {
        if (confirm('Удалить все записи за этот день?')) {
            deleteDay(dateStr);
            closeDayPanel();
            renderCalendar();
        }
    }

    function closeModal() {
        document.getElementById('editModal').classList.remove('active');
    }

    function getCityOptions() {
        const tariffData = currentCompany === 'partner' ? samokatTariffs : sberTariffs;
        return Object.entries(tariffData).map(([key, city]) => ({
            value: key,
            label: city.name
        }));
    }

    function getTransportOptions(company, cityKey) {
        const available = getAvailableTransports(company, cityKey);
        const l = languages[currentLang];
        return available.map(type => ({
            value: type,
            label: l[type] || type
        }));
    }

    function initCalendar() {
        loadCalendarRecords();
        
        // Обработчики для кнопок компании в календаре
        document.querySelectorAll('.cal-company-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.cal-company-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                calendarCompany = this.dataset.company;
                renderCalendar();
            });
        });
        
        document.getElementById('prevMonth').addEventListener('click', () => {
            calendarState.currentMonth--;
            if (calendarState.currentMonth < 0) {
                calendarState.currentMonth = 11;
                calendarState.currentYear--;
            }
            renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            calendarState.currentMonth++;
            if (calendarState.currentMonth > 11) {
                calendarState.currentMonth = 0;
                calendarState.currentYear++;
            }
            renderCalendar();
        });
        
        document.getElementById('closePanel').addEventListener('click', closeDayPanel);
        document.getElementById('panelOverlay').addEventListener('click', closeDayPanel);
        
        document.getElementById('closeModal').addEventListener('click', closeModal);
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
        
        renderCalendar();
    }

    // ============================================================
    // ============ ДЕЛАЕМ ФУНКЦИИ ГЛОБАЛЬНЫМИ ============
    // ============================================================
    window.openAddShift = openAddShift;
    window.openEditShift = openEditShift;
    window.deleteShift = deleteShift;
    window.deleteShiftFromModal = deleteShiftFromModal;
    window.deleteFullDay = deleteFullDay;
    window.saveShift = saveShift;
    window.closeModal = closeModal;
    window.updateShiftPreview = updateShiftPreview;

    // ============================================================
    // ============ ИНИЦИАЛИЗАЦИЯ ============
    // ============================================================

    function init() {
        setupDropdowns();
        populateCities();

        const savedLang = localStorage.getItem('calc-lang') || 'ru';
        langDropdown.querySelector('.flag-icon').textContent = flags[savedLang];
        applyLanguage(savedLang);

        const savedTheme = localStorage.getItem('calc-theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }

        const savedCompany = localStorage.getItem('calc-company') || 'partner';
        setCompanyMode(savedCompany);

        if (localStorage.getItem('calc-city')) {
            const city = localStorage.getItem('calc-city');
            const tariffData = currentCompany === 'partner' ? samokatTariffs : sberTariffs;
            if (tariffData[city]) {
                selectedCityKey = city;
                cityDropdown.querySelector('.dropdown-trigger span').textContent = tariffData[city].name;
            }
        }

        if (localStorage.getItem('calc-transport')) {
            selectedTransportKey = localStorage.getItem('calc-transport');
        }
        updateTransportOptions();

        const savedMode = localStorage.getItem('calc-mode') || 'exact';
        setCalculationMode(savedMode);

        if (localStorage.getItem('calc-custom-rate')) {
            customRateInput.value = localStorage.getItem('calc-custom-rate');
        }
        if (localStorage.getItem('calc-custom-s15')) {
            customPriceS15.value = localStorage.getItem('calc-custom-s15');
        }
        if (localStorage.getItem('calc-custom-s30')) {
            customPriceS30.value = localStorage.getItem('calc-custom-s30');
        }
        if (localStorage.getItem('calc-custom-order')) {
            customOrderPrice.value = localStorage.getItem('calc-custom-order');
        }

        if (localStorage.getItem('calc-hours')) {
            document.getElementById('hours').value = localStorage.getItem('calc-hours');
        }
        if (localStorage.getItem('calc-stops15')) {
            document.getElementById('stops15').value = localStorage.getItem('calc-stops15');
        }
        if (localStorage.getItem('calc-stops30')) {
            document.getElementById('stops30').value = localStorage.getItem('calc-stops30');
        }
        if (localStorage.getItem('calc-orders')) {
            document.getElementById('orders').value = localStorage.getItem('calc-orders');
        }
        if (localStorage.getItem('calc-extrapay')) {
            document.getElementById('extraPay').checked = localStorage.getItem('calc-extrapay') === 'true';
        }

        updateLabelRatesText();
        calculate();

        // ============ СОБЫТИЯ ============
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('calc-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('calc-theme', 'light');
            }
        });

        langDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const lang = item.getAttribute('data-value');
                langDropdown.querySelector('.flag-icon').textContent = flags[lang];
                applyLanguage(lang);
                localStorage.setItem('calc-lang', lang);
            });
        });

        typePartner.addEventListener('click', () => setCompanyMode('partner'));
        typeSber.addEventListener('click', () => setCompanyMode('sber'));
        typeOther.addEventListener('click', () => setCompanyMode('other'));

        tabExact.addEventListener('click', () => setCalculationMode('exact'));
        tabApprox.addEventListener('click', () => setCalculationMode('approx'));

        customRateInput.addEventListener('input', () => {
            localStorage.setItem('calc-custom-rate', customRateInput.value);
            updateLabelRatesText();
            calculate();
        });
        customPriceS15.addEventListener('input', () => {
            localStorage.setItem('calc-custom-s15', customPriceS15.value);
            updateLabelRatesText();
            calculate();
        });
        customPriceS30.addEventListener('input', () => {
            localStorage.setItem('calc-custom-s30', customPriceS30.value);
            updateLabelRatesText();
            calculate();
        });
        customOrderPrice.addEventListener('input', () => {
            localStorage.setItem('calc-custom-order', customOrderPrice.value);
            updateLabelRatesText();
            calculate();
        });

        calcForm.addEventListener('input', (e) => {
            if (e.target.type === 'number') {
                let val = parseFloat(e.target.value);
                if (val < 0 || (isNaN(val) && e.target.value.includes('-'))) {
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

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const tab = btn.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                
                if (tab === 'calculator') {
                    document.getElementById('tabCalculator').classList.add('active');
                } else if (tab === 'calendar') {
                    document.getElementById('tabCalendar').classList.add('active');
                    closeDayPanel();
                    renderCalendar();
                }
            });
        });

        initCalendar();
    }

    init();
});