export function RamadanScene() {
  return (
    <div className="ramadan-scene" aria-hidden="true">
      <div className="starfield starfield-one" />
      <div className="starfield starfield-two" />
      <div className="moon" />
      <svg className="mosque-silhouette" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <path d="M0 420V300h130v-45h100v45h135V230h90v70h108V190q75-118 150 0v110h85V265h100v35h110v-58q80-105 160 0v58h117v-50h100v50h115v120Z" fill="currentColor" />
        <path d="M432 300v-84m-15 13h30m-25-12 10-15 10 15m388 83v-60m-15 16h30m-24-16 9-15 10 15m271 78v-92m-16 20h32m-27-20 11-17 11 17" fill="none" stroke="currentColor" strokeWidth="5" />
      </svg>
      <svg className="lantern lantern-left" viewBox="0 0 74 150">
        <path d="M37 0v23M26 23h22l5 10H21l5-10Zm-7 10h36l8 13-6 72-10 14H27l-10-14-6-72 8-13Zm-6 84h47m-48 8h49m-35-78v68m21-68v68M26 138v5h22v-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M22 45h30l5 61-8 11H26l-8-11z" fill="currentColor" opacity=".15" />
      </svg>
      <svg className="lantern lantern-right" viewBox="0 0 74 150">
        <path d="M37 0v23M26 23h22l5 10H21l5-10Zm-7 10h36l8 13-6 72-10 14H27l-10-14-6-72 8-13Zm-6 84h47m-48 8h49m-35-78v68m21-68v68M26 138v5h22v-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M22 45h30l5 61-8 11H26l-8-11z" fill="currentColor" opacity=".15" />
      </svg>
    </div>
  );
}
