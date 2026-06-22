import { useState }       from 'react';
import { TESTIMONIALS }   from '../../data';
import { VoiceAvatarGrid } from '../VoiceAvatarGrid/VoiceAvatarGrid';
import { VoiceContent }    from '../VoiceContent/VoiceContent';
import styles              from './VoiceInteractive.module.scss';

/**
 * Stateful shell — owns activeId, passes derived data down.
 * No layout or presentation logic lives here.
 */
export function VoiceInteractive() {
  const [activeId, setActiveId] = useState<number>(TESTIMONIALS[0].id);

  const activeIndex       = TESTIMONIALS.findIndex(t => t.id === activeId);
  const activeTestimonial = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];

  return (
    <div className={styles.voiceInteractive}>
      <VoiceAvatarGrid
        testimonials={TESTIMONIALS}
        activeId={activeId}
        activeIndex={activeIndex}
        onSelect={setActiveId}
      />
      <VoiceContent testimonial={activeTestimonial} />
    </div>
  );
}
