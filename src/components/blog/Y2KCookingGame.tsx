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
    <section className="not-prose my-8 overflow-hidden rounded-[1.75rem] border-[3px] border-[#264357] bg-[linear-gradient(140deg,#fff7fb_0%,#c3f4ff_32%,#fef5bc_62%,#ffd8ef_100%)] p-[6px] shadow-[0_18px_40px_rgba(27,53,72,0.18)]">
      <div className="relative overflow-hidden rounded-[1.4rem] border-[3px] border-[#fff7fe] bg-[radial-gradient(circle_at_top,#ffffff_0%,#ffe6f6_28%,#c7f6ff_65%,#8bd6e8_100%)] p-5 text-[#153241] sm:p-6">
        <div className="pointer-events-none absolute -left-10 top-4 h-24 w-24 rounded-full bg-[#ffffff] opacity-55 blur-2xl" />
        <div className="pointer-events-none absolute -right-6 top-10 h-28 w-28 rounded-full border border-white/70 bg-[#ff72c7]/30 blur-lg" />

        <div className="relative flex flex-col gap-5">
          <header className="rounded-[1.2rem] border-[3px] border-[#224055] bg-[linear-gradient(180deg,#fefcff_0%,#ffe3f4_48%,#ffbddd_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#d86da6]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="m-0 text-[11px] font-bold uppercase tracking-[0.34em] text-[#7a3761]">
                  Pocket Kitchen 2003
                </p>
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-[#173341]">
                  basic y2k cooking game
                </h3>
              </div>

              <div className="rounded-full border-2 border-[#2d5168] bg-[#fff8b0] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#244052] shadow-[inset_2px_2px_0_#ffffff,inset_-2px_-2px_0_#d7bf67]">
                online
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2f5160]">
              Read the ticket, build the plate, and serve the right combo. It is intentionally tiny and a little
              extra.
            </p>
          </header>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <div className="space-y-4">
              <section className="rounded-[1.25rem] border-[3px] border-[#27455a] bg-[linear-gradient(180deg,#fffefb_0%,#fff3cb_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#ccb273]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="m-0 text-[11px] font-bold uppercase tracking-[0.24em] text-[#866131]">Incoming order</p>
                    <h4 className="mt-2 text-xl font-bold text-[#173341]">{order.customer}</h4>
                    <p className="mt-2 text-sm text-[#4a6570]">{order.mood}</p>
                  </div>

                  <div className="rounded-2xl border-2 border-dashed border-[#8d6a37] bg-white/75 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#725227]">
                    tickets cleared {ticketsCleared}
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {(["base", "main", "finish"] as const).map((course) => (
                    <div
                      key={course}
                      className="rounded-2xl border-2 border-[#39556b] bg-[linear-gradient(180deg,#ffffff_0%,#d9f7ff_100%)] px-3 py-3 shadow-[inset_1px_1px_0_#ffffff,inset_-2px_-2px_0_#8acfe1]"
                    >
                      <p className="m-0 text-[10px] font-bold uppercase tracking-[0.22em] text-[#5b7b87]">
                        {COURSE_LABELS[course]}
                      </p>
                      <p className="mt-2 text-sm font-bold text-[#173341]">{getIngredientLabel(course, order[course])}</p>
                    </div>
                  ))}
                </div>
              </section>

              {(["base", "main", "finish"] as const).map((course) => (
                <section
                  key={course}
                  className="rounded-[1.25rem] border-[3px] border-[#244052] bg-[linear-gradient(180deg,#ffffff_0%,#dff8ff_54%,#c5eef8_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#7ac9db]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4c7081]">
                        {COURSE_LABELS[course]} tray
                      </p>
                      <p className="mt-1 text-sm text-[#2e5260]">Pick one flavor for this layer.</p>
                    </div>

                    <div className="rounded-full border-2 border-[#3e6577] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#315060]">
                      {selection[course] ? "ready" : "waiting"}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {INGREDIENT_GROUPS[course].map((ingredient) => {
                      const isActive = selection[course] === ingredient.id;

                      return (
                        <button
                          key={ingredient.id}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => chooseIngredient(course, ingredient.id)}
                          className={[
                            "rounded-[1.1rem] border-[3px] px-3 py-3 text-left transition hover:-translate-y-0.5 hover:cursor-pointer",
                            isActive
                              ? "border-[#16323f] bg-[linear-gradient(180deg,#fff7b7_0%,#ffd86d_100%)] text-[#173341] shadow-[inset_2px_2px_0_#fffcec,inset_-3px_-3px_0_#d3a93c]"
                              : "border-[#5a8393] bg-[linear-gradient(180deg,#ffffff_0%,#ecfbff_100%)] text-[#214252] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#b5e5f1]",
                          ].join(" ")}
                        >
                          <p className="m-0 text-sm font-bold uppercase tracking-[0.06em]">{ingredient.label}</p>
                          <p className="mt-2 text-xs leading-5">{ingredient.note}</p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <aside className="space-y-4">
              <section className="rounded-[1.25rem] border-[3px] border-[#254253] bg-[linear-gradient(180deg,#fff8fd_0%,#ffd4ea_55%,#fdb4d8_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#d96aa6]">
                <p className="m-0 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7d3963]">Serving tray</p>

                <div className="mt-4 rounded-[1.2rem] border-[3px] border-[#2a4b61] bg-[linear-gradient(180deg,#ffffff_0%,#eefbff_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#acdcea]">
                  <div className="grid gap-3">
                    {(["base", "main", "finish"] as const).map((course) => (
                      <div
                        key={course}
                        className="rounded-2xl border-2 border-dashed border-[#7090a0] bg-white/80 px-3 py-3"
                      >
                        <p className="m-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64808d]">
                          {COURSE_LABELS[course]}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[#173341]">{getIngredientLabel(course, selection[course])}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={serveDish}
                      className="rounded-full border-[3px] border-[#173341] bg-[linear-gradient(180deg,#fff8af_0%,#ffc53b_100%)] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#173341] shadow-[inset_2px_2px_0_#fffcea,inset_-3px_-3px_0_#c68d11] transition hover:-translate-y-0.5 hover:cursor-pointer"
                    >
                      Serve
                    </button>
                    <button
                      type="button"
                      onClick={clearTray}
                      className="rounded-full border-[3px] border-[#244052] bg-[linear-gradient(180deg,#ffffff_0%,#c8f2ff_100%)] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#244052] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#78cfe5] transition hover:-translate-y-0.5 hover:cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.15rem] border-[3px] border-[#244052] bg-[linear-gradient(180deg,#fffcee_0%,#fff2a3_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#d7bf54]">
                  <p className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8b6a1f]">Score</p>
                  <p className="mt-2 text-3xl font-bold text-[#173341]">{score}</p>
                </div>

                <div className="rounded-[1.15rem] border-[3px] border-[#244052] bg-[linear-gradient(180deg,#fefbff_0%,#d7d2ff_100%)] p-4 shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#9e97df]">
                  <p className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5c56a1]">Streak</p>
                  <p className="mt-2 text-3xl font-bold text-[#173341]">x{streak}</p>
                </div>
              </section>

              <section
                aria-live="polite"
                className="rounded-[1.15rem] border-[3px] border-[#244052] bg-[linear-gradient(180deg,#edfbff_0%,#c8f5ff_100%)] p-4 text-sm leading-6 text-[#26485b] shadow-[inset_2px_2px_0_#ffffff,inset_-3px_-3px_0_#84d4e8]"
              >
                <p className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#46708a]">Kitchen log</p>
                <p className="mt-2 mb-0">{message}</p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
