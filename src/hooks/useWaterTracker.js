// src/hooks/useWaterTracker.js

import { useEffect, useMemo, useState } from 'react';

import { getToday, getTime } from '../utils/format';

import {
  getWaterEntries,
  saveWaterEntries,
} from '../services/waterService';

export function useWaterTracker() {
  /* ───────────────── USER ───────────────── */

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('water_username') || 'Paulita';
  });

  useEffect(() => {
    localStorage.setItem('water_username', userName);
  }, [userName]);

  /* ───────────────── GOAL ───────────────── */

  const [goalMl, setGoalMl] = useState(() => {
    return Number(localStorage.getItem('water_goal')) || 3000;
  });

  useEffect(() => {
    localStorage.setItem('water_goal', goalMl);
  }, [goalMl]);

  /* ───────────────── ENTRIES ───────────────── */

  const [entries, setEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  /* ───────────────── UI ───────────────── */

  const [customMl, setCustomMl] = useState('');

  const [floatingValue, setFloatingValue] = useState(null);

  /* ───────────────── LOAD FIREBASE ───────────────── */

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getWaterEntries(getToday());

        setEntries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  /* ───────────────── SAVE ───────────────── */

  useEffect(() => {
    if (loading) return;

    // Firebase
    saveWaterEntries(getToday(), entries);

    // Local backup
    try {
      const history =
        JSON.parse(localStorage.getItem('water_history')) || {};

      history[getToday()] = entries;

      localStorage.setItem(
        'water_history',
        JSON.stringify(history)
      );
    } catch (error) {
      console.error(error);
    }
  }, [entries, loading]);

  /* ───────────────── TOTAL ───────────────── */

  const total = useMemo(() => {
    return entries.reduce((sum, entry) => sum + entry.ml, 0);
  }, [entries]);

  /* ───────────────── PROGRESS ───────────────── */

  const progress = Math.min(total / goalMl, 1);

  /* ───────────────── ACTIONS ───────────────── */

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

  function addCustom() {
    const value = parseInt(customMl);

    if (value > 0) {
      addWater(value, 'Personalizado');
      setCustomMl('');
    }
  }

  function removeEntry(id) {
    setEntries((prev) =>
      prev.filter((entry) => entry.id !== id)
    );
  }

  function resetDay() {
    if (!entries.length) return;

    const confirmed = window.confirm(
      '¿Reiniciar el registro de hoy?'
    );

    if (confirmed) {
      setEntries([]);
    }
  }

  /* ───────────────── RETURN ───────────────── */

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

    loading,
  };
}