import { clinic } from "@/lib/site";

export function Logo() {
  return (
    <a href="#" className="logo" aria-label={`${clinic.fullName} — ana səhifə`}>
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="12" />
        <path className="logo__base" d="M7 21h6l3-7 5 14 4-10 2 3h6" />
        <path className="logo__pulse" d="M7 21h6l3-7 5 14 4-10 2 3h6" />
      </svg>
      <span className="logo__text">
        {clinic.name}
        <small>Klinika</small>
      </span>
    </a>
  );
}
