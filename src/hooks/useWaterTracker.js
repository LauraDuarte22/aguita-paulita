import { useEffect, useMemo, useState } from 'react';

import { getToday, getTime } from '../utils/format';

const DEFAULT_GOAL = 3000;

export function useWaterTracker() {
  // Entries del día actual
  const [entries, setEntries] = useState(() => {
    try {
      const history = JSON.parse(localStorage.getItem('water_history')) || {};

      return history[getToday()] || [];
    } catch {
      return [];
    }
  });

  // Meta diaria
  const [goalMl, setGoalMl] = useState(() => {
    return Number(localStorage.getItem('daily_goal')) || DEFAULT_GOAL;
  });

  // Nombre
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('water_username') || 'Mi amor';
  });

  // Input personalizado
  const [customMl, setCustomMl] = useState('');

  // Floating feedback
  const [floatingValue, setFloatingValue] = useState(null);

  // Guardar historial
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('water_history')) || {};

      history[getToday()] = entries;

      localStorage.setItem('water_history', JSON.stringify(history));
    } catch {}
  }, [entries]);

  // Guardar meta
  useEffect(() => {
    localStorage.setItem('daily_goal', goalMl);
  }, [goalMl]);

  // Guardar nombre
  useEffect(() => {
    localStorage.setItem('water_username', userName);
  }, [userName]);

  // Total consumido
  const total = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.ml, 0),
    [entries]
  );

  // Progreso
  const progress = Math.min(total / goalMl, 1);

  // Agregar agua
  function addWater(ml, label) {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ml,
        label,
        time: getTime(),
      },
    ]);

    // Floating feedback
    setFloatingValue(`+${ml}ml 💧`);

    setTimeout(() => {
      setFloatingValue(null);
    }, 1200);

    // Vibración mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }

  // Agregar personalizado
  function addCustom() {
    const value = parseInt(customMl);

    if (value > 0) {
      addWater(value, 'Personalizado');

      setCustomMl('');
    }
  }

  // Eliminar registro
  function removeEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  // Reiniciar día
  function resetDay() {
    if (entries.length && window.confirm('¿Reiniciar el registro de hoy?')) {
      setEntries([]);
    }
  }

  return {
    entries,
    total,
    progress,

    customMl,
    setCustomMl,

    addWater,
    addCustom,

    removeEntry,
    resetDay,

    floatingValue,

    goalMl,
    setGoalMl,

    userName,
    setUserName,
  };
}
