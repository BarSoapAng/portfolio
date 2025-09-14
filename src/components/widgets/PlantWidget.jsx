import { useState } from "react"

import BaseWidget from './BaseWidget';

export default function PlantWidget() {

  // add use state here for plant stats



  return (
    <BaseWidget title="Click Me" size="small" onClick={() => alert('watered') } ariaLabel="plant">
      <div>
        plant goes here ig
      </div>
    </BaseWidget>
  );
}
