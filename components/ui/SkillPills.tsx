interface SkillPillsProps {
  skills: string[];
}

export function SkillPills({ skills }: SkillPillsProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Skills">
      {skills.map((skill) => (
        <li
          key={skill}
          className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
