"use client";

import { useState } from "react";

type CourseKey = "base" | "main" | "finish";

type Ingredient = {
  id: string;
  label: string;
  note: string;
};

type Order = Record<CourseKey, string> & {
  customer: string;
  mood: string;
};

type Selection = Record<CourseKey, string | null>;

const INGREDIENT_GROUPS: Record<CourseKey, readonly Ingredient[]> = {
  base: [
    { id: "rice", label: "Pixel Rice", note: "soft, shiny, dependable" },
    { id: "noodles", label: "Neon Noodles", note: "mall-food-court energy" },
    { id: "toast", label: "Chrome Toast", note: "crisp and dramatic" },
  ],
  main: [
    { id: "egg", label: "Comet Egg", note: "sunny and cozy" },
    { id: "tofu", label: "Cloud Tofu", note: "quietly iconic" },
    { id: "shrimp", label: "Disco Shrimp", note: "tiny but flashy" },
  ],
  finish: [
    { id: "glaze", label: "Glitter Glaze", note: "sweet-spicy sparkle" },
    { id: "butter", label: "Y2K Butter", note: "comfort mode on" },
    { id: "herbs", label: "Laser Herbs", note: "green confetti" },
  ],
};

const CUSTOMER_TICKETS = [
  { customer: "Luna.exe", mood: "needs a warm plate before band practice" },
  { customer: "Mika 2003", mood: "just escaped the mall arcade" },
  { customer: "Rin.zip", mood: "cramming but still deserves a snack" },
  { customer: "Nova jpg", mood: "wants something cute and fast" },
];

const STARTING_ORDER: Order = {
  base: "rice",
  main: "egg",
  finish: "glaze",
  customer: "Luna.exe",
  mood: "needs a warm plate before band practice",
};

const COURSE_LABELS: Record<CourseKey, string> = {
  base: "Base",
  main: "Main",
  finish: "Finish",
};

function pickRandomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createOrder(): Order {
  const ticket = pickRandomItem(CUSTOMER_TICKETS);

  return {
    base: pickRandomItem(INGREDIENT_GROUPS.base).id,
    main: pickRandomItem(INGREDIENT_GROUPS.main).id,
    finish: pickRandomItem(INGREDIENT_GROUPS.finish).id,
    customer: ticket.customer,
    mood: ticket.mood,
  };
}

function getIngredientLabel(course: CourseKey, id: string | null) {
  if (!id) {
    return "???";
  }

  return INGREDIENT_GROUPS[course].find((ingredient) => ingredient.id === id)?.label ?? "???";
}

function createEmptySelection(): Selection {
  return {
    base: null,
    main: null,
    finish: null,
  };
}

export default function Y2KCookingGame() {
  const [order, setOrder] = useState<Order>(STARTING_ORDER);
  const [selection, setSelection] = useState<Selection>(createEmptySelection);
  const [score, setScore] = useState(0);
  const [ticketsCleared, setTicketsCleared] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("Choose one item from each tray, then click serve.");

  const chooseIngredient = (course: CourseKey, id: string) => {
    const chosenLabel = getIngredientLabel(course, id);

    setSelection((current) => ({
      ...current,
      [course]: id,
    }));
    setMessage(`${COURSE_LABELS[course]} locked: ${chosenLabel}.`);
  };

  const clearTray = () => {
    setSelection(createEmptySelection());
    setMessage("Tray cleared. Build a fresh plate.");
  };

  const serveDish = () => {
    const isMissingCourse = Object.values(selection).some((value) => value === null);

    if (isMissingCourse) {
      setMessage("Need a base, main, and finish before serving.");
      return;
    }

    const isCorrect =
      selection.base === order.base &&
      selection.main === order.main &&
      selection.finish === order.finish;

    setTicketsCleared((current) => current + 1);

    if (isCorrect) {
      const nextStreak = streak + 1;

      setScore((current) => current + 100 + streak * 25);
      setStreak(nextStreak);
      setMessage(`Perfect plate for ${order.customer}. Combo x${nextStreak}!`);
    } else {
      const expectedDish = [
        getIngredientLabel("base", order.base),
        getIngredientLabel("main", order.main),
        getIngredientLabel("finish", order.finish),
      ].join(", ");

      setScore((current) => Math.max(0, current - 20));
      setStreak(0);
      setMessage(`Close, but ${order.customer} asked for ${expectedDish}.`);
    }

    setSelection(createEmptySelection());
    setOrder(createOrder());
  };

  return (
    <section>
      <header>
        <p>Pocket Kitchen 2003</p>
        <h3>basic y2k cooking game</h3>
        <p>online</p>
        <p>
          Read the ticket, build the plate, and serve the right combo. It is intentionally tiny and a little extra.
        </p>
      </header>

      <section>
        <p>Incoming order</p>
        <h4>{order.customer}</h4>
        <p>{order.mood}</p>
        <p>tickets cleared {ticketsCleared}</p>

        {(["base", "main", "finish"] as const).map((course) => (
          <p key={course}>
            <strong>{COURSE_LABELS[course]}:</strong> {getIngredientLabel(course, order[course])}
          </p>
        ))}
      </section>

      {(["base", "main", "finish"] as const).map((course) => (
        <section key={course}>
          <h4>{COURSE_LABELS[course]} tray</h4>
          <p>Pick one flavor for this layer.</p>
          <p>{selection[course] ? "ready" : "waiting"}</p>

          {INGREDIENT_GROUPS[course].map((ingredient) => {
            const isActive = selection[course] === ingredient.id;

            return (
              <button
                key={ingredient.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => chooseIngredient(course, ingredient.id)}
              >
                <strong>{ingredient.label}</strong> {ingredient.note}
              </button>
            );
          })}
        </section>
      ))}

      <section>
        <h4>Serving tray</h4>
        {(["base", "main", "finish"] as const).map((course) => (
          <p key={course}>
            <strong>{COURSE_LABELS[course]}:</strong> {getIngredientLabel(course, selection[course])}
          </p>
        ))}
        <button type="button" onClick={serveDish}>
          Serve
        </button>
        <button type="button" onClick={clearTray}>
          Clear
        </button>
      </section>

      <section>
        <h4>Score</h4>
        <p>{score}</p>
        <h4>Streak</h4>
        <p>x{streak}</p>
      </section>

      <section aria-live="polite">
        <h4>Kitchen log</h4>
        <p>{message}</p>
      </section>
    </section>
  );
}
