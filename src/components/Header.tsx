import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shared-philosophy", label: "Shared Philosophy" },
  { href: "/ear-fluency", label: "Ear Fluency" },
  { href: "/translator-fluency", label: "Translator Fluency" },
  { href: "/composition-fluency", label: "Composition Fluency" },
  { href: "/exercise", label: "Exercise" },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <nav>
      <ul className="header-list">
        {navItems.map((item, index) => (
          <li key={item.href} className="header-area">
            <Link href={item.href} className="nav-link">
              {item.label}
            </Link>
            {index < navItems.length - 1 ? " • " : ""}
          </li>
        ))}
      </ul>
    </nav>
  );
}
