// src/hooks/useWaterTracker.js

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getToday,
  getTime,
} from '../utils/format';

import {
  getWaterEntries,
  saveWaterEntries,
} from '../services/waterService';

import {
  getUserConfig,
  saveUserConfig,
} from '../services/userConfigService';

export function useWaterTracker() {
  /* ───────────────── USER ───────────────── */

  const [userName, setUserName] =
    useState('Paulita');

  /* ───────────────── GOAL ───────────────── */

  const [goalMl, setGoalMl] =
    useState(3000);

  /* ───────────────── ENTRIES ───────────────── */

  const [entries, setEntries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ───────────────── UI ───────────────── */

  const [customMl, setCustomMl] =
    useState('');

  const [floatingValue, setFloatingValue] =
    useState(null);

  /* ───────────────── FLAGS ───────────────── */

  const configReady = useRef(false);

  /* ───────────────── LOAD CONFIG ───────────────── */

  useEffect(() => {
    async function loadConfig() {
      try {
        // local first
        const localName =
          localStorage.getItem(
            'water_username'
          );

        const localGoal =
          localStorage.getItem(
            'water_goal'
          );

        if (localName) {
          setUserName(localName);
        }

        if (localGoal) {
          setGoalMl(Number(localGoal));
        }

        // firebase second
        const config =
          await getUserConfig();

        if (config) {
          if (config.userName) {
            setUserName(
              config.userName
            );
          }

          if (config.goalMl) {
            setGoalMl(
              config.goalMl
            );
          }
        }
      } catch (error) {
       
      } finally {
        configReady.current = true;
      }
    }

    loadConfig();
  }, []);

  /* ───────────────── SAVE CONFIG ───────────────── */

  useEffect(() => {
    if (!configReady.current) return;

    // local backup
    localStorage.setItem(
      'water_username',
      userName
    );

    localStorage.setItem(
      'water_goal',
      String(goalMl)
    );

    // debounce firebase
  const timeout = setTimeout(() => {
    saveUserConfig({
      userName,
      goalMl,
    });
  }, 800);

  return () => clearTimeout(timeout);
  
  
  }, [userName, goalMl]);

  /* ───────────────── LOAD ENTRIES ───────────────── */

  useEffect(() => {
    async function loadEntries() {
      try {
        const data =
          await getWaterEntries(
            getToday()
          );

        setEntries(data || []);
      } catch (error) {
     
        try {
          const history =
            JSON.parse(
              localStorage.getItem(
                'water_history'
              )
            ) || {};

          setEntries(
            history[getToday()] || []
          );
        } catch {
          setEntries([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  /* ───────────────── SAVE ENTRIES ───────────────── */

  useEffect(() => {
    if (loading) return;

    saveWaterEntries(
      getToday(),
      entries
    );

    try {
      const history =
        JSON.parse(
          localStorage.getItem(
            'water_history'
          )
        ) || {};

      history[getToday()] =
        entries;

      localStorage.setItem(
        'water_history',
        JSON.stringify(history)
      );
    } catch (error) {
     
    }
  }, [entries, loading]);

  /* ───────────────── TOTAL ───────────────── */

  const total = useMemo(() => {
    return entries.reduce(
      (sum, entry) =>
        sum + entry.ml,
      0
    );
  }, [entries]);

  /* ───────────────── PROGRESS ───────────────── */

  const progress = Math.min(
    total / goalMl,
    1
  );

  /* ───────────────── ACTIONS ───────────────── */

  function addWater(
    ml,
    label
  ) {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ml,
        label,
        time: getTime(),
      },
    ]);

    setFloatingValue(
      `+${ml}ml 💧`
    );

    setTimeout(() => {
      setFloatingValue(null);
    }, 1200);

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }

  function addCustom() {
    const value =
      parseInt(customMl);

    if (value > 0) {
      addWater(
        value,
        'Personalizado'
      );

      setCustomMl('');
    }
  }

  function removeEntry(id) {
    setEntries((prev) =>
      prev.filter(
        (entry) =>
          entry.id !== id
      )
    );
  }

  function resetDay() {
    if (!entries.length)
      return;

    const confirmed =
      window.confirm(
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