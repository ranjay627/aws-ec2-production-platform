import Link from "next/link";

const resources = [
  { title: "Products", path: "/products", detail: "Catalog, pricing, and stock", number: "01", tone: "green" },
  { title: "Categories", path: "/categories", detail: "Keep the catalog organized", number: "02", tone: "orange" },
  { title: "Customers", path: "/customers", detail: "Contact and account details", number: "03", tone: "blue" },
  { title: "Orders", path: "/orders", detail: "Purchases and fulfillment", number: "04", tone: "yellow" },
];

export default function Home() {
  return (
    <section className="overview-page">
      <div className="eyebrow"><span className="status-dot" /> LOCAL WORKSPACE</div>
      <div className="overview-heading">
        <div>
          <p className="section-kicker">OPERATIONS / OVERVIEW</p>
          <h1>Your workspace</h1>
          <p className="page-description">Choose a collection to view and manage its records.</p>
        </div>
        <div className="overview-stamp"><span>API</span><strong>04</strong><small>RESOURCES</small></div>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <Link className={`resource-tile tone-${resource.tone}`} href={resource.path} key={resource.path}>
            <span className="tile-number">{resource.number}</span>
            <span className="tile-arrow" aria-hidden="true">VIEW</span>
            <span className="tile-copy">
              <strong>{resource.title}</strong>
              <small>{resource.detail}</small>
            </span>
          </Link>
        ))}
      </div>
      <div className="overview-note"><span className="note-mark">i</span><p>Records are held in the Spring Boot app&apos;s memory and reset when it restarts.</p></div>
    </section>
  );
}
