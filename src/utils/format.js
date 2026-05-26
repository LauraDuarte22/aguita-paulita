export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function getTime() {
  return new Date().toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDateLabel() {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function formatWaterAmount(ml) {
  if (ml >= 1000) {
    return (ml / 1000).toFixed(2).replace(/\.?0+$/, '') + ' L';
  }

  return `${ml} ml`;
}

export function getStatusMsg(total, goal) {
  const progress = total / goal;

  if (!total) {
    return '¡Empieza el día bien hidratada! 🌅';
  }

  if (progress < 0.25) {
    return 'Buen comienzo, sigue así 💪';
  }

  if (progress < 0.5) {
    return 'Ya llevas un gran avance 🚀';
  }

  if (progress < 0.75) {
    return 'Más de la mitad, casi allá 🌊';
  }

  if (progress < 1) {
    return '¡Un último empujón! ⚡';
  }

  return '¡Meta cumplida, eres la mejor! 💙';
}
