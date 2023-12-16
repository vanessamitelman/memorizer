import { LearningStepper } from '../Components/Learning/Learning';

export function LearnPracticePage() {
  return (
    <main>
      <h1>Learning Page</h1>
      <p>
        This page shows the front card, the back card, and whether you were
        successful in memorizing.
      </p>
      <LearningStepper />
    </main>
  );
}
