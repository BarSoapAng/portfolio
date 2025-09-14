import BaseWidget from './BaseWidget';

export default function ExampleWidget() {
  return (
    <BaseWidget title="Weather" size="small" onClick={() => alert('widget clicked') } ariaLabel="weather">
      <div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>72°F</div>
        <div style={{ fontSize: 12, color: '#666' }}>Sunny</div>
      </div>
    </BaseWidget>
  );
}
