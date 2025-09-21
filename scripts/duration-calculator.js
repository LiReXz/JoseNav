/**
 * Duration Calculator v3
 * Calcula automáticamente la duración entre fechas para elementos del timeline
 */

// Mapeo de meses en español a números
const MONTHS = {
    // Inglés abreviado y completo
    'jan': 0, 'jan.': 0, 'january': 0,
    'feb': 1, 'feb.': 1, 'february': 1,
    'mar': 2, 'mar.': 2, 'march': 2,
    'apr': 3, 'apr.': 3, 'april': 3,
    'may': 4, 'may.': 4,
    'jun': 5, 'jun.': 5, 'june': 5,
    'jul': 6, 'jul.': 6, 'july': 6,
    'aug': 7, 'aug.': 7, 'august': 7,
    'sep': 8, 'sep.': 8, 'sept': 8, 'sept.': 8, 'september': 8,
    'oct': 9, 'oct.': 9, 'october': 9,
    'nov': 10, 'nov.': 10, 'november': 10,
    'dec': 11, 'dec.': 11, 'december': 11,
    // Español completo
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11,
    // Español abreviado con y sin punto
    'ene': 0, 'ene.': 0,
    'feb': 1, 'feb.': 1,
    'mar': 2, 'mar.': 2,
    'abr': 3, 'abr.': 3,
    'may': 4, 'may.': 4,
    'jun': 5, 'jun.': 5,
    'jul': 6, 'jul.': 6,
    'ago': 7, 'ago.': 7,
    'sep': 8, 'sep.': 8,
    'oct': 9, 'oct.': 9,
    'nov': 10, 'nov.': 10,
    'dic': 11, 'dic.': 11
};

/**
 * Convierte una fecha en formato "mes año" a objeto Date
 * @param {string} dateStr - Fecha en formato "jun. 2023" o "junio 2023"
 * @returns {Date} - Objeto Date
 */
function parseDate(dateStr) {
    if (dateStr.toLowerCase() === 'now') {
        return new Date();
    }
    
    // Limpiar y separar la fecha
    const cleanStr = dateStr.toLowerCase().replace('.', '').trim();
    const parts = cleanStr.split(' ');
    
    if (parts.length !== 2) {
        console.error('Formato de fecha inválido:', dateStr);
        return new Date();
    }
    
    const month = MONTHS[parts[0]];
    const year = parseInt(parts[1]);
    
    if (month === undefined || isNaN(year)) {
        console.error('Mes o año inválido:', dateStr);
        return new Date();
    }
    
    return new Date(year, month, 1);
}

/**
 * Calcula la diferencia entre dos fechas y la formatea (inclusivo)
 * @param {Date} startDate - Fecha de inicio
 * @param {Date} endDate - Fecha de fin
 * @param {string} lang - Idioma para la salida ('en' o 'es')
 * @returns {string} - Duración formateada (ej: "1 year 7 months")
 */
function calculateDuration(startDate, endDate, lang = 'en') {
    // Calcular la diferencia total de meses (inclusivo)
    let totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    let years = Math.floor(totalMonths / 12);
    let months = totalMonths % 12;
    let result = [];
    if (lang === 'es') {
        if (years > 0) result.push(years === 1 ? '1 año' : `${years} años`);
        if (months > 0) result.push(months === 1 ? '1 mes' : `${months} meses`);
        if (result.length === 0) result.push('1 mes');
    } else {
        if (years > 0) result.push(years === 1 ? '1 year' : `${years} years`);
        if (months > 0) result.push(months === 1 ? '1 month' : `${months} months`);
        if (result.length === 0) result.push('1 month');
    }
    return result.join(' ');
}

/**
 * Procesa un elemento position-time y actualiza su contenido con la duración calculada
 * @param {Element} element - Elemento DOM con clase position-time
 */
function processPositionTime(element) {
    const text = element.textContent.trim();
    // Detectar idioma por el texto
    let lang = 'en';
    if (text.includes('calculando')) lang = 'es';
    // Buscar el patrón "fecha - fecha"
    const match = text.match(/^(.+?)\s*-\s*(.+?)\s*\|/);
    if (!match) {
        console.warn('No se pudo parsear el formato de tiempo:', text);
        return;
    }
    const startStr = match[1].trim();
    const endStr = match[2].trim();
    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);
    const duration = calculateDuration(startDate, endDate, lang);
    element.textContent = `${startStr} - ${endStr} | ${duration}`;
}

/**
 * Procesa un elemento company-time que tiene formato "tipo | duración"
 * Busca todas las posiciones de esa empresa para calcular la duración total
 * @param {Element} element - Elemento DOM con clase company-time
 */
function processCompanyTime(element) {
    const text = element.textContent.trim();
    let lang = 'en';
    if (text.includes('calculando')) lang = 'es';
    const typeMatch = text.match(/^(.+?)\s*\|/);
    if (!typeMatch) {
        console.warn('No se pudo parsear el formato company-time:', text);
        return;
    }
    const workType = typeMatch[1].trim();
    const company = element.closest('.company');
    if (!company) {
        console.warn('No se encontró el contenedor company para:', element);
        return;
    }
    const positions = company.querySelectorAll('.position-time');
    let earliestStart = null;
    let latestEnd = null;
    positions.forEach(positionTimeElement => {
        const posText = positionTimeElement.textContent.trim();
        const posMatch = posText.match(/^(.+?)\s*-\s*(.+?)\s*\|/);
        if (posMatch) {
            const startDate = parseDate(posMatch[1].trim());
            const endDate = parseDate(posMatch[2].trim());
            if (!earliestStart || startDate < earliestStart) {
                earliestStart = startDate;
            }
            if (!latestEnd || endDate > latestEnd) {
                latestEnd = endDate;
            }
        }
    });
    if (earliestStart && latestEnd) {
        const totalDuration = calculateDuration(earliestStart, latestEnd, lang);
        element.textContent = `${workType} | ${totalDuration}`;
    }
}

/**
 * Inicializa el calculador de duración para todos los elementos position-time y company-time
 */
function initDurationCalculator() {
    // Procesar primero los position-time
    const positionTimes = document.querySelectorAll('.position-time');
    
    positionTimes.forEach(element => {
        try {
            processPositionTime(element);
        } catch (error) {
            console.error('Error procesando elemento position-time:', error, element);
        }
    });
    
    // Luego procesar los company-time (después de que los position-time estén actualizados)
    setTimeout(() => {
        const companyTimes = document.querySelectorAll('.company-time');
        
        companyTimes.forEach(element => {
            try {
                processCompanyTime(element);
            } catch (error) {
                console.error('Error procesando elemento company-time:', error, element);
            }
        });
        
        console.log(`Duration Calculator v3: Procesados ${positionTimes.length} position-time y ${companyTimes.length} company-time elementos`);
    }, 100);
}

/**
 * Función para recalcular todas las duraciones (útil para actualizaciones)
 */
function recalculateDurations() {
    initDurationCalculator();
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDurationCalculator);
} else {
    initDurationCalculator();
}

// Exportar funciones para uso externo
window.DurationCalculator = {
    init: initDurationCalculator,
    recalculate: recalculateDurations,
    calculateDuration: calculateDuration,
    parseDate: parseDate
};
