let guestQty = 1;

function changeQty(delta) {
    guestQty = Math.min(10, Math.max(1, guestQty + delta));
    document.getElementById('guestCount').textContent = guestQty;
}

function sendWhatsApp() {
    const name = document.getElementById('guestName').value.trim();
    if (!name) {
        document.getElementById('guestName').style.borderColor = 'var(--pink-dark)';
        document.getElementById('guestName').setAttribute('placeholder', 'Entre ton prénom...');
        document.getElementById('guestName').focus();
        return;
    }

    const attending = document.querySelector('input[name="attending"]:checked').value;
    const status = attending === 'yes' ? '✅ Oui, on sera là !' : '😿 Désolé, on ne pourra pas venir.';
    const message = `🎂 *RSVP – Anniversaire de Louane (5 ans)* 🎂\n\n` +
        `👤 Prénom : ${name}\n` +
        `👥 Nombre d'invités : ${guestQty}\n` +
        `📋 Présence : ${status}`;

    // ⚠️ Replace this number with the real WhatsApp number (with country code, no + or spaces)
    const phoneNumber = '+596696291979';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function addToGoogleCal() {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: '🎂 Anniversaire de Louane – 5 ans !',
        dates: '20260405T150000/20260405T190000',
        details: 'Louane fête ses 5 ans ! Viens t\'amuser avec nous 🎉\nGâteau, jeux et surprises au programme !',
        location: '6 rue des Goyaviers, Voie 1, 97231 Le Robert, Martinique',
        ctz: 'America/Martinique'
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
}

function downloadICS() {
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Louane Birthday//FR',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'DTSTART:20260405T150000',
        'DTEND:20260405T190000',
        'SUMMARY:🎂 Anniversaire de Louane – 5 ans !',
        'DESCRIPTION:Louane fête ses 5 ans ! Viens t\'amuser avec nous 🎉\nGâteau\, jeux et surprises au programme !',
        'LOCATION:6 rue des Goyaviers\, Voie 1\, 97231 Le Robert\, Martinique',
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'DESCRIPTION:Rappel anniversaire Louane',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'anniversaire-louane-5ans.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// Countdown
function updateCountdown() {
    const target = new Date('2026-04-05T15:00:00-04:00').getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('cd-days').textContent = '0';
        document.getElementById('cd-hours').textContent = '0';
        document.getElementById('cd-mins').textContent = '0';
        document.getElementById('cd-secs').textContent = '0';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
