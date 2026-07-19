import { AccordionItem } from '../Accordion';
import {
  TDEE_CALLOUT_POINTS,
  TDEE_CALLOUT_TITLE,
  TDEE_KEY_FACTOR,
} from '../../lib/fuel-tdee';

type TdeeCalloutProps = {
  compact?: boolean;
};

export function TdeeCallout({ compact = false }: TdeeCalloutProps) {
  if (compact) {
    return <p className="fuel-tdee-key">{TDEE_KEY_FACTOR}</p>;
  }

  return (
    <aside className="fuel-tdee-callout" aria-labelledby="tdee-callout-title">
      <p className="fuel-tdee-kicker">Key factor for every phase</p>
      <h3 id="tdee-callout-title">{TDEE_CALLOUT_TITLE}</h3>
      <ul className="principle-list">
        {TDEE_CALLOUT_POINTS.map((point, index) => (
          <li key={point}>
            <span className="principle-num" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="principle-text">{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Collapsible version for phase detail pages. */
export function TdeeAccordion({ phaseId }: { phaseId: string }) {
  return (
    <div className="accordion fuel-tdee-accordion" id={`${phaseId}-tdee`}>
      <AccordionItem title={TDEE_CALLOUT_TITLE} summary="Key factor" defaultOpen>
        <ul className="principle-list">
          {TDEE_CALLOUT_POINTS.map((point, index) => (
            <li key={point}>
              <span className="principle-num" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="principle-text">{point}</span>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </div>
  );
}
